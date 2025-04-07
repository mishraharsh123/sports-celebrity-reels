export interface Athlete {
  id: string;
  name: string;
  sport: string;
  image?: string;
}

export interface VideoReel {
  id: string;
  title: string;
  athleteId: string;
  athleteName: string;
  sport: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: string;
  duration: number;
  likes: number;
  views: number;
}

export interface GenerationRequest {
  athleteName: string;
  sport: string;
}

export interface GenerationResponse {
  success: boolean;
  videoId?: string;
  videoUrl?: string;
  error?: string;
}
