import { create } from 'zustand'
import { GeneratedPaper } from '@/types/paper'

interface PaperStore {
  paper: GeneratedPaper | null
  isLoading: boolean
  error: string | null
  setPaper: (paper: GeneratedPaper) => void
  setLoading: (val: boolean) => void
  setError: (err: string | null) => void
  reset: () => void
}

export const usePaperStore = create<PaperStore>((set) => ({
  paper: null,
  isLoading: false,
  error: null,
  setPaper: (paper) => set({ paper }),
  setLoading: (val) => set({ isLoading: val }),
  setError: (err) => set({ error: err }),
  reset: () => set({ paper: null, isLoading: false, error: null }),
}))