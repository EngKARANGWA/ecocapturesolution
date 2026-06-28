"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const migrate_1 = require("./migrate");
const auth_1 = __importDefault(require("./routes/auth"));
const openings_1 = __importDefault(require("./routes/openings"));
const partners_1 = __importDefault(require("./routes/partners"));
const applications_1 = __importDefault(require("./routes/applications"));
const inquiries_1 = __importDefault(require("./routes/inquiries"));
const forms_1 = __importStar(require("./routes/forms"));
const upload_1 = __importDefault(require("./routes/upload"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT ?? 3001);
const ALLOWED_ORIGINS = [
    process.env.FRONTEND_URL ?? 'http://localhost:3000',
    'http://localhost:3000',
];
app.use((0, cors_1.default)({
    origin: (origin, cb) => {
        if (!origin || ALLOWED_ORIGINS.some((o) => origin.startsWith(o)))
            cb(null, true);
        else
            cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use('/api/auth', auth_1.default);
app.use('/api/openings', openings_1.default);
app.use('/api/partners', partners_1.default);
app.use('/api/applications', applications_1.default);
app.use('/api/inquiries', inquiries_1.default);
app.use('/api/forms', forms_1.default);
app.use('/api/upload', upload_1.default);
(0, migrate_1.migrate)()
    .then(() => (0, forms_1.seedFormSchemas)())
    .then(() => app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`)))
    .catch((err) => { console.error('Startup failed:', err); process.exit(1); });
