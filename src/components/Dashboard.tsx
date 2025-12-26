import React, { useState } from 'react';
import StatCard from './StatCard';
import Chart from './Chart';
import RecentActivity from './RecentActivity';
import DataTable from './DataTable';

const Dashboard: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: 'users' as const,
      color: 'blue'
    },
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: 'revenue' as const,
      color: 'green'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: 'orders' as const,
      color: 'yellow'
    },
    {
      title: 'Products',
      value: '456',
      change: '+5.3%',
      changeType: 'positive' as const,
      icon: 'products' as const,
      color: 'purple'
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Orders',
        data: [800, 1200, 1000, 1800, 1600, 2200],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
      }
    ]
  };

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'placed an order', time: '2 minutes ago', type: 'order' as const },
    { id: 2, user: 'Jane Smith', action: 'registered as a new user', time: '5 minutes ago', type: 'user' as const },
    { id: 3, user: 'Mike Johnson', action: 'updated their profile', time: '10 minutes ago', type: 'profile' as const },
    { id: 4, user: 'Sarah Wilson', action: 'completed a purchase', time: '15 minutes ago', type: 'order' as const },
    { id: 5, user: 'Tom Brown', action: 'left a review', time: '20 minutes ago', type: 'review' as const }
  ];

  const tableData = [
    { id: 1, name: 'Product A', category: 'Electronics', price: '$299', stock: 45, status: 'Active' },
    { id: 2, name: 'Product B', category: 'Clothing', price: '$89', stock: 12, status: 'Active' },
    { id: 3, name: 'Product C', category: 'Books', price: '$25', stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Product D', category: 'Home & Garden', price: '$150', stock: 8, status: 'Active' },
    { id: 5, name: 'Product E', category: 'Sports', price: '$75', stock: 23, status: 'Active' }
  ];

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and activity section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue & Orders</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'bar'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                title="Bar Chart"
              >
                📊
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'line'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                title="Line Chart"
              >
                📈
              </button>
            </div>
          </div>
          <Chart data={chartData} type={chartType} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Data table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Products</h3>
        <DataTable data={tableData} />
      </div>
    </div>
  );
};

export default Dashboard;

