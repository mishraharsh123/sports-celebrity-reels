import { Athlete, VideoReel } from '@/types';

// Mock athletes data
export const athletes: Athlete[] = [
  { 
    id: '1', 
    name: 'Michael Jordan', 
    sport: 'Basketball',
    image: '/athletes/michael-jordan.jpg'
  },
  { 
    id: '2', 
    name: 'Serena Williams', 
    sport: 'Tennis',
    image: '/athletes/serena-williams.jpg'
  },
  { 
    id: '3', 
    name: 'Lionel Messi', 
    sport: 'Soccer',
    image: '/athletes/lionel-messi.jpg'
  },
  { 
    id: '4', 
    name: 'Usain Bolt', 
    sport: 'Track & Field',
    image: '/athletes/usain-bolt.jpg'
  },
  { 
    id: '5', 
    name: 'Simone Biles', 
    sport: 'Gymnastics',
    image: '/athletes/simone-biles.jpg'
  }
];

// Mock reels data
export const reels: VideoReel[] = [
  {
    id: '1',
    title: 'The Legend of Michael Jordan',
    athleteId: '1',
    athleteName: 'Michael Jordan',
    sport: 'Basketball',
    thumbnailUrl: 'https://source.unsplash.com/featured/?basketball,michael+jordan',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 32,
    likes: 15420,
    views: 189345
  },
  {
    id: '2',
    title: 'Serena Williams: Tennis Queen',
    athleteId: '2',
    athleteName: 'Serena Williams',
    sport: 'Tennis',
    thumbnailUrl: 'https://source.unsplash.com/featured/?tennis,serena+williams',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 28,
    likes: 12834,
    views: 167890
  },
  {
    id: '3',
    title: 'Messi: The GOAT Journey',
    athleteId: '3',
    athleteName: 'Lionel Messi',
    sport: 'Soccer',
    thumbnailUrl: 'https://source.unsplash.com/featured/?soccer,lionel+messi',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 35,
    likes: 18765,
    views: 212567
  },
  {
    id: '4',
    title: 'Lightning Bolt: The Fastest Man',
    athleteId: '4',
    athleteName: 'Usain Bolt',
    sport: 'Track & Field',
    thumbnailUrl: 'https://source.unsplash.com/featured/?track,usain+bolt',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 30,
    likes: 10983,
    views: 143562
  },
  {
    id: '5',
    title: 'Simone Biles: Gymnastics Revolution',
    athleteId: '5',
    athleteName: 'Simone Biles',
    sport: 'Gymnastics',
    thumbnailUrl: 'https://source.unsplash.com/featured/?gymnastics,simone+biles',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    createdAt: new Date().toISOString(),
    duration: 26,
    likes: 8765,
    views: 98432
  }
];
