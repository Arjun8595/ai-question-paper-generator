"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePaper = void 0;
const GeneratedPaper_1 = __importDefault(require("../models/GeneratedPaper"));
const Assignment_1 = __importDefault(require("../models/Assignment"));
const cache_service_1 = require("./cache.service");
const savePaper = async (assignmentId, data) => {
    const paper = await GeneratedPaper_1.default.create({
        assignmentId,
        ...data,
    });
    await Assignment_1.default.findByIdAndUpdate(assignmentId, { status: 'completed' });
    await (0, cache_service_1.setCache)(`paper:${assignmentId}`, paper);
    return paper;
};
exports.savePaper = savePaper;
