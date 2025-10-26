import StatsGrid from "../components/StatsGrid";
import ChartCard from "../components/ChartCard";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

// Animation variants
const panelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.2 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
};

const Dashboard = () => {
  // State for overview panel visibility and activities
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [activities, setActivities] = useState([
    { id: 1, text: '📝 Update profile details', isDone: false },
    { id: 2, text: '🔍 Review analytics report', isDone: false },
    { id: 3, text: '💾 Export recent data (3:20 PM IST)', isDone: false },
  ]);

  // Toggle activity status
  const toggleActivity = (id) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, isDone: !activity.isDone } : activity
      )
    );
  };

  // Clear all activities
  const clearActivities = () => {
    setActivities([]);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen text-gray-200">
      {/* Interactive Overview Panel */}
      <motion.div
        className="bg-gray-800 rounded-2xl p-4 shadow-lg"
        initial="hidden"
        animate={isOverviewOpen ? 'visible' : 'hidden'}
        variants={panelVariants}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOverviewOpen(!isOverviewOpen)}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
        <AnimatePresence>
          {isOverviewOpen && (
            <>
              <ul className="space-y-2 text-sm">
                {activities.map((activity, index) => (
                  <motion.li
                    key={activity.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`flex items-center justify-between p-2 rounded ${activity.isDone ? 'bg-gray-700 line-through text-gray-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    <span>{activity.text}</span>
                    {activity.isDone ? (
                      <span className="text-green-400 text-xs">Done</span>
                    ) : (
                      <span className="text-yellow-400 text-xs">Pending</span>
                    )}
                  </motion.li>
                ))}
              </ul>
              {activities.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearActivities}
                  className="mt-3 w-full p-2 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-600"
                >
                  Clear All
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* StatsGrid */}
      <StatsGrid />

      {/* Chart and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard />
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✅ User <b>Alice</b> completed project “Alpha”</li>
            <li>📊 Analytics report generated successfully</li>
            <li>🕒 Scheduled backup finished at 3:20 PM IST</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;