import { NextResponse } from 'next/server';

/** @ai-context Health check: GET /api/health → { status: "ok", timestamp } */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
