import Chart from '../components/Chart';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-3xl">1,234</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl">Total Products</h2>
          <p className="text-3xl">567</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl">Revenue</h2>
          <p className="text-3xl">$12,345</p>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl mb-4">Sales Chart</h2>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;