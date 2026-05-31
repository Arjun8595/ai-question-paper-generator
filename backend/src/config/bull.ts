import { Queue } from 'bullmq'

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}

export const generationQueue = new Queue('generation', { connection })
export const pdfQueue = new Queue('pdf', { connection })