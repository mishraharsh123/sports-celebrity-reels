import { useState, useRef, useEffect } from 'react';
import VideoReel from './VideoReel';
import { VideoReel as VideoReelType } from '@/types';
import { motion } from 'framer-motion';

interface ReelsContainerProps {
  reels: VideoReelType[];
  loading: boolean;
}

export default function ReelsContainer({ reels, loading }: ReelsContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll snap and update active index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container) {
        const scrollPosition = container.scrollTop;
        const reelHeight = window.innerHeight;
        const newIndex = Math.round(scrollPosition / reelHeight);
        
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reels.length) {
          setActiveIndex(newIndex);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [reels.length, activeIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && activeIndex > 0) {
        scrollToReel(activeIndex - 1);
      } else if (e.key === 'ArrowDown' && activeIndex < reels.length - 1) {
        scrollToReel(activeIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, reels.length]);

  // Scroll to specific reel
  const scrollToReel = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Reels Available</h2>
        <p>Generate your first sports celebrity history reel to get started!</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {reels.map((reel, index) => (
        <VideoReel
          key={reel.id}
          reel={reel}
          isActive={index === activeIndex}
        />
      ))}
    </motion.div>
  );
}
