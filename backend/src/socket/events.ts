import { Server } from 'socket.io'

let io: Server

export const setIO = (socketIO: Server) => {
  io = socketIO
}

export const emitProgress = (jobId: string, progress: number, message: string) => {
  io?.to(jobId).emit('job:progress', { jobId, status: 'processing', progress, message })
}

export const emitCompleted = (jobId: string, paperId: string) => {
  io?.to(jobId).emit('job:completed', { jobId, status: 'completed', progress: 100, paperId })
}

export const emitFailed = (jobId: string, error: string) => {
  io?.to(jobId).emit('job:failed', { jobId, status: 'failed', error })
}