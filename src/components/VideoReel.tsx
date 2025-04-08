import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaEye, FaVolumeMute, FaVolumeUp, FaComment, FaShare, FaBookmark, FaRegBookmark, FaTimes } from 'react-icons/fa';
import { VideoReel as VideoReelType } from '@/types';
// import { colgroup } from 'framer-motion/client';

interface VideoReelProps {
  reel: VideoReelType;
  isActive: boolean;
}

export default function VideoReel({ reel, isActive }: VideoReelProps) {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  // Handle video playback based on visibility and active state
  useEffect(() => {
    if (videoRef.current) {
      if (inView && isActive) {
        videoRef.current.play().catch((error) => {
          console.error('Autoplay failed:', error);
        });
        if(isPlaying){
          console.log('Video is already playing');
        }
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [inView, isActive]);

  // Toggle sound
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  // Toggle like
  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  // Toggle save
  const toggleSave = () => {
    setSaved(!saved);
  };

  // Share reel
  const shareReel = () => {
    // In a real app, this would open a share dialog
    alert(`Sharing reel: ${reel.title}`);
  };

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="relative w-full h-screen snap-center">
      <div className="absolute inset-0 overflow-hidden bg-black">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="object-cover w-full h-full"
          loop
          muted={muted}
          playsInline
          poster={reel.thumbnailUrl}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none"></div>
        
        {/* Video Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top Info */}
          <div className="flex items-center justify-between z-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
              transition={{ duration: 0.5 }}
              className="text-white text-xl font-bold"
            >
              {reel.title}
            </motion.h2>
            <button 
              onClick={toggleMute}
              className="rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-all"
            >
              {muted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
            </button>
          </div>

          {/* Content Area */}
          <div className="flex flex-1"></div>

          {/* Bottom Info and Interaction Buttons */}
          <div className="flex items-end justify-between z-10 pb-24 md:pb-16">
            {/* Left: Athlete Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-white max-w-[60%]"
            >
              <h3 className="text-lg font-semibold flex items-center truncate">
                <div className="w-8 h-8 rounded-full bg-gray-500 mr-2 overflow-hidden flex-shrink-0">
                  {/* Athlete avatar - could be a real image in production */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                </div>
                <span className="truncate">{reel.athleteName}</span>
              </h3>
              <p className="text-sm text-gray-300 ml-10 truncate">{reel.sport}</p>
              <div className="flex items-center mt-2 space-x-4 ml-10">
                <div className="flex items-center">
                  <FaEye className="mr-1 flex-shrink-0" />
                  <span>{formatNumber(reel.views)}</span>
                </div>
                <span className="text-xs text-gray-400 hidden sm:inline">
                  {new Date(reel.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>

            {/* Right: Interaction Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-5"
            >
              <motion.button 
                onClick={toggleLike}
                whileTap={{ scale: 1.2 }}
                className="flex flex-col items-center"
              >
                {liked ? 
                  <FaHeart size={28} className="text-red-500" /> : 
                  <FaRegHeart size={28} className="text-white" />
                }
                <span className="text-white text-xs mt-1">{formatNumber(likesCount)}</span>
              </motion.button>
              
              <motion.button 
                onClick={() => setShowComments(!showComments)}
                whileTap={{ scale: 1.2 }}
                className="flex flex-col items-center"
              >
                <FaComment size={26} className="text-white" />
                <span className="text-white text-xs mt-1">Comment</span>
              </motion.button>
              
              <motion.button 
                onClick={shareReel}
                whileTap={{ scale: 1.2 }}
                className="flex flex-col items-center"
              >
                <FaShare size={26} className="text-white" />
                <span className="text-white text-xs mt-1">Share</span>
              </motion.button>
              
              <motion.button 
                onClick={toggleSave}
                whileTap={{ scale: 1.2 }}
                className="flex flex-col items-center"
              >
                {saved ? 
                  <FaBookmark size={26} className="text-yellow-400" /> : 
                  <FaRegBookmark size={26} className="text-white" />
                }
                <span className="text-white text-xs mt-1">Save</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Comments Panel (conditionally rendered) */}
        {showComments && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-0 left-0 right-0 bg-black/95 h-[60%] rounded-t-3xl z-30 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">Comments</h3>
              <button 
                onClick={() => setShowComments(false)}
                className="text-white p-2 bg-gray-800 rounded-full"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-120px)] space-y-4 pb-16">
              {/* Mocked comments - would come from API in real app */}
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-medium text-sm">SportsFan82</div>
                  <p className="text-gray-300 text-sm">What an incredible athlete! Their achievements are legendary.</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-pink-600 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-medium text-sm">AthleticsLover</div>
                  <p className="text-gray-300 text-sm">I remember watching them break that record live. Unforgettable moment!</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-medium text-sm">HistoryBuff</div>
                  <p className="text-gray-300 text-sm">The context about their early career is fascinating. Great video!</p>
                </div>
              </div>
            </div>
            
            {/* Comment input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/95 border-t border-gray-800">
              <div className="flex space-x-2 items-center">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-1 bg-gray-800 text-white rounded-full py-2 px-4 outline-none"
                />
                <button className="bg-blue-600 text-white rounded-full p-2">
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}