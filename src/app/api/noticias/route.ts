import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Your logic here
  return NextResponse.json({ message: 'Lista de noticias' });
}
