import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Calendar, CircleCheckBig, Clock, DollarSign, TrendingUp, Video, Zap } from 'lucide-react';

const Dashboard = () => {
  // Mock data
  const kpiData = [
    { name: 'Jan', views: 400, subs: 240 },
    { name: 'Feb', views: 300, subs: 139 },
    { name: 'Mar', views: 200, subs: 980 },
    { name: 'Apr', views: 278, subs: 390 },
    { name: 'May', views: 189, subs: 480 },
    { name: 'Jun', views: 239, subs: 380 },
    { name: 'Jul', views: 349, subs: 430 },
  ];

  const tasks = [
    { id: 1, title: 'Edit Q3 Vlog', priority: 'high', due: 'Today' },
    { id: 2, title: 'Record Podcast', priority: 'medium', due: 'Tomorrow' },
    { id: 3, title: 'Review Analytics', priority: 'low', due: 'Today' },
  ];

  const contentStatus = [
    { id: 1, title: 'Channel Announcement', stage: 'Upload', progress: 95 },
    { id: 2, title: 'Tutorial Series', stage: 'Edit', progress: 60 },
    { id: 3, title: 'Podcast Episode #8', stage: 'Record', progress: 30 },
  ];

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
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold font-mono mb-1">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome back. Here's your overview.</p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* KPI Chart */}
        <motion.div 
          variants={item}
          className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <h2 className="text-xl font-semibold font-mono mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Channel Performance
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#000" 
                  strokeWidth={2} 
                  dot={{ fill: '#000', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="subs" 
                  stroke="#555" 
                  strokeWidth={2} 
                  dot={{ fill: '#555', r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Financial Summary */}
        <motion.div 
          variants={item}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <h2 className="text-xl font-semibold font-mono mb-4 flex items-center">
            <DollarSign size={20} className="mr-2" />
            Financial Snapshot
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <span className="text-gray-600">Revenue (MTD)</span>
              <span className="font-semibold">$4,285.00</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b border-gray-100">
              <span className="text-gray-600">Expenses (MTD)</span>
              <span className="font-semibold">$1,470.00</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-semibold">Net Profit</span>
              <span className="font-semibold text-xl">$2,815.00</span>
            </div>
          </div>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div 
          variants={item}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <h2 className="text-xl font-semibold font-mono mb-4 flex items-center">
            <Calendar size={20} className="mr-2" />
            Today's Tasks
          </h2>
          <div className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id}
                className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div 
                  className={`w-2 h-2 rounded-full mr-3 ${
                    task.priority === 'high' ? 'bg-black' : 
                    task.priority === 'medium' ? 'bg-gray-500' : 'bg-gray-300'
                  }`}
                />
                <span className="flex-1">{task.title}</span>
                <span className="text-xs text-gray-500">{task.due}</span>
              </div>
            ))}
            <button className="w-full mt-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              View All Tasks
            </button>
          </div>
        </motion.div>

        {/* Work Timer */}
        <motion.div 
          variants={item}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <h2 className="text-xl font-semibold font-mono mb-4 flex items-center">
            <Clock size={20} className="mr-2" />
            Work Timer
          </h2>
          <div className="flex flex-col items-center justify-center h-[180px]">
            <div className="text-4xl font-mono font-bold mb-6">00:00:00</div>
            <div className="flex space-x-3">
              <button className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Start Session
              </button>
              <button className="py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                History
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Production Tracker */}
        <motion.div 
          variants={item}
          className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <h2 className="text-xl font-semibold font-mono mb-4 flex items-center">
            <Video size={20} className="mr-2" />
            Content Production
          </h2>
          <div className="space-y-4">
            {contentStatus.map(content => (
              <div key={content.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{content.title}</span>
                  <span className="text-sm text-gray-500">{content.stage}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${content.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div 
          variants={item}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-[0.02] pointer-events-none" />
          <h2 className="text-xl font-semibold font-mono mb-4 flex items-center">
            <Zap size={20} className="mr-2" />
            Quick Access
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <Video size={24} className="mb-2" />
              <span className="text-sm">New Video</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <DollarSign size={24} className="mb-2" />
              <span className="text-sm">Expenses</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <Calendar size={24} className="mb-2" />
              <span className="text-sm">Schedule</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
              <CircleCheckBig size={24} className="mb-2" />
              <span className="text-sm">New Task</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
