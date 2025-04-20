import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Dashboard() {
  // Sample data based on the dashboard image
  const [productionData] = useState([
    { name: 'MCP', target: 280, actual: 250 },
    { name: 'KCC', target: 350, actual: 330 },
    { name: 'Kolihan', target: 320, actual: 300 },
    { name: 'ICC', target: 250, actual: 240 },
    { name: 'Rakha', target: 340, actual: 320 },
    { name: 'Kendadin', target: 330, actual: 350 },
  ]);

  const [achievementData] = useState([
    { name: 'MCP', percentage: 110 },
    { name: 'KCC', percentage: 57 },
    { name: 'Kolihan', percentage: 93 },
    { name: 'ICC', percentage: 57 },
    { name: 'Rakha', percentage: 96 },
  ]);

  const [timeData] = useState([
    { date: 'Apr', target: 850, actual: 1000 },
    { date: 'Apr 18', target: 830, actual: 1040 },
    { date: 'Apr 20', target: 920, actual: 1120 },
    { date: 'Apr 21', target: 810, actual: 1020 },
    { date: 'Apr 23', target: 820, actual: 1080 },
    { date: 'Apr 24', target: 870, actual: 1200 },
    { date: 'Apr 25', target: 900, actual: 1100 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-teal-950 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Hindustan Copper Daily Production Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Target vs Actual Production */}
        <div className="bg-teal-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Target vs Actual Production</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#335" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e3a4a', color: '#fff', border: 'none' }} />
              <Legend />
              <Bar dataKey="target" fill="#3b82f6" name="Target" />
              <Bar dataKey="actual" fill="#4ade80" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievement % */}
        <div className="bg-teal-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Achievement %</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={achievementData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#335" />
              <XAxis type="number" domain={[0, 150]} stroke="#fff" />
              <YAxis dataKey="name" type="category" stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e3a4a', color: '#fff', border: 'none' }} />
              <Bar dataKey="percentage" fill="#4ade80">
                {achievementData.map((entry, index) => (
                  <text
                    key={`percentage-${index}`}
                    x="95%"
                    y={index * 42 + 25}
                    textAnchor="end"
                    fill="#fff"
                  >
                    {entry.percentage}%
                  </text>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Production Over Time */}
        <div className="bg-teal-900 p-4 rounded-lg lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Production Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#335" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis domain={[0, 1400]} stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e3a4a', color: '#fff', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} name="Target" />
              <Line type="monotone" dataKey="actual" stroke="#4ade80" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <div className="bg-teal-900 p-4 rounded-lg flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold">370 t</h2>
            <p className="text-xl mt-2">Total Production</p>
          </div>
          <div className="bg-teal-900 p-4 rounded-lg flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold">1.15 %</h2>
            <p className="text-xl mt-2">Ore Grade</p>
          </div>
          <div className="bg-teal-900 p-4 rounded-lg flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold">3.5 h</h2>
            <p className="text-xl mt-2">Downtime</p>
          </div>
          <div className="bg-teal-900 p-4 rounded-lg flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold">8,700</h2>
            <p className="text-xl mt-2">Man Hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}