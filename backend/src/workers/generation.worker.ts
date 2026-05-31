import { Worker, Job } from 'bullmq'
import { generateWithAI } from '../services/ai.service'
import { savePaper } from '../services/paper.service'
import { emitProgress, emitCompleted, emitFailed } from '../socket/events'
import Assignment from '../models/Assignment'

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}

export const startGenerationWorker = () => {
  const worker = new Worker('generation', async (job: Job) => {
    const { assignmentId, assignment } = job.data

    try {
      emitProgress(job.id!, 10, 'Starting generation...')

      await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' })

      emitProgress(job.id!, 30, 'Building prompt...')

      emitProgress(job.id!, 50, 'Generating questions with AI...')
      const paperData = await generateWithAI(assignment)

      emitProgress(job.id!, 80, 'Saving question paper...')
      const paper = await savePaper(assignmentId, paperData)

      emitProgress(job.id!, 95, 'Almost done...')
      emitCompleted(job.id!, paper._id.toString())

    } catch (error: any) {
      await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' })
      emitFailed(job.id!, error.message)
      throw error
    }
  }, { connection })

  worker.on('completed', (job) => console.log(`Job ${job.id} completed ✅`))
  worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err))

  return worker
}