"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./socket");
const generation_worker_1 = require("./workers/generation.worker");
const pdf_worker_1 = require("./workers/pdf.worker");
const assignment_routes_1 = __importDefault(require("./routes/assignment.routes"));
const paper_routes_1 = __importDefault(require("./routes/paper.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
(0, socket_1.initSocket)(server);
(0, generation_worker_1.startGenerationWorker)();
(0, pdf_worker_1.startPdfWorker)();
app.use('/api/assignments', assignment_routes_1.default);
app.use('/api/assignments', paper_routes_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
