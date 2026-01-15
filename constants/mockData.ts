// Mock Data for Serve-U Prototype

export const MOCK_ADMIN = {
  id: "admin-1",
  email: "admin@serve-u.com",
  name: "Super Admin",
  role: "SUPER_ADMIN",
  createdAt: new Date().toISOString(),
};

export const MOCK_USERS = [
  {
    id: "user-1",
    firstName: "Alex",
    lastName: "Consumer",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isUserSignUpForWorker: false,
    address: "123 Main St, Sydney NSW",
  },
  {
    id: "user-2",
    firstName: "Sarah",
    lastName: "Worker",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isUserSignUpForWorker: true, // This user is also a worker
    address: "456 Park Ave, Melbourne VIC",
  }
];

export const MOCK_WORKERS = [
  {
    id: "worker-1",
    userId: "user-2", // Links to Sarah Smith
    name: "Sarah Smith",
    title: "Expert Plumber",
    category: "Plumbing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 4.9,
    jobsCompleted: 124,
    hourlyRate: 85,
    bio: "Certified plumber with 10 years of experience in residential and commercial repairs. I specialize in leak detection and pipe replacement.",
    experience: "10 Years",
    education: "Tafe NSW - Certificate III in Plumbing",
    location: "Melbourne, VIC",
    services: [
      { id: "s1", title: "Leak Repair", price: 150, type: "FIXED" },
      { id: "s2", title: "Pipe Installation", price: 85, type: "HOURLY" },
      { id: "s3", title: "Emergency Callout", price: 200, type: "FIXED" }
    ],
    portfolio: [
      { id: "p1", title: "Bathroom Reno", image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&w=400&q=80" },
      { id: "p2", title: "Kitchen Sink", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "worker-2",
    userId: "user-3",
    name: "Mike Ross",
    title: "Master Electrician",
    category: "Electrical",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    rating: 4.8,
    jobsCompleted: 89,
    hourlyRate: 95,
    bio: "Fully licensed electrician. Safety is my priority. Available for rewiring, lighting installations, and switchboard upgrades.",
    experience: "8 Years",
    education: "Master Electricians Australia Member",
    location: "Sydney, NSW",
    services: [
      { id: "s4", title: "Lighting Install", price: 120, type: "FIXED" },
      { id: "s5", title: "Safety Inspection", price: 200, type: "FIXED" }
    ],
    portfolio: [
      { id: "p3", title: "Smart Home Setup", image: "https://images.unsplash.com/photo-1558002038-1091a575039f?auto=format&fit=crop&w=400&q=80" }
    ]
  },
  {
    id: "worker-3",
    userId: "user-4",
    name: "Jenny Doe",
    title: "Professional Cleaner",
    category: "Cleaning",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny",
    rating: 5.0,
    jobsCompleted: 215,
    hourlyRate: 45,
    bio: "Reliable and thorough cleaner for your home or office. I bring my own eco-friendly supplies.",
    experience: "5 Years",
    education: "Certificate in Cleaning Operations",
    location: "Brisbane, QLD",
    services: [
      { id: "s6", title: "Standard Clean (2 Bed)", price: 120, type: "FIXED" },
      { id: "s7", title: "Deep Clean", price: 50, type: "HOURLY" }
    ],
    portfolio: []
  },
];

export const SERVICE_CATEGORIES = [
  "Plumbing", "Electrical", "Cleaning", "Landscaping", "Moving", "Painting", "General Repair"
];

// --- MOCK CHAT DATA ---

export const MOCK_CONVERSATIONS = [
  {
    id: "convo-1",
    consumerId: "user-1", // Alex Consumer
    workerId: "user-2",   // Sarah Worker
    lastMessageAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    lastMessageText: "Okay, I'll see you at 2 PM. Thanks!",
    consumerUnreadCount: 0,
    workerUnreadCount: 0,
  },
  {
    id: "convo-2",
    consumerId: "user-1", // Alex Consumer
    workerId: "user-3",   // Mike Ross (from MOCK_WORKERS)
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    lastMessageText: "Can you provide a quote for the full rewiring?",
    consumerUnreadCount: 1,
    workerUnreadCount: 0,
  },
  {
    id: "convo-3",
    consumerId: "user-5", // Dummy user
    workerId: "user-2",   // Sarah Worker
    lastMessageAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    lastMessageText: "Payment has been sent. Great work!",
    consumerUnreadCount: 0,
    workerUnreadCount: 0,
  },
];

export const MOCK_MESSAGES = {
  "convo-1": [
    {
      id: "msg-1-1",
      conversationId: "convo-1",
      senderId: "user-2", // Sarah Worker
      senderType: "WORKER",
      messageType: "TEXT",
      content: "Hi Alex, I've reviewed your request for the leak repair. I can be there at 2 PM today.",
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      readAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-1-2",
      conversationId: "convo-1",
      senderId: "user-1", // Alex Consumer
      senderType: "USER",
      messageType: "TEXT",
      content: "Okay, I'll see you at 2 PM. Thanks!",
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      readAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    },
  ],
  "convo-2": [
    {
      id: "msg-2-1",
      conversationId: "convo-2",
      senderId: "user-1", // Alex Consumer
      senderType: "USER",
      messageType: "TEXT",
      content: "Hi Mike, I saw your profile. I need some electrical work done.",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      readAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-2-2",
      conversationId: "convo-2",
      senderId: "user-3", // Mike Ross
      senderType: "WORKER",
      messageType: "TEXT",
      content: "Hi Alex, happy to help. What do you need?",
      createdAt: new Date(Date.now() - 2.2 * 60 * 60 * 1000).toISOString(),
      readAt: new Date(Date.now() - 2.1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-2-3",
      conversationId: "convo-2",
      senderId: "user-1", // Alex Consumer
      senderType: "USER",
      messageType: "TEXT",
      content: "Can you provide a quote for the full rewiring?",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      readAt: null, // This is the unread message
    },
  ],
};
