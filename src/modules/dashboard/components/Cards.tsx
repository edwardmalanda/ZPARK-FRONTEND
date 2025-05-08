
import React from 'react';
import { Card } from 'antd';
import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from '@heroicons/react/24/outline';
import { StatCardProps } from '../models/StatCardProps';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,

};


  export const StatCard: React.FC<StatCardProps> = ({ title, value, type }) => {
    const Icon = iconMap[type];
    return (
      <Card className="rounded-xl bg-gray-50 p-2 shadow-sm ">
        <div className="flex items-center p-4">
          {Icon && <Icon className="h-5 w-5 text-gray-700 mr-2" />}
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
          {value}
        </p>
      </Card>
    );
  };
  
  