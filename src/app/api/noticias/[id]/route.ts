import { NextRequest, NextResponse } from 'next/server';

// For GET requests
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Your logic here
  return NextResponse.json({ id, message: 'Noticia encontrada' });
}

// For PUT requests (if you have it)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  // Your logic here
  return NextResponse.json({ id, ...body });
}

// For DELETE requests (if you have it)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Your logic here
  return NextResponse.json({ id, message: 'Noticia eliminada' });
}