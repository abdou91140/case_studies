import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

interface ESGChartProps {
  data: any;
}

const ESGChart: React.FC<ESGChartProps> = ( {data} ) => {

  return (
      <ResponsiveContainer height={400} >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="co2_emissions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default ESGChart;
