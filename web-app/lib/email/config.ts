/**
 * Email Service Configuration
 * Using Nodemailer with SMTP
 */

import nodemailer from "nodemailer";

// Email configuration from environment variables
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || "noreply@serve-u.com",
  fromName: process.env.EMAIL_FROM_NAME || "Serve U",
  replyTo: process.env.EMAIL_REPLY_TO || "support@serve-u.com",
};

// Create transporter based on environment
export const createEmailTransporter = () => {
  // Use SMTP configuration from environment
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Fallback to Ethereal for development (creates test account)
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "⚠️  No SMTP configuration found. Using Ethereal for development."
    );
    console.warn(
      "   Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD to .env for production."
    );

    // Return a transporter that will be configured later with Ethereal
    return null;
  }

  throw new Error(
    "Email configuration not found. Please set SMTP_* environment variables."
  );
};

// Get email transporter (singleton)
let transporter: nodemailer.Transporter | null = null;

export const getEmailTransporter = async () => {
  if (transporter) {
    return transporter;
  }

  transporter = createEmailTransporter();

  // If no transporter (development mode), create Ethereal test account
  if (!transporter && process.env.NODE_ENV === "development") {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("📧 Ethereal test account created:");
    console.log("   User:", testAccount.user);
    console.log("   Pass:", testAccount.pass);
  }

  return transporter;
};
