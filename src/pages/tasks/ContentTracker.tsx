import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBar, Check, Squircle, Film, Plus, Search, Tag, Trash } from 'lucide-react';

const ContentTracker = () => {
  const [filter, setFilter] = useState('all');
  
  // Mocked content data
  const [contentItems, setContentItems] = useState([
    { 
      id: 1, 
      title: 'Tech Review: Latest Gadgets', 
      status: 'in-progress', 
      stage: 'editing', 
      progress: 70, 
      dueDate: '2023-09-18',
      tags: ['review', 'tech']
    },
    { 
      id: 2, 
      title: 'Tutorial: Video Editing Basics', 
      status: 'completed', 
      stage: 'published', 
      progress: 100, 
      dueDate: '2023-09-10',
      tags: ['tutorial', 'editing']
    },
    { 
      id: 3, 
      title: 'Podcast Episode #8', 
      status: 'in-progress', 
      stage: 'recording', 
      progress: 40, 
      dueDate: '2023-09-25',
      tags: ['podcast', 'interview']
    },
    { 
      id: 4, 
      title: 'Channel Update Announcement', 
      status: 'planning', 
      stage: 'scripting', 
      progress: 20, 
      dueDate: '2023-09-30',
      tags: ['announcement', 'channel']
    },
    { 
      id: 5, 
      title: 'Behind the Scenes Vlog', 
      status: 'in-progress', 
      stage: 'filming', 
      progress: 60, 
      dueDate: '2023-09-22',
      tags: ['vlog', 'bts']
    }
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-black text-white text-xs rounded-full">Completed</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">In Progress</span>;
      case 'planning':
        return <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">Planning</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{status}</span>;
    }
  };

  const filteredContent = filter === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.status === filter);

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
      <motion.div variants={item} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-mono mb-1">Content Tracker</h1>
          <p className="text-gray-600">Track the status and progress of your content projects.</p>
        </div>
        
        <button className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center">
          <Plus size={18} className="mr-2" />
          New Content
        </button>
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`py-1.5 px-3 rounded-lg ${filter === 'all' ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-50'} transition-colors`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('in-progress')}
            className={`py-1.5 px-3 rounded-lg ${filter === 'in-progress' ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-50'} transition-colors`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setFilter('planning')}
            className={`py-1.5 px-3 rounded-lg ${filter === 'planning' ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-50'} transition-colors`}
          >
            Planning
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`py-1.5 px-3 rounded-lg ${filter === 'completed' ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-50'} transition-colors`}
          >
            Completed
          </button>
        </div>
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search content..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
      </motion.div>

      {/* Content List */}
      <motion.div variants={item}>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredContent.map((content) => (
              <div 
                key={content.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center">
                      <Film size={18} className="mr-2 text-gray-500" />
                      <h3 className="font-medium">{content.title}</h3>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">Stage: {content.stage}</span>
                      <span className="text-sm text-gray-500">Due: {content.dueDate}</span>
                      {content.tags.map((tag, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center text-xs bg-gray-100 px-2 py-0.5 rounded"
                        >
                          <Tag size={10} className="mr-1 text-gray-500" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(content.status)}
                    
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="font-medium">{content.progress}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${content.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button className="p-1 rounded-lg hover:bg-gray-200 transition-colors">
                        <Squircle size={16} />
                      </button>
                      <button className="p-1 rounded-lg hover:bg-gray-200 transition-colors">
                        <Check size={16} />
                      </button>
                      <button className="p-1 rounded-lg hover:bg-gray-200 transition-colors">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Insights */}
      <motion.div variants={item}>
        <div className="flex items-center mb-4">
          <ChartBar size={20} className="mr-2" />
          <h2 className="text-xl font-semibold font-mono">Content Insights</h2>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Content Pipeline</h3>
              <p className="text-2xl font-semibold">5 Projects</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-500">3 In progress</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming Due</h3>
              <p className="text-2xl font-semibold">2 Items</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-500">Next: Tech Review</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Completed This Month</h3>
              <p className="text-2xl font-semibold">1 Project</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-500">Tutorial Video</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContentTracker;
