import { z } from 'zod'

export const questionTypeSchema = z.object({
  type: z.enum(['mcq', 'short', 'long', 'truefalse']),
  count: z.number().min(1, 'Minimum 1 question'),
  marks: z.number().min(1, 'Minimum 1 mark'),
})

export const assignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subject: z.string().min(1, 'Subject is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  totalMarks: z.number().min(1, 'Total marks required'),
  difficulty: z.enum(['easy', 'medium', 'hard', 'mixed']),
  questionTypes: z.array(questionTypeSchema).min(1, 'Add at least one question type'),
  instructions: z.string().optional(),
})

export type AssignmentFormData = z.infer<typeof assignmentSchema>