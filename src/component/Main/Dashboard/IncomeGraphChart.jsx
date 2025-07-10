import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetIncomeRatioQuery } from '../../../redux/features/dashboard/dashboardApi';

const IncomeGraphChart = () => {
  // Sample Data for Income and Expenses over the months



  const { data: datas } = useGetIncomeRatioQuery();
  const alldata = datas?.data?.attributes || [];
 


  return (
    <section className="w-full col-span-full md:col-span-4 bg-white rounded-lg border-2 border-[#ffd400] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
      <h1 className="text-2xl font-semibold  pl-5 pt-5">Last 30 Transitions  </h1>
      <ResponsiveContainer width="100%" height={500} className="pr-5 pt-5">
        <LineChart data={alldata}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={alldata.length > 0 ? alldata[0].month : ''} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#344f47c5', color: 'white', borderRadius: '10px' }} />
          <Legend />

          {/* Line for Income */}
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#ffd400" // Green color for income
            activeDot={{ r: 8 }}
            strokeWidth={4}
          />
          {/* Line for Expenses */}

        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
