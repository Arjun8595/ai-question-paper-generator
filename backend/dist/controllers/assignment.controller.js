"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenerateAssignment = exports.getAssignmentById = exports.getAssignments = exports.createAssignment = void 0;
const Assignment_1 = __importDefault(require("../models/Assignment"));
const bull_1 = require("../config/bull");
const createAssignment = async (req, res) => {
    try {
        const assignment = await Assignment_1.default.create(req.body);
        const job = await bull_1.generationQueue.add('generate', {
            assignmentId: assignment._id.toString(),
            assignment: req.body,
        });
        res.status(201).json({
            assignmentId: assignment._id.toString(),
            jobId: job.id,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createAssignment = createAssignment;
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment_1.default.find().sort({ createdAt: -1 });
        res.json(assignments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAssignments = getAssignments;
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment_1.default.findById(req.params.id);
        if (!assignment)
            return res.status(404).json({ message: 'Assignment not found' });
        res.json(assignment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAssignmentById = getAssignmentById;
const regenerateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment_1.default.findById(req.params.id);
        if (!assignment)
            return res.status(404).json({ message: 'Assignment not found' });
        await Assignment_1.default.findByIdAndUpdate(req.params.id, { status: 'pending' });
        const job = await bull_1.generationQueue.add('generate', {
            assignmentId: assignment._id.toString(),
            assignment: assignment.toObject(),
        });
        res.json({ jobId: job.id });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.regenerateAssignment = regenerateAssignment;
