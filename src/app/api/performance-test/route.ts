import { runPerformanceTest } from '@/__test__/performance/spotifyApi.performance';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const results = await runPerformanceTest(3);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Performance test failed:', error);
    return NextResponse.json({ error: 'Failed to run performance test' }, { status: 500 });
  }
}
