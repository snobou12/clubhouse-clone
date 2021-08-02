require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const socket = require('socket.io');
const { createServer } = require('http');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const roomService = require('./services/room-service');

const errorMiddleware = require('./middlewares/error-middleware');

const router = require('./router/index');
const PORT = process.env.PORT || 3001;

const app = express();

const server = createServer(app);

const io = socket(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

app.use('/api', router);
app.use(errorMiddleware);

const rooms = {};

const getUsersFromRoom = (rooms, roomId) =>
  Object.values(rooms)
    .filter((obj) => obj.roomId === roomId)
    .map((obj) => ({ ...obj.user, roomId }));

io.on('connection', (socket) => {
  console.log('Socket connect ', socket.id, ' user');

  socket.on('CLIENT@ROOMS:JOIN', ({ user, roomId }) => {
    socket.join(`room/${roomId}`);
    rooms[socket.id] = { roomId, user };
    const speakers = getUsersFromRoom(rooms, roomId);
    io.emit('SERVER@ROOMS:HOME', { roomId: Number(roomId), speakers });
    io.in(`room/${roomId}`).emit('SERVER@ROOMS:JOIN', speakers);
    roomService.updateRoom(speakers.length, speakers, roomId);
  });

  socket.on('CLIENT@ROOMS:CALL', ({ targetUserId, callerUserId, roomId, signal }) => {
    socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:CALL', {
      targetUserId,
      callerUserId,
      signal,
    });
  });

  socket.on('CLIENT@ROOMS:ANSWER', ({ targetUserId, callerUserId, roomId, signal }) => {
    socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:ANSWER', {
      targetUserId,
      callerUserId,
      signal,
    });
  });

  socket.on('disconnect', () => {
    if (rooms[socket.id]) {
      const { roomId, user } = rooms[socket.id];
      socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:LEAVE', user);
      delete rooms[socket.id];
      const speakers = getUsersFromRoom(rooms, roomId);
      io.emit('SERVER@ROOMS:HOME', { roomId, speakers });
      roomService.updateRoom(speakers.length, speakers, roomId);
    }
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server.listen(PORT, () => {
      console.log(`The server is running on ${PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
