/**
 * Simple Socket.IO Server for Product Manager App
 * 
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
    origin: 'http://localhost:5173', // Vite dev server
    methods: ['GET', 'POST'],
  },
});

// Store online users per product room
const productRooms = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join product room
  socket.on('join-product-room', ({ productId }) => {
    socket.join(`product-${productId}`);
    console.log(`Socket ${socket.id} joined product room: ${productId}`);

    // Track users in room
    if (!productRooms.has(productId)) {
      productRooms.set(productId, new Set());
    }
    productRooms.get(productId).add(socket.id);

    // Send existing messages to the newly joined user
    const existingMessages = messagesStore[productId] || [];
    if (existingMessages.length > 0) {
      console.log(`📜 Sending ${existingMessages.length} existing messages to ${socket.id}`);
      socket.emit('chat-history', { productId, messages: existingMessages });
    }
  });

  // Leave product room
  socket.on('leave-product-room', ({ productId }) => {
    socket.leave(`product-${productId}`);
    console.log(`Socket ${socket.id} left product room: ${productId}`);

    // Remove from tracking
    if (productRooms.has(productId)) {
      productRooms.get(productId).delete(socket.id);
    }
  });

  socket.on('product-created', (product) => {
    console.log('Product created:', product.title);
    // Broadcast to all clients
    socket.broadcast.emit('product-created', product);
  });

  socket.on('product-updated', (product) => {
    console.log('Product updated:', product.title);
    socket.broadcast.emit('product-updated', product);
  });

  socket.on('product-deleted', ({ id }) => {
    console.log('Product deleted:', id);
    socket.broadcast.emit('product-deleted', { id });
  });

  socket.on('send-chat-message', ({ productId, message, username }) => {
    console.log(`Chat message in product ${productId} from ${username}`);

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

    console.log('📤 Broadcasting chat message:', chatMessage);
    console.log('📍 To room: product-' + productId);
    console.log('💾 Saved to storage (total:', messagesStore[productId].length, 'messages)');

    // Broadcast to ALL clients in the product room (including sender)
    io.to(`product-${productId}`).emit('chat-message', chatMessage);

    console.log('✅ Message broadcasted successfully');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

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
  console.log(`✓ Socket.IO server running on http://localhost:${PORT}`);
  console.log('✓ Waiting for client connections...');
});
