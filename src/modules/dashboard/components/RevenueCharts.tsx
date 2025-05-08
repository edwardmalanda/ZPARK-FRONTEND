import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Typography } from 'antd';

const { Title } = Typography;


export const RevenueChart: React.FC = () => { 
  
  const revenue = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 2500 },
    { month: 'May', revenue: 2200 },
    { month: 'Jun', revenue: 3500 },
    { month: 'Jul', revenue: 3800 },
    { month: 'Aug', revenue: 4000 },
    { month: 'Sep', revenue: 2700 }, 
    { month: 'Oct', revenue: 2900 }, 
    { month: 'Nov', revenue: 3000 }, 
    { month: 'Dec', revenue: 5000 }, 
  ];

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <Title level={2} className="mb-4 text-xl md:text-2xl">
        Recent Revenue
      </Title>
      <div className="rounded-xl bg-gray-50 p-4">
        <BarChart width={400} height={400} data={revenue}>
          <XAxis dataKey="month" axisLine={false}  />
          <YAxis axisLine={false} />
          <Tooltip />
          <Bar dataKey="revenue" fill="skyblue" barSize={15} radius={[7, 10, 0, 0]} />
        </BarChart>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
