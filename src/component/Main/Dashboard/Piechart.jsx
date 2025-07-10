import React, { useState } from 'react';
import { Select } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample raw data for the months
const rawData = {
  august: { users: 15457, collaborators: 9457, month: 'August' },
  september: { users: 10457, collaborators: 11457, month: 'September' },
};

const Piechart = () => {
  const [month, setMonth] = useState('august'); // Default month is 'august'
  const mainData = rawData[month]; // Get data for the selected month

  // Demo data for the Pie chart (based on rawData)
  const pieData = [
    { name: 'Income', value: mainData.users },
    { name: 'Collaborators', value: mainData.collaborators },
  ];

  // Handle month change (from dropdown)
  const handleChange = (value) => {
    setMonth(value);
  };

  // Colors for the pie chart sections
  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <div className="w-full col-span-full md:col-span-2 bg-white rounded-lg border border-primary p-5">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl font-semibold">{mainData.month} Pie Chart</h2>
        {/* Dropdown for month selection */}
        <Select defaultValue="august" style={{ width: 150 }} onChange={handleChange}>
          <Select.Option value="august">August</Select.Option>
          <Select.Option value="september">September</Select.Option>
        </Select>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          {/* Render the Pie Chart */}
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              innerRadius={60}
              paddingAngle={5}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Piechart;
