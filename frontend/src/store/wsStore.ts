import { create } from 'zustand'
import { JobStatus } from '@/types/ws'

interface WSStore {
  status: JobStatus | null
  progress: number
  message: string
  setStatus: (status: JobStatus) => void
  setProgress: (progress: number) => void
  setMessage: (message: string) => void
  reset: () => void
}

export const useWSStore = create<WSStore>((set) => ({
  status: null,
  progress: 0,
  message: '',
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  setMessage: (message) => set({ message }),
  reset: () => set({ status: null, progress: 0, message: '' }),
}))