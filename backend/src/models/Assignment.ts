import mongoose, { Schema } from 'mongoose'

const QuestionTypeSchema = new Schema({
  type: { type: String, enum: ['mcq', 'short', 'long', 'truefalse'] },
  count: Number,
  marks: Number,
})

const AssignmentSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  dueDate: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'mixed'] },
  questionTypes: [QuestionTypeSchema],
  instructions: String,
  fileUrl: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
}, { timestamps: true })

export default mongoose.model('Assignment', AssignmentSchema)