import { useState, useEffect } from 'react';
import { VideoReel } from '@/types';

export default function useReels(athleteId?: string) {
  const [reels, setReels] = useState<VideoReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReels() {
      try {
        setLoading(true);
        const url = athleteId 
          ? `/api/reels?athleteId=${athleteId}` 
          : '/api/reels';
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reels');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setReels(data.data);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching reels:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReels();
  }, [athleteId]);

  // Function to generate a new reel
  const generateReel = async (athleteName: string, sport: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ athleteName, sport }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate reel');
      }

      const data = await response.json();
      
      if (data.success) {
        // In a real app, we might poll for the generated video or use WebSockets
        // For now, just refetch the reels
        const reelsResponse = await fetch('/api/reels');
        const reelsData = await reelsResponse.json();
        
        if (reelsData.success) {
          setReels(reelsData.data);
        }
        
        return { success: true, videoId: data.videoId };
      } else {
        throw new Error(data.error || 'Failed to generate reel');
      }
    } catch (err) {
      console.error('Error generating reel:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error' 
      };
    }
  };

  return {
    reels,
    loading,
    error,
    generateReel,
  };
}
