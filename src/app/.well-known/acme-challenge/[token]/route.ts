import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Only allow safe token characters (alphanumeric + hyphens/underscores)
  if (!/^[a-zA-Z0-9_-]+$/.test(token)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const filePath = path.join(process.cwd(), '.well-known', 'acme-challenge', token);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(content.trim(), {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch {
    return new NextResponse('Not Found', { status: 404 });
  }
}
