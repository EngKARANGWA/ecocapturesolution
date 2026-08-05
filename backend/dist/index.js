"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_1 = require("./openapi");
const migrate_1 = require("./migrate");
const auth_1 = __importDefault(require("./routes/auth"));
const openings_1 = __importDefault(require("./routes/openings"));
const partners_1 = __importDefault(require("./routes/partners"));
const applications_1 = __importDefault(require("./routes/applications"));
const inquiries_1 = __importDefault(require("./routes/inquiries"));
const forms_1 = __importDefault(require("./routes/forms"));
const upload_1 = __importDefault(require("./routes/upload"));
const seed_1 = require("./seed");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT ?? 3001);
const ALLOWED_ORIGINS = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
].filter((o) => Boolean(o));
app.use((0, cors_1.default)({
    origin: (origin, cb) => {
        const isLocalhost = origin ? /^http:\/\/localhost:\d+$/.test(origin) : false;
        if (!origin || isLocalhost || ALLOWED_ORIGINS.includes(origin))
            cb(null, true);
        else
            cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_1.openapiSpec));
app.use('/api/auth', auth_1.default);
app.use('/api/openings', openings_1.default);
app.use('/api/partners', partners_1.default);
app.use('/api/applications', applications_1.default);
app.use('/api/inquiries', inquiries_1.default);
app.use('/api/forms', forms_1.default);
app.use('/api/upload', upload_1.default);
(0, migrate_1.migrate)()
    .then(() => (0, seed_1.seedInitialData)())
    .then(() => app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`)))
    .catch((err) => { console.error('Startup failed:', err); process.exit(1); });
