import { create } from 'zustand'
import { CreateAssignmentPayload, QuestionType } from '@/types/assignment'

interface AssignmentStore {
  form: CreateAssignmentPayload
  jobId: string | null
  isSubmitting: boolean
  setField: (field: keyof CreateAssignmentPayload, value: any) => void
  setQuestionTypes: (questionTypes: QuestionType[]) => void
  setJobId: (jobId: string) => void
  setIsSubmitting: (val: boolean) => void
  resetForm: () => void
}

const defaultForm: CreateAssignmentPayload = {
  title: '',
  subject: '',
  dueDate: '',
  totalMarks: 100,
  difficulty: 'mixed',
  questionTypes: [],
  instructions: '',
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  form: defaultForm,
  jobId: null,
  isSubmitting: false,
  setField: (field, value) =>
    set((state) => ({ form: { ...state.form, [field]: value } })),
  setQuestionTypes: (questionTypes) =>
    set((state) => ({ form: { ...state.form, questionTypes } })),
  setJobId: (jobId) => set({ jobId }),
  setIsSubmitting: (val) => set({ isSubmitting: val }),
  resetForm: () => set({ form: defaultForm, jobId: null }),
}))