"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paper_controller_1 = require("../controllers/paper.controller");
const router = (0, express_1.Router)();
router.get('/:id/paper', paper_controller_1.getPaperByAssignmentId);
exports.default = router;
