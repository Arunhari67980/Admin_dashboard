import { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, PointElement, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Users, TrendingUp, ArrowUpDown, Download } from 'lucide-react';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Initial stats data
const initialStats = [
  { name: 'Revenue', value: '$12.4k', change: '+8%', icon: DollarSign },
  { name: 'Customers', value: '1.2k', change: '+3%', icon: Users },
  { name: 'Growth', value: '32%', change: '+5%', icon: TrendingUp },
];

// Initial chart data
const initialChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'User Growth',
      data: [2000, 3000, 4500, 4000, 6000, 8000],
      borderColor: '#63B3ED',
      backgroundColor: 'rgba(99, 179, 237, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

// Initial conversion data
const initialConversionData = [
  { id: 1, source: 'Google Ads', conversions: 150, rate: 3.5 },
  { id: 2, source: 'Social Media', conversions: 200, rate: 4.2 },
  { id: 3, source: 'Email Campaign', conversions: 100, rate: 2.8 },
  { id: 4, source: 'SEO Organic', conversions: 120, rate: 2.9 },
  { id: 5, source: 'Referral Links', conversions: 90, rate: 2.1 },
  { id: 6, source: 'Paid Search', conversions: 180, rate: 4.0 },
  { id: 7, source: 'Affiliate Marketing', conversions: 130, rate: 3.2 },
];

// Animation variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, type: 'spring', stiffness: 100 },
  }),
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 120 },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

const StatsGrid = ({ isOpen, stats }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <AnimatePresence>
        {isOpen &&
          stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="bg-gray-800 p-5 rounded-2xl shadow-lg flex items-center justify-between"
            >
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <h3 className="text-2xl font-semibold mt-1 text-gray-100">{stat.value}</h3>
                <p className="text-green-400 text-xs">{stat.change}</p>
              </div>
              <stat.icon className="w-6 h-6 text-indigo-400" />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  );
};

const Analytics = () => {
  // State for date range, chart type, search filter, and stats visibility
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [chartType, setChartType] = useState('line');
  const [searchTerm, setSearchTerm] = useState('');
  const [isStatsOpen, setIsStatsOpen] = useState(true);

  // State for table functionality
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Simulated data adjustment based on date range
  const getAdjustedStats = () => {
    const baseStats = [...initialStats];
    switch (dateRange) {
      case 'Last 7 Days':
        baseStats[0].value = '$5.2k';
        baseStats[0].change = '+3%';
        baseStats[1].value = '800';
        baseStats[1].change = '+1%';
        baseStats[2].value = '15%';
        baseStats[2].change = '+2%';
        break;
      case 'Last 90 Days':
        baseStats[0].value = '$25.6k';
        baseStats[0].change = '+12%';
        baseStats[1].value = '2.5k';
        baseStats[1].change = '+5%';
        baseStats[2].value = '40%';
        baseStats[2].change = '+7%';
        break;
      case 'This Year':
        baseStats[0].value = '$50.1k';
        baseStats[0].change = '+20%';
        baseStats[1].value = '5.0k';
        baseStats[1].change = '+10%';
        baseStats[2].value = '55%';
        baseStats[2].change = '+15%';
        break;
      default: // Last 30 Days
        return baseStats;
    }
    return baseStats;
  };

  const getAdjustedChartData = () => {
    const baseData = { ...initialChartData };
    switch (dateRange) {
      case 'Last 7 Days':
        baseData.labels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
        baseData.datasets[0].data = [500, 600, 700, 650, 800, 900, 950];
        break;
      case 'Last 90 Days':
        baseData.labels = ['M1', 'M2', 'M3'];
        baseData.datasets[0].data = [3000, 5000, 7000];
        break;
      case 'This Year':
        baseData.labels = ['Q1', 'Q2', 'Q3', 'Q4'];
        baseData.datasets[0].data = [10000, 15000, 20000, 25000];
        break;
      default: // Last 30 Days
        return initialChartData;
    }
    return baseData;
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#E2E8F0' } },
      title: { display: true, text: 'User Growth Over Time', color: '#E2E8F0' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#A0AEC0' } },
      x: { ticks: { color: '#A0AEC0' } },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOut',
    },
  };

  // Filtered and sorted conversion data
  const filteredConversionData = initialConversionData
    .filter((row) => row.source.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortConfig.key) {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'rate' || sortConfig.key === 'conversions') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
      }
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredConversionData.length / itemsPerPage);
  const paginatedData = filteredConversionData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle CSV export
  const exportToCSV = () => {
    const csvContent = [
      ['Source', 'Conversions', 'Conversion Rate'],
      ...filteredConversionData.map((row) => [row.source, row.conversions, `${row.rate}%`]),
    ]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'conversion_stats.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Trigger animation on mount
  useEffect(() => {
    // This effect ensures the page animates on load
  }, []);

  return (
    <motion.div
      className="bg-gray-900 text-gray-200 p-6 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
      <p className="text-gray-400 mb-6">Detailed charts, conversion stats, and growth metrics for your business.</p>

      {/* Controls with Animation */}
      <motion.div
        className="mb-6 flex space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Date Range Picker */}
        <div>
          <label htmlFor="dateRange" className="text-gray-300 mr-2">Select Date Range:</label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Chart Type Toggle */}
        <div>
          <label htmlFor="chartType" className="text-gray-300 mr-2">Chart Type:</label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        {/* Search Input for Table */}
        <div>
          <label htmlFor="search" className="text-gray-300 mr-2">Search Sources:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>

        {/* Toggle Stats Grid */}
        <motion.button
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsStatsOpen(!isStatsOpen)}
          className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          {isStatsOpen ? 'Collapse Stats' : 'Expand Stats'}
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <StatsGrid isOpen={isStatsOpen} stats={getAdjustedStats()} />

      {/* Chart with Animation */}
      <motion.div
        className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 mt-6"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        {chartType === 'line' ? (
          <Line data={getAdjustedChartData()} options={chartOptions} />
        ) : (
          <Bar data={getAdjustedChartData()} options={chartOptions} />
        )}
      </motion.div>

      {/* Conversion Stats Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Conversion Stats</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToCSV}
            className="p-2 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-600 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </motion.button>
        </div>
        <div className="w-full"> {/* Removed overflow-x-auto, added w-full */}
          <table className="w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-700">
                <th
                  className="p-3 cursor-pointer hover:text-blue-300 flex items-center"
                  onClick={() => requestSort('source')}
                >
                  Source <ArrowUpDown className="w-4 h-4 ml-2" />
                </th>
                <th
                  className="p-3 cursor-pointer hover:text-blue-300 flex items-center"
                  onClick={() => requestSort('conversions')}
                >
                  Conversions <ArrowUpDown className="w-4 h-4 ml-2" />
                </th>
                <th
                  className="p-3 cursor-pointer hover:text-blue-300 flex items-center"
                  onClick={() => requestSort('rate')}
                >
                  Conversion Rate <ArrowUpDown className="w-4 h-4 ml-2" />
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedData.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ backgroundColor: '#374151', transition: { duration: 0.2 } }}
                    className="border-t border-gray-600"
                  >
                    <td className="p-3 max-w-xs truncate">{row.source}</td>
                    <td className="p-3">{row.conversions}</td>
                    <td className="p-3">{row.rate}%</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </motion.button>
          <span>Page {currentPage} of {totalPages}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-700 rounded-lg text-gray-200 hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;