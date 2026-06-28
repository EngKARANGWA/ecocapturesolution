import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import pool from '@/lib/db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production'
);

const SEED = [
  {
    id: 'app-1',
    data: {
      'Full Name': 'Amahoro Divine',
      'Email Address': 'divine.amahoro@gmail.com',
      'Phone Number': '+250 788 123 456',
      'Position Applied For': 'Agricultural Field Officer',
      'Cover Letter / Message': "I have 4 years of experience working with smallholder farmers in Western Province. I am passionate about sustainable agriculture and eager to contribute to EcoCapture's biochar and CO₂ capture mission.",
    },
    status: 'new',
  },
  {
    id: 'app-2',
    data: {
      'Full Name': 'Niyonsenga Patrick',
      'Email Address': 'p.niyonsenga@outlook.com',
      'Phone Number': '+250 722 987 654',
      'Position Applied For': 'Sustainability Project Manager',
      'Cover Letter / Message': "With an MSc in Environmental Management and 3 years leading climate-smart agriculture projects at CGIAR, I am excited to drive EcoCapture's impact at scale.",
    },
    status: 'reviewed',
  },
  {
    id: 'app-3',
    data: {
      'Full Name': 'Uwimana Claudette',
      'Email Address': 'claudette.uwimana@yahoo.com',
      'Phone Number': '+250 734 556 789',
      'Position Applied For': 'Sales & Partnerships Coordinator',
      'Cover Letter / Message': 'I previously managed agri-business partnerships at One Acre Fund Rwanda and built a network of 200+ greenhouse operators. I would love to bring that experience to EcoCapture.',
    },
    status: 'new',
  },
  {
    id: 'app-4',
    data: {
      'Full Name': 'Habimana Eric',
      'Email Address': 'eric.habimana@gmail.com',
      'Phone Number': '+250 780 234 567',
      'Position Applied For': 'Agricultural Field Officer',
      'Cover Letter / Message': 'I am a recent graduate in Agronomy from UR and have volunteered with local cooperatives in Musanze. I am eager to grow within a purpose-driven company like EcoCapture.',
    },
    status: 'new',
  },
];

async function seedIfEmpty() {
  const { rows } = await pool.query('SELECT COUNT(*) FROM applications');
  if (Number(rows[0].count) > 0) return;
  for (const a of SEED) {
    await pool.query(
      `INSERT INTO applications (id, data, status) VALUES ($1,$2,$3) ON CONFLICT (id) DO NOTHING`,
      [a.id, JSON.stringify(a.data), a.status]
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('eco_session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { await jwtVerify(token, JWT_SECRET); } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await seedIfEmpty();
    const { rows } = await pool.query(
      `SELECT id, data, status, submitted_at AS "submittedAt"
       FROM applications ORDER BY submitted_at DESC`
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/applications:', err);
    return NextResponse.json([]);
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get('eco_session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { await jwtVerify(token, JWT_SECRET); } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, status } = await req.json() as { id: string; status: string };
  try {
    await pool.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PATCH /api/applications:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
