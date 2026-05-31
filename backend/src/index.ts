import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import { initSocket } from './socket'
import { startGenerationWorker } from './workers/generation.worker'
import { startPdfWorker } from './workers/pdf.worker'
import assignmentRoutes from './routes/assignment.routes'
import paperRoutes from './routes/paper.routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const server = http.createServer(app)

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// Database
connectDB()

// Socket
initSocket(server)

// Workers
startGenerationWorker()
startPdfWorker()

// Routes
// app.use('/api/assignments', assignmentRoutes)
// app.use('/api/assignments', paperRoutes)
// Routes
app.use('/api/assignments', assignmentRoutes)
app.use('/api/assignments', paperRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})