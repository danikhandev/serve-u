// server for chat 
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const cookie = require("cookie");
const { verifyToken } = require("./lib/utils-server");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // Initialize Socket.io
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Socket.io authentication middleware
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      // Try to authenticate as user, doctor, or admin
      const userToken = cookies["auth-user-token"];
      const doctorToken = cookies["auth-doctor-token"];
      const adminToken = cookies["admin-auth-token"];

      let userData = null;
      let userType = null;

      if (userToken) {
        userData = await verifyToken(userToken);
        userType = "user";
      } else if (doctorToken) {
        userData = await verifyToken(doctorToken);
        userType = "doctor";
      } else if (adminToken) {
        userData = await verifyToken(adminToken);
        userType = "admin";
      }

      if (!userData) {
        return next(new Error("Authentication error"));
      }

      // Attach user data to socket
      socket.userId = userData.userId;
      socket.userType = userType;

      next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Authentication error"));
    }
  });

  // Store active user connections
  const activeUsers = new Map();

  // Socket.io connection handler
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId} (${socket.userType})`);

    // Send currently online users to the newly connected user
    activeUsers.forEach((socketId, userId) => {
      socket.emit("user-status", {
        userId: userId,
        status: "online",
      });
    });

    // Store user connection
    activeUsers.set(socket.userId, socket.id);

    // Emit user online status to all clients
    io.emit("user-status", {
      userId: socket.userId,
      status: "online",
    });

    // Join conversation rooms
    socket.on("join-conversation", (conversationId) => {
      socket.join(`conversation-${conversationId}`);
      console.log(`User ${socket.userId} joined conversation ${conversationId}`);
    });

    // Leave conversation rooms
    socket.on("leave-conversation", (conversationId) => {
      socket.leave(`conversation-${conversationId}`);
      console.log(`User ${socket.userId} left conversation ${conversationId}`);
    });

    // Handle new message
    socket.on("send-message", async (data) => {
      const { conversationId, message } = data;

      // Broadcast to conversation room (excluding sender)
      socket.to(`conversation-${conversationId}`).emit("new-message", message);

      // Mark message as delivered immediately (optimistic)
      try {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();

        await prisma.message.update({
          where: { id: message.id },
          data: { deliveredAt: new Date() }
        });

        await prisma.$disconnect();
      } catch (error) {
        console.error('Error marking message as delivered:', error);
      }

      console.log(`Message sent in conversation ${conversationId}`);
    });

    // Handle typing indicator
    socket.on("typing", (data) => {
      const { conversationId, isTyping } = data;
      socket.to(`conversation-${conversationId}`).emit("user-typing", {
        userId: socket.userId,
        isTyping,
      });
    });

    // Handle message read status
    socket.on("mark-read", (data) => {
      const { conversationId, messageIds } = data;
      socket.to(`conversation-${conversationId}`).emit("messages-read", {
        messageIds,
        readBy: socket.userId,
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
      activeUsers.delete(socket.userId);

      // Emit user offline status
      io.emit("user-status", {
        userId: socket.userId,
        status: "offline",
      });
    });
  });

  // Expose Socket.io instance to Next.js API routes
  global.io = io;

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.io server running`);
    });
});
