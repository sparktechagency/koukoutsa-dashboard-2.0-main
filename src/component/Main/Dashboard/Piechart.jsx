import React, { useState } from 'react';
import { Select } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetUserAndIncomeQuery } from '../../../redux/features/dashboard/dashboardApi';

// Sample raw data for the months
const rawData = {
  august: { users: 15457, collaborators: 9457, month: 'August' },
  september: { users: 10457, collaborators: 11457, month: 'September' },
};

const Piechart = () => {
  const [month, setMonth] = useState('august'); // Default month is 'august'
  const mainData = rawData[month]; // Get data for the selected month

  const { data } = useGetUserAndIncomeQuery();
  const allData = data?.data?.attributes || {}; // Fallback to empty object if data is undefined

  // Format the allData to match the expected format for the Pie chart
  const pieData = [
    { name: 'Total Users', value: allData.totalUsers || 0 },
    { name: 'Total Transactions', value: allData.totalIncome || 0 },
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
        <h2 className="text-xl font-semibold">Status Summary</h2>

      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={400}>
          {/* Render the Pie Chart */}
          <PieChart>
            <Pie
              data={pieData}  // Pass the correctly formatted data
              
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              innerRadius={60}
              paddingAngle={5}
              labelLine={false}  // Disable lines from the center to the labels
              label={({ name, value }) => `${name}: ${value}`}  // Label customization
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
