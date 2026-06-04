"use strict";
// import { CreateAssignmentDTO } from '../types'
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = void 0;
const buildPrompt = (assignment) => {
    const questionBreakdown = assignment.questionTypes
        .map((qt) => `- ${qt.count} ${qt.type.toUpperCase()} questions, ${qt.marks} marks each`)
        .join('\n');
    return `You are an expert teacher. Generate a question paper with the following details:

Subject: ${assignment.subject}
Title: ${assignment.title}
Total Marks: ${assignment.totalMarks}
Difficulty: ${assignment.difficulty}
Additional Instructions: ${assignment.instructions || 'None'}

Question Breakdown:
${questionBreakdown}

Generate the question paper in the following JSON format ONLY. Do not add any extra text:
{
  "title": "${assignment.title}",
  "subject": "${assignment.subject}",
  "totalMarks": ${assignment.totalMarks},
  "duration": 180,
  "sections": [
    {
      "id": "section-a",
      "title": "Section A",
      "instruction": "Attempt all questions",
      "totalMarks": 20,
      "questions": [
        {
          "id": "q1",
          "text": "Question text here",
          "type": "mcq",
          "difficulty": "easy",
          "marks": 2,
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Option A"
        }
      ]
    }
  ]
}

Rules:
- Group questions by type into sections (Section A for MCQ, Section B for Short, etc.)
- Each question must have id, text, type, difficulty, marks, answer
- MCQ questions must have 4 options and answer must be one of the options
- Short/Long answer questions must have a detailed model answer
- True/False questions must have answer as "True" or "False"
- Match total marks exactly to ${assignment.totalMarks}
- Return ONLY valid JSON, nothing else`;
};
exports.buildPrompt = buildPrompt;
