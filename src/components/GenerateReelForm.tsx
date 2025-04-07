import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaUser, FaRunning, FaMagic } from 'react-icons/fa';

interface GenerateReelFormProps {
  onGenerate: (athleteName: string, sport: string) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
}

export default function GenerateReelForm({ onGenerate, onClose }: GenerateReelFormProps) {
  const [athleteName, setAthleteName] = useState('');
  const [sport, setSport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [suggestions] = useState([
    { name: 'Michael Jordan', sport: 'Basketball' },
    { name: 'Serena Williams', sport: 'Tennis' },
    { name: 'Lionel Messi', sport: 'Soccer' },
    { name: 'Usain Bolt', sport: 'Track & Field' },
    { name: 'Simone Biles', sport: 'Gymnastics' },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!athleteName.trim() || !sport.trim()) {
      setError('Please fill out all fields');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    const result = await onGenerate(athleteName, sport);
    
    if (!result.success) {
      setError(result.error || 'Failed to generate reel');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      onClose();
    }
  };

  const handleSuggestionClick = (name: string, sportValue: string) => {
    setAthleteName(name);
    setSport(sportValue);
    setStep(2);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 w-full max-w-md border border-gray-800 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {step === 1 ? 'Create New Reel' : 'Customize Your Reel'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex w-full mb-6 bg-gray-800 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full"
            initial={{ width: "50%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {step === 1 ? (
          <div>
            <p className="text-gray-300 mb-6">Choose an athlete or search for someone specific</p>
            
            {/* Suggestions Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-left transition-colors border border-gray-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestionClick(suggestion.name, suggestion.sport)}
                >
                  <div className="flex items-center mb-1">
                    <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                    <span className="font-medium text-white">{suggestion.name}</span>
                  </div>
                  <span className="text-sm text-gray-400 flex items-center">
                    <FaRunning className="mr-1" size={12} /> {suggestion.sport}
                  </span>
                </motion.button>
              ))}
            </div>
            
            {/* Manual Search */}
            <div className="mb-4">
              <label htmlFor="athleteName" className="block text-gray-300 mb-2 flex items-center">
                <FaUser className="mr-2" />
                Athlete Name
              </label>
              <input
                type="text"
                id="athleteName"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="E.g., LeBron James"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="sport" className="block text-gray-300 mb-2 flex items-center">
                <FaRunning className="mr-2" />
                Sport
              </label>
              <input
                type="text"
                id="sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="E.g., Basketball"
              />
            </div>
            
            <button
              type="button"
              onClick={() => {
                if (!athleteName || !sport) {
                  setError('Please enter both athlete name and sport');
                  return;
                }
                setStep(2);
                setError(null);
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700">
              <h3 className="text-white font-medium mb-1">Selected Athlete</h3>
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <FaUser className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">{athleteName}</p>
                  <p className="text-sm text-gray-400">{sport}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700">
              <h3 className="text-white font-medium mb-2">AI Will Generate</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <div className="bg-blue-500/20 p-1 rounded mr-2 mt-0.5">
                    <FaMagic className="text-blue-400" size={14} />
                  </div>
                  <span>An engaging script about {athleteName}'s career highlights</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-1 rounded mr-2 mt-0.5">
                    <FaMagic className="text-purple-400" size={14} />
                  </div>
                  <span>Dynamic visuals featuring key moments and achievements</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-pink-500/20 p-1 rounded mr-2 mt-0.5">
                    <FaMagic className="text-pink-400" size={14} />
                  </div>
                  <span>Professional narration with background music</span>
                </li>
              </ul>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                    Generating...
                  </>
                ) : (
                  'Generate Reel'
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
