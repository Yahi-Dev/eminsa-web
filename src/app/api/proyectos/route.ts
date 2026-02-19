import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Mock response — real data is managed via React Context + localStorage
  return NextResponse.json({ data: [], total: 0 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ data: { id: Date.now().toString(), ...body }, message: "Proyecto creado" }, { status: 201 });
}
