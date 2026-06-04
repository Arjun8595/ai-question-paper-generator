"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaperByAssignmentId = void 0;
const GeneratedPaper_1 = __importDefault(require("../models/GeneratedPaper"));
const cache_service_1 = require("../services/cache.service");
const getPaperByAssignmentId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching paper for assignment:', id);
        const cached = await (0, cache_service_1.getCache)(`paper:${id}`);
        if (cached) {
            console.log('Returning cached paper ✅');
            return res.json(cached);
        }
        const paper = await GeneratedPaper_1.default.findOne({ assignmentId: id });
        console.log('Paper from DB:', paper ? 'Found ✅' : 'Not Found ❌');
        if (!paper)
            return res.status(404).json({ message: 'Paper not found' });
        await (0, cache_service_1.setCache)(`paper:${id}`, paper);
        res.json(paper);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPaperByAssignmentId = getPaperByAssignmentId;
