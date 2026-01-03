import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, FileText, Settings, BarChart3, Shield, Database, Mail } from 'lucide-react';

interface SystemStats {
  totalUsers: number;
  totalSubmissions: number;
  totalJournals: number;
  totalConferences: number;
  activeMembers: number;
  pendingReviews: number;
}

const AdminDashboard: React.FC = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 1250,
    totalSubmissions: 450,
    totalJournals: 8,
    totalConferences: 3,
    activeMembers: 890,
    pendingReviews: 45
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {admin?.username}! Manage the entire InformingScience.org platform.
        </p>
        {admin?.role === 'super-admin' && (
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <Shield className="h-4 w-4 mr-1" />
            Super Administrator
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {systemStats.totalUsers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Submissions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {systemStats.totalSubmissions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {systemStats.activeMembers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Database className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Reviews</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {systemStats.pendingReviews}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New user registration: Dr. Sarah Johnson
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New submission: "AI in Education Systems"
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    15 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Review completed: SUB-2024-0001
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              System Health
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-900 dark:text-white">Database</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Healthy</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-900 dark:text-white">Email Service</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-900 dark:text-white">File Storage</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-900 dark:text-white">Backup System</span>
                </div>
                <span className="text-sm text-yellow-600 dark:text-yellow-400">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/admin-dashboard/users')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">User Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage all users and roles
            </p>
          </button>
          
          <button 
            onClick={() => navigate('/admin-dashboard/journals')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <FileText className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Journals & Conferences</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage journals and conferences
            </p>
          </button>

          <button 
            onClick={() => navigate('/admin-dashboard/content')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Content Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage website content
            </p>
          </button>

          <button 
            onClick={() => navigate('/admin-dashboard/email-templates')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <Mail className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Email Templates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage email templates
            </p>
          </button>

          <button 
            onClick={() => navigate('/admin-dashboard/system-config')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">System Configuration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configure platform settings
            </p>
          </button>

          <button 
            onClick={() => navigate('/admin-dashboard/analytics')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Analytics & Reports</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View system analytics
            </p>
          </button>

          <button 
            onClick={() => navigate('/admin-dashboard/backup')}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <Database className="h-6 w-6 text-red-600 dark:text-red-400 mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Backup & Export</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage data backups
            </p>
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Metrics
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemStats.totalJournals}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Journals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemStats.totalConferences}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Conferences</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                99.9%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2.3s
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Super Admin Features */}
      {admin?.role === 'super-admin' && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Super Administrator Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors text-left">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Security Settings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Configure security and access controls
              </p>
            </button>
            
            <button className="p-4 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors text-left">
              <Database className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Database Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage database and backups
              </p>
            </button>

            <button className="p-4 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors text-left">
              <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">System Configuration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced system configuration
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
