'use client';

import { useState } from 'react';
import { FaPlus, FaSearch, FaHome, FaUserCircle, FaBell, FaSignOutAlt, FaShare } from 'react-icons/fa';
import ReelsContainer from '@/components/ReelsContainer';
import GenerateReelForm from '@/components/GenerateReelForm';
import useReels from '@/hooks/useReels';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { reels, loading, generateReel } = useReels();

  const handleGenerateReel = async (athleteName: string, sport: string) => {
    const result = await generateReel(athleteName, sport);
    return result;
  };

  return (
    <main className="relative h-screen w-full bg-black overflow-hidden">
      <AnimatePresence>
        {showGenerateForm && (
          <GenerateReelForm
            onGenerate={handleGenerateReel}
            onClose={() => setShowGenerateForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Header - Instagram-Style */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black via-black/70 to-transparent">
        <div className="flex justify-between items-center px-4 py-3">
          <motion.h1 
            className="text-white text-2xl font-bold italic bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sports Reels
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <FaSearch size={20} />
            </button>
            <button className="text-white hover:text-blue-400 transition-colors">
              <FaBell size={20} />
            </button>
            <button className="text-white hover:text-blue-400 transition-colors">
              <FaUserCircle size={22} />
            </button>
          </div>
        </div>
        
        {/* Search Bar - conditionally rendered */}
        <AnimatePresence>
          {showSearch && (
            <motion.div 
              className="px-4 pb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search athletes or sports..."
                  className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 w-full outline-none border border-gray-700 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reels Container */}
      <div className="pt-16 pb-14">
        <ReelsContainer reels={reels} loading={loading} />
      </div>

      {/* Bottom Navigation Bar - Instagram-Style */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-800/10">
        <div className="flex justify-around items-center px-4 py-2">
          <button className="text-white flex flex-col items-center">
            <FaHome size={20} className="text-blue-500" />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>
          
          <button className="text-white flex flex-col items-center">
            <FaSearch size={20} />
            <span className="text-[10px] mt-0.5">Explore</span>
          </button>
          
          <button className="text-white flex flex-col items-center">
            <FaShare size={20} />
            <span className="text-[10px] mt-0.5">Share</span>
          </button>
          
          {/* Add Button - Floating above nav bar */}
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2.5 rounded-full shadow-lg relative -top-4 border-4 border-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGenerateForm(true)}
          >
            <FaPlus size={20} />
          </motion.button>
          
          <button className="text-white flex flex-col items-center">
            <FaBell size={20} />
            <span className="text-[10px] mt-0.5">Activity</span>
          </button>
          
          <button className="text-white flex flex-col items-center">
            <FaUserCircle size={20} />
            <span className="text-[10px] mt-0.5">Profile</span>
          </button>
        </div>
      </div>
    </main>
  );
}
