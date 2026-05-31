// export interface Question {
//   id: string
//   text: string
//   type: 'mcq' | 'short' | 'long' | 'truefalse'
//   difficulty: 'easy' | 'medium' | 'hard'
//   marks: number
//   options?: string[]
// }

// export interface Section {
//   id: string
//   title: string
//   instruction: string
//   questions: Question[]
//   totalMarks: number
// }

// export interface GeneratedPaper {
//   _id?: string
//   assignmentId: string
//   title: string
//   subject: string
//   totalMarks: number
//   duration?: number
//   sections: Section[]
//   createdAt?: string
// }

export interface Question {
  id: string
  text: string
  type: 'mcq' | 'short' | 'long' | 'truefalse'
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
  options?: string[]
  answer?: string
}

export interface Section {
  id: string
  title: string
  instruction: string
  questions: Question[]
  totalMarks: number
}

export interface GeneratedPaper {
  _id?: string
  assignmentId: string
  title: string
  subject: string
  totalMarks: number
  duration?: number
  sections: Section[]
  createdAt?: string
}