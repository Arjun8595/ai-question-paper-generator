import { Worker, Job } from 'bullmq'

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  tls: {},
}

export const startPdfWorker = () => {
  const worker = new Worker('pdf', async (job: Job) => {
    console.log('PDF job started:', job.id)
  }, { connection })

  return worker
}