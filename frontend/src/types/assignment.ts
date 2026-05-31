export interface QuestionType {
  type: 'mcq' | 'short' | 'long' | 'truefalse'
  count: number
  marks: number
}

export interface Assignment {
  _id?: string
  title: string
  subject: string
  dueDate: string
  totalMarks: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  questionTypes: QuestionType[]
  instructions: string
  fileUrl?: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt?: string
}

export interface CreateAssignmentPayload {
  title: string
  subject: string
  dueDate: string
  totalMarks: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  questionTypes: QuestionType[]
  instructions: string
}