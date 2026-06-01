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

app.use(cors())
app.use(express.json())

connectDB()
initSocket(server)
startGenerationWorker()
startPdfWorker()

app.use('/api/assignments', assignmentRoutes)
app.use('/api/assignments', paperRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})