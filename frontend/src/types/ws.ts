export type JobStatus = 'waiting' | 'processing' | 'completed' | 'failed'

export interface WSMessage {
  jobId: string
  status: JobStatus
  progress?: number
  message?: string
  paperId?: string
  error?: string
}