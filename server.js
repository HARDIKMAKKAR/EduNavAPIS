require('dotenv').config();
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const db = require('./database/db');
const router = require('./routes/auth-routes');
const cors = require('cors');
const app = express();

// Create the HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:4200', // Angular app
    methods: ['GET', 'POST']
  }
});

// Initialize database connection
db();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', router);

// Setup Socket.IO
require('./socket')(io);

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not defined in .env
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
