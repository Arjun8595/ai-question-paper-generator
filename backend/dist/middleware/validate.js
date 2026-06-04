"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAssignment = void 0;
const validateAssignment = (req, res, next) => {
    const { title, subject, dueDate, totalMarks, questionTypes } = req.body;
    if (!title || !subject || !dueDate || !totalMarks) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (totalMarks <= 0) {
        return res.status(400).json({ message: 'Total marks must be greater than 0' });
    }
    if (!questionTypes || questionTypes.length === 0) {
        return res.status(400).json({ message: 'At least one question type is required' });
    }
    next();
};
exports.validateAssignment = validateAssignment;
