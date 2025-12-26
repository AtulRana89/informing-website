import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: 'users' | 'revenue' | 'orders' | 'products';
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    green: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
    purple: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
  };

  const iconColors = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'users':
        return '👥';
      case 'revenue':
        return '💰';
      case 'orders':
        return '🛒';
      case 'products':
        return '📦';
      default:
        return '📊';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {changeType === 'positive' ? '↗' : '↘'} {change}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${iconColors[color as keyof typeof iconColors]} bg-white dark:bg-gray-700 shadow-sm`}>
          {getIcon(icon)}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

