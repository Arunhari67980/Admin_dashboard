import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "M1", value: 1000 },
  { month: "M2", value: 250 },
  { month: "M3", value: 750 },
  { month: "M4", value: 900 },
  { month: "M5", value: 700 },
  { month: "M6", value: 1000 },
  { month: "M7", value: 400 },
  { month: "M8", value: 850 },
  { month: "M9", value: 600 },
  { month: "M10", value: 950 },
  { month: "M11", value: 500 },
  { month: "M12", value: 750 },
];

const ChartCard = () => (
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
    <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ChartCard;
