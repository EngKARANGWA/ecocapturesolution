import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { migrate } from './migrate';
import authRoutes from './routes/auth';
import openingsRoutes from './routes/openings';
import partnersRoutes from './routes/partners';
import applicationsRoutes from './routes/applications';
import inquiriesRoutes from './routes/inquiries';
import formsRoutes, { seedFormSchemas } from './routes/forms';
import uploadRoutes from './routes/upload';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL ?? 'http://localhost:3000',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/openings', openingsRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/upload', uploadRoutes);

migrate()
  .then(() => seedFormSchemas())
  .then(() => app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`)))
  .catch((err) => { console.error('Startup failed:', err); process.exit(1); });
