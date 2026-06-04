"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGenerationWorker = void 0;
const bullmq_1 = require("bullmq");
const ai_service_1 = require("../services/ai.service");
const paper_service_1 = require("../services/paper.service");
const events_1 = require("../socket/events");
const Assignment_1 = __importDefault(require("../models/Assignment"));
const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
};
const startGenerationWorker = () => {
    const worker = new bullmq_1.Worker('generation', async (job) => {
        const { assignmentId, assignment } = job.data;
        try {
            (0, events_1.emitProgress)(job.id, 10, 'Starting generation...');
            await Assignment_1.default.findByIdAndUpdate(assignmentId, { status: 'processing' });
            (0, events_1.emitProgress)(job.id, 30, 'Building prompt...');
            (0, events_1.emitProgress)(job.id, 50, 'Generating questions with AI...');
            const paperData = await (0, ai_service_1.generateWithAI)(assignment);
            (0, events_1.emitProgress)(job.id, 80, 'Saving question paper...');
            const paper = await (0, paper_service_1.savePaper)(assignmentId, paperData);
            (0, events_1.emitProgress)(job.id, 95, 'Almost done...');
            (0, events_1.emitCompleted)(job.id, paper._id.toString());
        }
        catch (error) {
            await Assignment_1.default.findByIdAndUpdate(assignmentId, { status: 'failed' });
            (0, events_1.emitFailed)(job.id, error.message);
            throw error;
        }
    }, { connection });
    worker.on('completed', (job) => console.log(`Job ${job.id} completed ✅`));
    worker.on('failed', (job, err) => console.error(`Job ${job?.id} failed:`, err));
    return worker;
};
exports.startGenerationWorker = startGenerationWorker;
