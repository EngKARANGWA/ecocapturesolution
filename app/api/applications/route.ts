import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import sql from '@/lib/db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production'
);

const SEED = [
  { id: 'app-1', openingId: 'opening-1', status: 'new',        data: { 'Full Name': 'Amahoro Divine',      'Email Address': 'divine.amahoro@gmail.com',    'Phone Number': '+250 788 123 456', 'Position Applied For': 'Agricultural Field Officer',      'Cover Letter / Message': "I have 4 years of experience working with smallholder farmers in Western Province. I am passionate about sustainable agriculture and eager to contribute to EcoCapture's biochar and CO₂ capture mission." } },
  { id: 'app-2', openingId: 'opening-2', status: 'reviewed',    data: { 'Full Name': 'Niyonsenga Patrick',   'Email Address': 'p.niyonsenga@outlook.com',    'Phone Number': '+250 722 987 654', 'Position Applied For': 'Sustainability Project Manager',  'Cover Letter / Message': "With an MSc in Environmental Management and 3 years leading climate-smart agriculture projects at CGIAR, I am excited to drive EcoCapture's impact at scale." } },
  { id: 'app-3', openingId: 'opening-3', status: 'new',        data: { 'Full Name': 'Uwimana Claudette',    'Email Address': 'claudette.uwimana@yahoo.com', 'Phone Number': '+250 734 556 789', 'Position Applied For': 'Sales & Partnerships Coordinator','Cover Letter / Message': 'I previously managed agri-business partnerships at One Acre Fund Rwanda and built a network of 200+ greenhouse operators. I would love to bring that experience to EcoCapture.' } },
  { id: 'app-4', openingId: 'opening-1', status: 'new',        data: { 'Full Name': 'Habimana Eric',        'Email Address': 'eric.habimana@gmail.com',     'Phone Number': '+250 780 234 567', 'Position Applied For': 'Agricultural Field Officer',      'Cover Letter / Message': 'I am a recent graduate in Agronomy from UR and have volunteered with local cooperatives in Musanze. I am eager to grow within a purpose-driven company like EcoCapture.' } },
  { id: 'app-5', openingId: 'opening-2', status: 'new',        data: { 'Full Name': 'Mukamana Solange',     'Email Address': 'solange.mukamana@gmail.com',  'Phone Number': '+250 790 112 233', 'Position Applied For': 'Sustainability Project Manager',  'Cover Letter / Message': "I hold a degree in Environmental Science from KIE and have coordinated three green energy projects in the Eastern Province. Managing EcoCapture's climate initiatives would be a perfect fit." } },
  { id: 'app-6', openingId: 'opening-3', status: 'shortlisted', data: { 'Full Name': 'Ndayishimiye Jean',   'Email Address': 'j.ndayishimiye@outlook.com',  'Phone Number': '+250 788 445 678', 'Position Applied For': 'Sales & Partnerships Coordinator','Cover Letter / Message': 'Five years in B2B sales across the agri-input sector in East Africa. I have signed 30+ distribution partnerships and would bring that deal-making experience to EcoCapture.' } },
];

async function ensureSchema() {
  await sql`ALTER TABLE applications ADD COLUMN IF NOT EXISTS opening_id TEXT REFERENCES openings(id) ON DELETE SET NULL`;
}

async function seedIfEmpty() {
  await ensureSchema();
  const [{ count }] = await sql`SELECT COUNT(*) FROM applications`;
  if (Number(count) > 0) {
    for (const a of SEED) {
      await sql`UPDATE applications SET opening_id = ${a.openingId} WHERE id = ${a.id} AND opening_id IS NULL`;
    }
    return;
  }
  for (const a of SEED) {
    await sql`
      INSERT INTO applications (id, opening_id, data, status)
      VALUES (${a.id}, ${a.openingId}, ${JSON.stringify(a.data)}::jsonb, ${a.status})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function auth(req: NextRequest) {
  const token = req.cookies.get('eco_session')?.value;
  if (!token) return false;
  try { await jwtVerify(token, JWT_SECRET); return true; } catch { return false; }
}

export async function GET(req: NextRequest) {
  if (!await auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await seedIfEmpty();
    const rows = await sql`
      SELECT a.id, a.opening_id AS "openingId", a.data, a.status,
             a.submitted_at AS "submittedAt", o.title AS "openingTitle"
      FROM applications a
      LEFT JOIN openings o ON o.id = a.opening_id
      ORDER BY a.submitted_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error('GET /api/applications:', err);
    return NextResponse.json([]);
  }
}

export async function PATCH(req: NextRequest) {
  if (!await auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json() as { id: string; status: string };
  try {
    await sql`UPDATE applications SET status = ${status} WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PATCH /api/applications:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
