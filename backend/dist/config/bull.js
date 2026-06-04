"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfQueue = exports.generationQueue = void 0;
const bullmq_1 = require("bullmq");
const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    tls: {},
};
exports.generationQueue = new bullmq_1.Queue('generation', { connection });
exports.pdfQueue = new bullmq_1.Queue('pdf', { connection });
