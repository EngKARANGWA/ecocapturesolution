import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from './openapi';
import { migrate } from './migrate';
import authRoutes from './routes/auth';
import openingsRoutes from './routes/openings';
import partnersRoutes from './routes/partners';
import applicationsRoutes from './routes/applications';
import inquiriesRoutes from './routes/inquiries';
import formsRoutes from './routes/forms';
import uploadRoutes from './routes/upload';
import { seedInitialData } from './seed';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  process.env.RENDER_EXTERNAL_URL,
  'https://ecocapturesolution.onrender.com',
  'http://localhost:3000',
].filter((o): o is string => Boolean(o));

app.use(cors({
  origin: (origin, cb) => {
    const isLocalhost = origin ? /^http:\/\/localhost:\d+$/.test(origin) : false;
    if (!origin || isLocalhost || ALLOWED_ORIGINS.includes(origin)) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use('/api/auth', authRoutes);
app.use('/api/openings', openingsRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/upload', uploadRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err.message === 'Not allowed by CORS') { res.status(403).json({ error: 'Not allowed by CORS' }); return; }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

migrate()
  .then(() => seedInitialData())
  .then(() => app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`)))
  .catch((err) => { console.error('Startup failed:', err); process.exit(1); });
