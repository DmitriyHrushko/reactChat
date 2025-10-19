/**
 * This server handles:
 * - Product events (created, updated, deleted)
 * - Chat messages per product room
 * 
 * To run: node server/index.js
 */

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

const loadMessages = () => {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
  }
  return {};
};

const saveMessages = (messages) => {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving messages:', error);
  }
};

let messagesStore = loadMessages();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://your-app.vercel.app', 'https://your-app-*.vercel.app'] // Replace with your Vercel URL
      : 'http://localhost:5173', // Vite dev server
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Store online users per product room
const productRooms = new Map();

io.on('connection', (socket) => {

  // Join product room
  socket.on('join-product-room', ({ productId }) => {
    socket.join(`product-${productId}`);


    // Track users in room
    if (!productRooms.has(productId)) {
      productRooms.set(productId, new Set());
    }
    productRooms.get(productId).add(socket.id);

    // Send existing messages to the newly joined user
    const existingMessages = messagesStore[productId] || [];
    if (existingMessages.length > 0) {

      socket.emit('chat-history', { productId, messages: existingMessages });
    }
  });

  // Leave product room
  socket.on('leave-product-room', ({ productId }) => {
    socket.leave(`product-${productId}`);


    // Remove from tracking
    if (productRooms.has(productId)) {
      productRooms.get(productId).delete(socket.id);
    }
  });

  socket.on('product-created', (product) => {

    // Broadcast to all clients
    socket.broadcast.emit('product-created', product);
  });

  socket.on('product-updated', (product) => {

    socket.broadcast.emit('product-updated', product);
  });

  socket.on('product-deleted', ({ id }) => {

    socket.broadcast.emit('product-deleted', { id });
  });

  socket.on('send-chat-message', ({ productId, message, username }) => {


    const chatMessage = {
      id: `${Date.now()}-${socket.id}`,
      productId,
      userId: socket.id,
      username,
      message,
      timestamp: new Date().toISOString(),
    };

    // Save message to storage
    if (!messagesStore[productId]) {
      messagesStore[productId] = [];
    }
    messagesStore[productId].push(chatMessage);
    saveMessages(messagesStore);

    // Broadcast to ALL clients in the product room (including sender)
    io.to(`product-${productId}`).emit('chat-message', chatMessage);

  });

  // Disconnect
  socket.on('disconnect', () => {


    // Remove from all rooms
    productRooms.forEach((users, productId) => {
      users.delete(socket.id);
      if (users.size === 0) {
        productRooms.delete(productId);
      }
    });
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  // Keep minimal startup info
  console.log(`Socket.IO server listening on port ${PORT}`);
});
