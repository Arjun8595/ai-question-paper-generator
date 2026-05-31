export interface QuestionType {
  type: 'mcq' | 'short' | 'long' | 'truefalse'
  count: number
  marks: number
}

export interface CreateAssignmentDTO {
  title: string
  subject: string
  dueDate: string
  totalMarks: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  questionTypes: QuestionType[]
  instructions?: string
}

export interface Question {
  id: string
  text: string
  type: 'mcq' | 'short' | 'long' | 'truefalse'
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
  options?: string[]
}

export interface Section {
  id: string
  title: string
  instruction: string
  questions: Question[]
  totalMarks: number
}

export interface GeneratedPaperData {
  title: string
  subject: string
  totalMarks: number
  duration?: number
  sections: Section[]
}