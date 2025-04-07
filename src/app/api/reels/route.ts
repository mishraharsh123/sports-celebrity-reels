import { NextResponse } from 'next/server';
import { reels } from '@/lib/mockData';

// GET /api/reels - Get all reels or filtered by athleteId
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const athleteId = searchParams.get('athleteId');
  
  // Filter reels if athleteId is provided
  const filteredReels = athleteId 
    ? reels.filter(reel => reel.athleteId === athleteId)
    : reels;
  
  return NextResponse.json({ 
    success: true, 
    data: filteredReels 
  });
}
