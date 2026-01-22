// Mock Data for Serve-U Prototype (Pakistan-Based)

export const MOCK_ADMIN = {
  id: "admin-1",
  email: "admin@serveu.pk",
  name: "System Administrator",
  role: "SUPER_ADMIN",
  createdAt: new Date().toISOString(),
};

export const MOCK_USERS = [
  {
    id: "user-1",
    firstName: "Danyal",
    lastName: "Khan",
    email: "danyal@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DanyalKhan",
    isUserSignUpForWorker: false,
    address: "House 45, Street 10, G-11, Islamabad",
  },
  {
    id: "user-2",
    firstName: "Muhammad",
    lastName: "Haroon",
    email: "haroon@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HaroonAhmed",
    isUserSignUpForWorker: true,
    address: "Block B, Gulshan-e-Iqbal, Karachi",
  },
];

export const MOCK_WORKERS = [
  {
    id: "worker-1",
    userId: "user-2",
    name: "Muhammad Haroon",
    title: "Certified Plumber",
    category: "Plumbing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HaroonAhmed",
    rating: 4.8,
    jobsCompleted: 138,
    hourlyRate: 1800, // PKR
    bio: "Professional plumber with over 9 years of experience in residential and commercial plumbing across Karachi.",
    experience: "9 Years",
    education: "DAE Plumbing – Government Polytechnic Institute",
    location: "Karachi, Sindh",
    services: [
      { id: "s1", title: "Leak Repair", price: 3500, type: "FIXED" },
      { id: "s2", title: "Pipe Installation", price: 1800, type: "HOURLY" },
      { id: "s3", title: "Emergency Plumbing Service", price: 5000, type: "FIXED" },
    ],
    portfolio: [
      {
        id: "p1",
        title: "Bathroom Pipe Replacement",
        image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a",
      },
    ],
  },
  {
    id: "worker-2",
    userId: "user-3",
    name: "Ali Raza",
    title: "Licensed Electrician",
    category: "Electrical",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AliRaza",
    rating: 4.7,
    jobsCompleted: 94,
    hourlyRate: 2200,
    bio: "Experienced electrician providing safe and reliable electrical services including wiring and installations.",
    experience: "8 Years",
    education: "TEVTA – Electrical Technology",
    location: "Lahore, Punjab",
    services: [
      { id: "s4", title: "House Wiring", price: 25000, type: "FIXED" },
      { id: "s5", title: "Electrical Inspection", price: 4000, type: "FIXED" },
    ],
    portfolio: [
      {
        id: "p2",
        title: "Complete House Wiring",
        image: "https://images.unsplash.com/photo-1558002038-1091a575039f",
      },
    ],
  },
  {
    id: "worker-3",
    userId: "user-4",
    name: "Ayesha Malik",
    title: "Professional Cleaner",
    category: "Cleaning",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AyeshaMalik",
    rating: 5.0,
    jobsCompleted: 260,
    hourlyRate: 1200,
    bio: "Reliable home and office cleaning services using eco-friendly products.",
    experience: "6 Years",
    education: "Certified Cleaning Supervisor – NAVTTC",
    location: "Rawalpindi, Punjab",
    services: [
      { id: "s6", title: "Home Cleaning (3 Bed)", price: 5000, type: "FIXED" },
      { id: "s7", title: "Deep Cleaning", price: 1200, type: "HOURLY" },
    ],
    portfolio: [],
  },
];

export const SERVICE_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "Car Repair",
  "Appliance Repair",
  "CCTV Installation",
];

// --- MOCK CHAT DATA ---

export const MOCK_CONVERSATIONS = [
  {
    id: "convo-1",
    consumerId: "user-1",
    workerId: "user-2",
    lastMessageAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    lastMessageText: "theek hai ap aa jana",
    consumerUnreadCount: 0,
    workerUnreadCount: 0,
  },
  {
    id: "convo-2",
    consumerId: "user-1",
    workerId: "user-3",
    lastMessageAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    lastMessageText: "Complete wiring ka estimate bata dein.",
    consumerUnreadCount: 1,
    workerUnreadCount: 0,
  },
];

export const MOCK_MESSAGES = {
  "convo-1": [
    {
      id: "msg-1-1",
      conversationId: "convo-1",
      senderId: "user-2",
      senderType: "WORKER",
      messageType: "TEXT",
      content: "Assalam-o-Alaikum Danyal bhai, main leak repair ke liye 2 baje aa sakta hoon.",
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      readAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-1-2",
      conversationId: "convo-1",
      senderId: "user-1",
      senderType: "USER",
      messageType: "TEXT",
      content: "Theek hai, main wait kar raha hoon. Shukriya!",
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      readAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    },
  ],
};
