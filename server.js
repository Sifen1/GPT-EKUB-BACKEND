const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
const spinnerRoutes = require('./routes/spinnerRoutes');

dotenv.config();

// Initialize App
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.set('io', io);


// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Sample route
app.get('/', (req, res) => {
  res.send('EKUB API is running...');
});

// Add routes (we'll add these later)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/spinner', require('./routes/spinnerRoutes'));
app.use('/api/winners', require('./routes/winners'));

// Socket.IO logic (we’ll expand later)
io.on('connection', (socket) => {
  console.log('🟢 New client connected');

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

//


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
