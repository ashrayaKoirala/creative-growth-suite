import { motion } from 'framer-motion';
import { FilePlus, FileText, FolderOpen, Grid2x2, Image, List, Search, Video } from 'lucide-react';

const Files = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Mock file data
  const files = [
    { id: 1, name: 'Interview Transcript.txt', type: 'transcript', size: '45 KB', date: '2023-09-12' },
    { id: 2, name: 'Vlog Cut Profile.json', type: 'json', size: '12 KB', date: '2023-09-10' },
    { id: 3, name: 'Raw_Footage_Sep14.mp4', type: 'video', size: '1.2 GB', date: '2023-09-14' },
    { id: 4, name: 'Podcast_Episode7.mp3', type: 'audio', size: '85 MB', date: '2023-09-08' },
    { id: 5, name: 'Thumbnail_Design.png', type: 'image', size: '2.5 MB', date: '2023-09-13' },
    { id: 6, name: 'Product_Review_Final.mp4', type: 'video', size: '640 MB', date: '2023-09-11' },
    { id: 7, name: 'Tutorial_Subtitles.srt', type: 'subtitle', size: '28 KB', date: '2023-09-09' },
    { id: 8, name: 'Channel_Logo.svg', type: 'image', size: '154 KB', date: '2023-09-04' }
  ];

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video size={20} />;
      case 'image': return <Image size={20} />;
      case 'transcript':
      case 'subtitle':
      case 'json': return <FileText size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-mono mb-1">File Vault</h1>
          <p className="text-gray-600">Access and manage all your files and assets.</p>
        </div>
        
        <button className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center">
          <FilePlus size={18} className="mr-2" />
          Upload Files
        </button>
      </motion.div>

      {/* Search and View Toggle */}
      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
        
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button className="flex-1 py-2 px-4 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Grid2x2 size={18} />
          </button>
          <button className="flex-1 py-2 px-4 hover:bg-gray-50 transition-colors flex items-center justify-center">
            <List size={18} />
          </button>
        </div>
      </motion.div>

      {/* Folders */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
            <FolderOpen size={20} />
          </div>
          <h3 className="font-medium">Videos</h3>
          <p className="text-sm text-gray-500">12 files</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
            <FolderOpen size={20} />
          </div>
          <h3 className="font-medium">Cut Profiles</h3>
          <p className="text-sm text-gray-500">8 files</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
            <FolderOpen size={20} />
          </div>
          <h3 className="font-medium">Transcripts</h3>
          <p className="text-sm text-gray-500">15 files</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
            <FolderOpen size={20} />
          </div>
          <h3 className="font-medium">Graphics</h3>
          <p className="text-sm text-gray-500">9 files</p>
        </div>
      </motion.div>

      {/* Recent Files */}
      <motion.div variants={item}>
        <h2 className="text-xl font-semibold font-mono mb-4">Recent Files</h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 flex items-center">
                      <div className="mr-3 text-gray-500">
                        {getFileIcon(file.type)}
                      </div>
                      <span>{file.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{file.size}</td>
                    <td className="px-4 py-3 text-gray-500">{file.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Files;
