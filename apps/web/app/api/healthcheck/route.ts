import { NextRequest, NextResponse } from 'next/server';

function isBackendHealthy() {
  return true;
}

function isDatabaseHealthy() {
  return true;
}

function isCacheHealthy() {
  return true;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const isHealthy: boolean =
    isBackendHealthy() && isDatabaseHealthy() && isCacheHealthy();

  return NextResponse.json({
    message: isHealthy ? 'Healthy' : 'Unhealthy',
    ok: isHealthy,
  });
}
