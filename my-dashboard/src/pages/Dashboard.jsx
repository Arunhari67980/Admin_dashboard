import StatsGrid from "../components/StatsGrid";
import ChartCard from "../components/ChartCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard />
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✅ User <b>Alice</b> completed project “Alpha”</li>
            <li>📊 Analytics report generated successfully</li>
            <li>🕒 Scheduled backup finished at 3:20 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
