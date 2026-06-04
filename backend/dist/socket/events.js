"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitFailed = exports.emitCompleted = exports.emitProgress = exports.setIO = void 0;
let io;
const setIO = (socketIO) => {
    io = socketIO;
};
exports.setIO = setIO;
const emitProgress = (jobId, progress, message) => {
    io?.to(jobId).emit('job:progress', { jobId, status: 'processing', progress, message });
};
exports.emitProgress = emitProgress;
const emitCompleted = (jobId, paperId) => {
    io?.to(jobId).emit('job:completed', { jobId, status: 'completed', progress: 100, paperId });
};
exports.emitCompleted = emitCompleted;
const emitFailed = (jobId, error) => {
    io?.to(jobId).emit('job:failed', { jobId, status: 'failed', error });
};
exports.emitFailed = emitFailed;
