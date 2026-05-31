// import mongoose, { Schema } from 'mongoose'

// const QuestionSchema = new Schema({
//   id: String,
//   text: String,
//   type: { type: String, enum: ['mcq', 'short', 'long', 'truefalse'] },
//   difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
//   marks: Number,
//   options: [String],
// })

// const SectionSchema = new Schema({
//   id: String,
//   title: String,
//   instruction: String,
//   questions: [QuestionSchema],
//   totalMarks: Number,
// })

// const GeneratedPaperSchema = new Schema({
//   assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
//   title: String,
//   subject: String,
//   totalMarks: Number,
//   duration: Number,
//   sections: [SectionSchema],
// }, { timestamps: true })

// export default mongoose.model('GeneratedPaper', GeneratedPaperSchema)

import mongoose, { Schema } from 'mongoose'

const QuestionSchema = new Schema({
  id: String,
  text: String,
  type: { type: String, enum: ['mcq', 'short', 'long', 'truefalse'] },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  marks: Number,
  options: [String],
  answer: String,
})

const SectionSchema = new Schema({
  id: String,
  title: String,
  instruction: String,
  questions: [QuestionSchema],
  totalMarks: Number,
})

const GeneratedPaperSchema = new Schema({
  assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  title: String,
  subject: String,
  totalMarks: Number,
  duration: Number,
  sections: [SectionSchema],
}, { timestamps: true })

export default mongoose.model('GeneratedPaper', GeneratedPaperSchema)