"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check & DB test
app.get('/health', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield db_1.default.connect();
        const result = yield client.query('SELECT NOW()');
        client.release();
        res.json({
            status: 'OK',
            db: 'Connected',
            time: result.rows[0].now
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'Error',
            db: 'Disconnected',
            error: err.message
        });
    }
}));
// Students API
app.use('/api/students', studentRoutes_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});
app.listen(port, () => {
    console.log(`🚀 Backend Server: http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log('💾 Postgres database connected');
});
// Graceful shutdown
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SIGTERM received, closing connections...');
    yield db_1.default.end();
    process.exit(0);
}));
exports.default = app;
