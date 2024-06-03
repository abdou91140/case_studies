"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface HeadcountPieChartProps {
  data: { female: number; male: number;};
}

const COLORS = ['#8884d8', '#82ca9d'];

const HeadcountPieChart: React.FC<HeadcountPieChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Female', value: data.female },
    { name: 'Male', value: data.male },
  ];

  return (
    <div>
      <h3 className='text-center  font-semibold'>Headcount : {data.female + data.male}</h3>
      <PieChart width={400} height={370}>
        <Pie
          data={chartData}
          cx={200}
          cy={150}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart></div>
  );
};

export default HeadcountPieChart;
