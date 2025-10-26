import { motion } from "framer-motion";
import { DollarSign, Users, TrendingUp } from "lucide-react";

const stats = [
  { name: "Revenue", value: "$12.4k", change: "+8%", icon: DollarSign },
  { name: "Customers", value: "1.2k", change: "+3%", icon: Users },
  { name: "Growth", value: "32%", change: "+5%", icon: TrendingUp },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 p-5 rounded-2xl shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="text-gray-400 text-sm">{stat.name}</p>
            <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
            <p className="text-green-400 text-xs">{stat.change}</p>
          </div>
          <stat.icon className="w-6 h-6 text-indigo-400" />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
