"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPdfWorker = void 0;
const bullmq_1 = require("bullmq");
const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    tls: {},
};
const startPdfWorker = () => {
    const worker = new bullmq_1.Worker('pdf', async (job) => {
        console.log('PDF job started:', job.id);
    }, { connection });
    return worker;
};
exports.startPdfWorker = startPdfWorker;
