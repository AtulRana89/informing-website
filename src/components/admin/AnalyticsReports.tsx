import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, FileText, Calendar, TrendingUp, TrendingDown,
  Download, RefreshCw, Filter, Calendar as CalendarIcon, Eye,
  UserCheck, UserX, BookOpen, Mail, Database, Globe, Clock
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    growth: number;
  };
  submissions: {
    total: number;
    thisMonth: number;
    byStatus: {
      pending: number;
      underReview: number;
      accepted: number;
      rejected: number;
    };
    growth: number;
  };
  journals: {
    total: number;
    active: number;
    submissionsPerJournal: Array<{
      name: string;
      count: number;
    }>;
  };
  conferences: {
    total: number;
    upcoming: number;
    registrations: number;
  };
  system: {
    uptime: number;
    responseTime: number;
    storageUsed: number;
    emailsSent: number;
  };
  trends: {
    userGrowth: Array<{ month: string; count: number }>;
    submissionTrends: Array<{ month: string; count: number }>;
    topCountries: Array<{ country: string; count: number }>;
    topInstitutions: Array<{ institution: string; count: number }>;
  };
}

interface AnalyticsReportsProps {
  onClose?: () => void;
}

const AnalyticsReports: React.FC<AnalyticsReportsProps> = ({ onClose }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('users');
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/analytics?range=${dateRange}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data.analytics);
      } else {
        // Mock data for demonstration
        setAnalyticsData({
          users: {
            total: 1250,
            active: 890,
            newThisMonth: 45,
            growth: 12.5
          },
          submissions: {
            total: 450,
            thisMonth: 23,
            byStatus: {
              pending: 15,
              underReview: 8,
              accepted: 12,
              rejected: 5
            },
            growth: 8.3
          },
          journals: {
            total: 8,
            active: 7,
            submissionsPerJournal: [
              { name: 'IJIS', count: 45 },
              { name: 'IJITSA', count: 32 },
              { name: 'IJIKM', count: 28 },
              { name: 'IJELL', count: 22 },
              { name: 'IJELLO', count: 18 }
            ]
          },
          conferences: {
            total: 3,
            upcoming: 2,
            registrations: 156
          },
          system: {
            uptime: 99.9,
            responseTime: 2.3,
            storageUsed: 75.2,
            emailsSent: 1240
          },
          trends: {
            userGrowth: [
              { month: 'Jan', count: 120 },
              { month: 'Feb', count: 135 },
              { month: 'Mar', count: 142 },
              { month: 'Apr', count: 158 },
              { month: 'May', count: 167 },
              { month: 'Jun', count: 175 }
            ],
            submissionTrends: [
              { month: 'Jan', count: 35 },
              { month: 'Feb', count: 42 },
              { month: 'Mar', count: 38 },
              { month: 'Apr', count: 51 },
              { month: 'May', count: 47 },
              { month: 'Jun', count: 55 }
            ],
            topCountries: [
              { country: 'United States', count: 245 },
              { country: 'United Kingdom', count: 189 },
              { country: 'Canada', count: 156 },
              { country: 'Australia', count: 134 },
              { country: 'Germany', count: 98 }
            ],
            topInstitutions: [
              { institution: 'University of California', count: 45 },
              { institution: 'MIT', count: 38 },
              { institution: 'Stanford University', count: 32 },
              { institution: 'Oxford University', count: 28 },
              { institution: 'Harvard University', count: 25 }
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async (format: 'csv' | 'json') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/analytics/export?format=${format}&range=${dateRange}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting analytics:', error);
    }
  };

  const userGrowthChartData = {
    labels: analyticsData?.trends.userGrowth.map(item => item.month) || [],
    datasets: [
      {
        label: 'New Users',
        data: analyticsData?.trends.userGrowth.map(item => item.count) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const submissionTrendsChartData = {
    labels: analyticsData?.trends.submissionTrends.map(item => item.month) || [],
    datasets: [
      {
        label: 'Submissions',
        data: analyticsData?.trends.submissionTrends.map(item => item.count) || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const submissionStatusChartData = {
    labels: ['Pending', 'Under Review', 'Accepted', 'Rejected'],
    datasets: [
      {
        data: analyticsData ? [
          analyticsData.submissions.byStatus.pending,
          analyticsData.submissions.byStatus.underReview,
          analyticsData.submissions.byStatus.accepted,
          analyticsData.submissions.byStatus.rejected
        ] : [],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(251, 191, 36, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const journalSubmissionsChartData = {
    labels: analyticsData?.journals.submissionsPerJournal.map(item => item.name) || [],
    datasets: [
      {
        label: 'Submissions',
        data: analyticsData?.journals.submissionsPerJournal.map(item => item.count) || [],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">No analytics data available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">System analytics and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={fetchAnalytics}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {analyticsData.users.total.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                {analyticsData.users.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ml-1 ${analyticsData.users.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.users.growth}%
                </span>
              </div>
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
                {analyticsData.submissions.total.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                {analyticsData.submissions.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ml-1 ${analyticsData.submissions.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analyticsData.submissions.growth}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Journals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {analyticsData.journals.active}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                of {analyticsData.journals.total} total
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Conferences</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {analyticsData.conferences.upcoming}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {analyticsData.conferences.registrations} registrations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Growth</h3>
          <Line data={userGrowthChartData} options={chartOptions} />
        </div>

        {/* Submission Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Submission Trends</h3>
          <Line data={submissionTrendsChartData} options={chartOptions} />
        </div>

        {/* Submission Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Submission Status</h3>
          <Doughnut data={submissionStatusChartData} options={doughnutOptions} />
        </div>

        {/* Journal Submissions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Submissions by Journal</h3>
          <Bar data={journalSubmissionsChartData} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Countries */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Countries</h3>
          <div className="space-y-3">
            {analyticsData.trends.topCountries.map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white ml-2">
                    {country.country}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {country.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Institutions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Institutions</h3>
          <div className="space-y-3">
            {analyticsData.trends.topInstitutions.map((institution, index) => (
              <div key={institution.institution} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white ml-2">
                    {institution.institution}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {institution.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-2">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.system.uptime}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.system.responseTime}s
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-2">
              <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.system.storageUsed}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-2">
              <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analyticsData.system.emailsSent.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Emails Sent</p>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Export Analytics Data
              </h3>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose the format for exporting analytics data:
                </p>
                
                <div className="space-y-2">
                  <button
                    onClick={() => handleExportData('csv')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </button>
                  
                  <button
                    onClick={() => handleExportData('json')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as JSON
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsReports;
