const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/ride');
const userRoutes = require('./routes/user');
const driverRoutes = require('./routes/driver');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:3000',               // local dev
  'https://glide-frontend.onrender.com'  // deployed frontend
];

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  },
});

// ✅ Apply CORS before routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ✅ Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log('User', userId, 'joined their room.');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes(io)); // Pass io instance to ride routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
