import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { SunIcon, MoonIcon, FunnelIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState('All');
  
  // Sample data based on the dashboard image
  const [productionData] = useState([
    { name: 'MCP', target: 280, actual: 250, efficiency: 89, employees: 120 },
    { name: 'KCC', target: 350, actual: 330, efficiency: 94, employees: 145 },
    { name: 'Kolihan', target: 320, actual: 300, efficiency: 93, employees: 132 },
    { name: 'ICC', target: 250, actual: 240, efficiency: 96, employees: 104 },
    { name: 'Rakha', target: 340, actual: 320, efficiency: 94, employees: 138 },
    { name: 'Kendadin', target: 330, actual: 350, efficiency: 106, employees: 142 },
  ]);

  const [achievementData] = useState([
    { name: 'MCP', percentage: 110, status: 'Excellent' },
    { name: 'KCC', percentage: 57, status: 'Needs Improvement' },
    { name: 'Kolihan', percentage: 93, status: 'Good' },
    { name: 'ICC', percentage: 57, status: 'Needs Improvement' },
    { name: 'Rakha', percentage: 96, status: 'Excellent' },
  ]);

  const [timeData] = useState([
    { date: 'Apr', target: 850, actual: 1000, weather: 'Clear' },
    { date: 'Apr 18', target: 830, actual: 1040, weather: 'Rainy' },
    { date: 'Apr 20', target: 920, actual: 1120, weather: 'Clear' },
    { date: 'Apr 21', target: 810, actual: 1020, weather: 'Cloudy' },
    { date: 'Apr 23', target: 820, actual: 1080, weather: 'Clear' },
    { date: 'Apr 24', target: 870, actual: 1200, weather: 'Clear' },
    { date: 'Apr 25', target: 900, actual: 1100, weather: 'Cloudy' },
  ]);

  // Simulating loading data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter data based on selected facility
  const filteredProductionData = selectedFacility === 'All' 
    ? productionData 
    : productionData.filter(item => item.name === selectedFacility);
  
  const filteredAchievementData = selectedFacility === 'All'
    ? achievementData
    : achievementData.filter(item => item.name === selectedFacility);

  // Calculate total metrics
  const totalProduction = productionData.reduce((sum, item) => sum + item.actual, 0);
  const totalTarget = productionData.reduce((sum, item) => sum + item.target, 0);
  const avgOreGrade = 1.15;
  const downtime = 3.5;
  const manHours = 8700;

  // Custom tooltip for the bar chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border border-gray-200`}>
          <p className="font-bold">{data.name}</p>
          <p>Target: {data.target} tons</p>
          <p>Actual: {data.actual} tons</p>
          <p>Efficiency: {data.efficiency}%</p>
          <p>Employees: {data.employees}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for the line chart
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border border-gray-200`}>
          <p className="font-bold">{label}</p>
          <p>Target: {payload[0].value} tons</p>
          <p>Actual: {payload[1].value} tons</p>
          <p>Weather: {payload[0].payload.weather}</p>
          <p>Difference: {payload[1].value - payload[0].value} tons</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for achievement chart
  const CustomAchievementTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border border-gray-200`}>
          <p className="font-bold">{data.name}</p>
          <p>Achievement: {data.percentage}%</p>
          <p>Status: {data.status}</p>
        </div>
      );
    }
    return null;
  };

  // Loading animation
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-teal-950 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-teal-950 text-white' : 'bg-gray-100 text-gray-800'} p-4 transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Hindustan Copper Daily Production Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          {/* Facility Filter */}
          <div className="relative">
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className={`${darkMode ? 'bg-teal-800 text-white' : 'bg-white text-gray-800'} pl-8 pr-4 py-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="All">All Facilities</option>
              {productionData.map(item => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
            <div className="absolute left-2 top-2.5">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-500 text-gray-800' : 'bg-gray-800 text-yellow-400'} transition-colors duration-300`}
          >
            {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Target vs Actual Production */}
        <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1`}>
          <h2 className="text-xl font-semibold mb-4">Target vs Actual Production</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#335" : "#ddd"} />
              <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#333"} />
              <YAxis stroke={darkMode ? "#fff" : "#333"} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar dataKey="target" fill="#3b82f6" name="Target" animationDuration={1500} />
              <Bar dataKey="actual" fill="#4ade80" name="Actual" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievement % */}
        <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1`}>
          <h2 className="text-xl font-semibold mb-4">Achievement %</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredAchievementData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#335" : "#ddd"} />
              <XAxis type="number" domain={[0, 150]} stroke={darkMode ? "#fff" : "#333"} />
              <YAxis dataKey="name" type="category" stroke={darkMode ? "#fff" : "#333"} />
              <Tooltip content={<CustomAchievementTooltip />} />
              <Bar dataKey="percentage" fill="#4ade80" animationDuration={1500}>
                {filteredAchievementData.map((entry, index) => (
                  <text
                    key={`percentage-${index}`}
                    x="95%"
                    y={index * 42 + 25}
                    textAnchor="end"
                    fill={darkMode ? "#fff" : "#333"}
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
        <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg lg:col-span-1 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1`}>
          <h2 className="text-xl font-semibold mb-4">Production Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#335" : "#ddd"} />
              <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#333"} />
              <YAxis domain={[0, 1400]} stroke={darkMode ? "#fff" : "#333"} />
              <Tooltip content={<CustomLineTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} name="Target" dot={{ r: 4 }} activeDot={{ r: 8 }} animationDuration={1500} />
              <Line type="monotone" dataKey="actual" stroke="#4ade80" strokeWidth={2} name="Actual" dot={{ r: 4 }} activeDot={{ r: 8 }} animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg flex flex-col justify-center items-center transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden`}>
            <div className={`absolute bottom-0 left-0 h-1 ${totalProduction > totalTarget ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min((totalProduction / totalTarget) * 100, 100)}%` }}></div>
            <h2 className="text-5xl font-bold">370 t</h2>
            <p className="text-xl mt-2">Total Production</p>
            <p className={`text-sm mt-1 ${totalProduction > totalTarget ? 'text-green-400' : 'text-red-400'}`}>
              {totalProduction > totalTarget ? 'Above Target' : 'Below Target'}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg flex flex-col justify-center items-center transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{ width: `${Math.min(avgOreGrade * 50, 100)}%` }}></div>
            <h2 className="text-5xl font-bold">1.15 %</h2>
            <p className="text-xl mt-2">Ore Grade</p>
            <p className="text-sm mt-1 text-blue-400">Standard Quality</p>
          </div>
          <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg flex flex-col justify-center items-center transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 h-1 bg-yellow-500" style={{ width: `${Math.min((downtime / 8) * 100, 100)}%` }}></div>
            <h2 className="text-5xl font-bold">3.5 h</h2>
            <p className="text-xl mt-2">Downtime</p>
            <p className="text-sm mt-1 text-yellow-400">43.8% of Shift</p>
          </div>
          <div className={`${darkMode ? 'bg-teal-900' : 'bg-white shadow-md'} p-4 rounded-lg flex flex-col justify-center items-center transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden`}>
            <div className="absolute bottom-0 left-0 h-1 bg-purple-500" style={{ width: '87%' }}></div>
            <h2 className="text-5xl font-bold">8,700</h2>
            <p className="text-xl mt-2">Man Hours</p>
            <p className="text-sm mt-1 text-purple-400">Full Capacity</p>
          </div>
        </div>
      </div>
      
      {/* Date and Update Info */}
      <div className={`mt-4 text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Last updated: Today at {new Date().toLocaleTimeString()}</p>
        <p>Reporting Period: April 2025</p>
      </div>
    </div>
  );
}