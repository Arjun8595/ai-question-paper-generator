"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWithAI = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const buildSectionPrompt = (subject, title, difficulty, type, count, marks, sectionId, sectionTitle, instructions) => {
    return `You are an expert teacher. Generate exactly ${count} ${type.toUpperCase()} questions for:

Subject: ${subject}
Title: ${title}
Difficulty: ${difficulty}
Instructions: ${instructions || 'None'}

Return ONLY this JSON, no extra text:
{
  "id": "${sectionId}",
  "title": "${sectionTitle}",
  "instruction": "Attempt all questions",
  "totalMarks": ${count * marks},
  "questions": [
    {
      "id": "q1",
      "text": "Question text here",
      "type": "${type}",
      "difficulty": "${difficulty === 'mixed' ? 'medium' : difficulty}",
      "marks": ${marks},
      ${type === 'mcq' ? '"options": ["Option A", "Option B", "Option C", "Option D"],' : ''}
      "answer": "${type === 'mcq' ? 'Option A' : type === 'truefalse' ? 'True' : 'Detailed answer here'}"
    }
  ]
}

Rules:
- Generate EXACTLY ${count} questions
- ${type === 'mcq' ? 'Each MCQ must have 4 options and answer must be one of them' : ''}
- ${type === 'truefalse' ? 'Answer must be True or False' : ''}
- ${type === 'short' || type === 'long' ? 'Answer must be a proper model answer' : ''}
- Return ONLY valid JSON`;
};
const generateWithAI = async (assignment) => {
    const groq = new groq_sdk_1.default({
        apiKey: process.env.GROQ_API_KEY,
        timeout: 120000,
    });
    const sections = [];
    const sectionLetters = ['A', 'B', 'C', 'D', 'E'];
    for (let i = 0; i < assignment.questionTypes.length; i++) {
        const qt = assignment.questionTypes[i];
        const sectionId = `section-${sectionLetters[i].toLowerCase()}`;
        const sectionTitle = `Section ${sectionLetters[i]}`;
        console.log(`Generating ${qt.count} ${qt.type} questions...`);
        const prompt = buildSectionPrompt(assignment.subject, assignment.title, assignment.difficulty, qt.type, qt.count, qt.marks, sectionId, sectionTitle, assignment.instructions || '');
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 8000,
        });
        const text = completion.choices[0].message.content || '';
        const clean = text.replace(/```json|```/g, '').trim();
        const section = JSON.parse(clean);
        sections.push(section);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    const totalMarks = sections.reduce((sum, s) => sum + s.totalMarks, 0);
    return {
        title: assignment.title,
        subject: assignment.subject,
        totalMarks,
        duration: Math.ceil(totalMarks * 1.5),
        sections,
    };
};
exports.generateWithAI = generateWithAI;
