import { Server } from 'socket.io'
import { setIO } from './events'

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  setIO(io)

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join', (jobId: string) => {
      socket.join(jobId)
      console.log(`Socket joined room: ${jobId}`)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return io
}