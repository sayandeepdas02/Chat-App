// // backend/server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: { origin: '*' }
// });

// const PORT = 5001;

// io.on('connection', (socket) => {
//     console.log('New user connected: ', socket.id);

//     socket.on('join-room', (roomId, email) => {
//         socket.join(roomId);
//         socket.to(roomId).emit('user-joined', email);
//     });

//     socket.on('send-message', ({ roomId, message, email }) => {
//         io.to(roomId).emit('receive-message', { message, email });
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected: ', socket.id);
//     });
// });

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));









// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);

// // Allow requests from frontend
// app.use(cors({
//   origin: "http://localhost:3001", // your frontend
//   methods: ["GET", "POST"]
// }));


// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });


// // Simple test route
// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("message", (msg) => {
//     io.emit("message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// const PORT = 5001;
// server.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });










// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:3001", // your frontend
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// // Create Socket.IO server
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
//   transports: ["websocket", "polling"], // allow both transports
// });



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"], // force websocket only
});



// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join a room
  socket.on("join-room", (roomId, email) => {
    socket.join(roomId);
    console.log(`📌 ${email} joined room ${roomId}`);
    socket.to(roomId).emit("user-joined", email);
  });

  // Send a message to the room
  socket.on("send-message", ({ roomId, message, email }) => {
    console.log(`💬 Message from ${email} in room ${roomId}: ${message}`);
    io.to(roomId).emit("receive-message", { email, message });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
