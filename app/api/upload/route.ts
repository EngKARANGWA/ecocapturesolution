import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'eco-jwt-secret-change-in-production'
);

export async function POST(req: NextRequest) {
  // Verify the session cookie
  const token = req.cookies.get('eco_session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await jwtVerify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
