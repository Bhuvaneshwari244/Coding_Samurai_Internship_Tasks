const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Real-time connection logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for chat messages (now receives an object with name & text)
  socket.on('chat message', (data) => {
    // Broadcast the message to everyone
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on Port 3000
server.listen(3000, () => {
  console.log('✅ Chat Server running on http://localhost:3000');
});