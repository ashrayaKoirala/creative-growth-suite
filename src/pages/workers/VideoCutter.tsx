import { motion } from 'framer-motion';
import { Scissors, Upload } from 'lucide-react';

const VideoCutter = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold font-mono mb-1">Video Cutter</h1>
        <p className="text-gray-600 mb-6">Cut video automatically based on Gemini generated cut-profiles.</p>
      </motion.div>
      
      <motion.div 
        variants={item}
        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden p-8 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scissors size={28} />
          </div>
          
          <h2 className="text-xl font-semibold font-mono mb-2">Upload Files to Start</h2>
          <p className="text-gray-600 mb-6">Upload your video file and cut-profile JSON to begin cutting</p>
          
          <div className="flex space-x-4 justify-center">
            <button className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center">
              <Upload size={18} className="mr-2" />
              Upload Video
            </button>
            <button className="py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Select Cut Profile
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoCutter;
