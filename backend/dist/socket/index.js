"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const events_1 = require("./events");
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });
    (0, events_1.setIO)(io);
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('join', (jobId) => {
            socket.join(jobId);
            console.log(`Socket joined room: ${jobId}`);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
    return io;
};
exports.initSocket = initSocket;
