import React, { useState, useEffect } from 'react';
import { 
  Database, Download, Upload, RefreshCw, Calendar, FileText, 
  Users, BookOpen, Mail, Settings, AlertCircle, CheckCircle,
  Clock, HardDrive, Archive, Trash2, Eye, Play, Pause, Square
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';

interface BackupJob {
  _id: string;
  name: string;
  type: 'full' | 'incremental' | 'selective';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  size: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
  tables: string[];
  format: 'json' | 'csv' | 'sql';
}

interface ExportJob {
  _id: string;
  name: string;
  dataType: 'users' | 'submissions' | 'journals' | 'conferences' | 'content' | 'all';
  format: 'csv' | 'json' | 'xlsx';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  recordCount: number;
  fileSize?: number;
  downloadUrl?: string;
  createdAt: string;
  completedAt?: string;
  filters?: {
    dateRange?: { start: string; end: string };
    status?: string;
    type?: string;
  };
}

interface DataBackupExportProps {
  onClose?: () => void;
}

const DataBackupExport: React.FC<DataBackupExportProps> = ({ onClose }) => {
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([]);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'backup' | 'export'>('backup');
  const [showCreateBackupModal, setShowCreateBackupModal] = useState(false);
  const [showCreateExportModal, setShowCreateExportModal] = useState(false);
  const [newBackup, setNewBackup] = useState<Partial<BackupJob>>({});
  const [newExport, setNewExport] = useState<Partial<ExportJob>>({});

  useEffect(() => {
    fetchBackupJobs();
    fetchExportJobs();
  }, []);

  const fetchBackupJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/backup/jobs'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBackupJobs(data.jobs);
      } else {
        // Mock data for demonstration
        setBackupJobs([
          {
            _id: '1',
            name: 'Full System Backup',
            type: 'full',
            status: 'completed',
            progress: 100,
            size: 2048576,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            completedAt: new Date(Date.now() - 86400000 + 300000).toISOString(),
            tables: ['users', 'submissions', 'journals', 'conferences', 'content'],
            format: 'json'
          },
          {
            _id: '2',
            name: 'User Data Backup',
            type: 'selective',
            status: 'running',
            progress: 65,
            size: 0,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            tables: ['users', 'profiles'],
            format: 'csv'
          },
          {
            _id: '3',
            name: 'Incremental Backup',
            type: 'incremental',
            status: 'failed',
            progress: 0,
            size: 0,
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            error: 'Database connection timeout',
            tables: ['submissions', 'reviews'],
            format: 'sql'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching backup jobs:', error);
    }
  };

  const fetchExportJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/export/jobs'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExportJobs(data.jobs);
      } else {
        // Mock data for demonstration
        setExportJobs([
          {
            _id: '1',
            name: 'User Export',
            dataType: 'users',
            format: 'csv',
            status: 'completed',
            progress: 100,
            recordCount: 1250,
            fileSize: 512000,
            downloadUrl: buildApiUrl('/api/admin/export/download/1'),
            createdAt: new Date(Date.now() - 1800000).toISOString(),
            completedAt: new Date(Date.now() - 1800000 + 120000).toISOString()
          },
          {
            _id: '2',
            name: 'Submission Report',
            dataType: 'submissions',
            format: 'xlsx',
            status: 'processing',
            progress: 45,
            recordCount: 0,
            createdAt: new Date(Date.now() - 600000).toISOString(),
            filters: {
              dateRange: {
                start: '2024-01-01',
                end: '2024-12-31'
              }
            }
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching export jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/backup/create'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBackup)
      });

      if (response.ok) {
        await fetchBackupJobs();
        setShowCreateBackupModal(false);
        setNewBackup({});
      }
    } catch (error) {
      console.error('Error creating backup:', error);
    }
  };

  const handleCreateExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/export/create'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExport)
      });

      if (response.ok) {
        await fetchExportJobs();
        setShowCreateExportModal(false);
        setNewExport({});
      }
    } catch (error) {
      console.error('Error creating export:', error);
    }
  };

  const handleDownloadBackup = async (backupId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/backup/download/${backupId}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup-${backupId}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading backup:', error);
    }
  };

  const handleDownloadExport = async (exportId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/export/download/${exportId}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export-${exportId}.${exportJobs.find(job => job._id === exportId)?.format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading export:', error);
    }
  };

  const handleCancelJob = async (jobId: string, type: 'backup' | 'export') => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = type === 'backup' ? buildApiUrl(`/api/admin/backup/cancel/${jobId}`) : buildApiUrl(`/api/admin/export/cancel/${jobId}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        if (type === 'backup') {
          await fetchBackupJobs();
        } else {
          await fetchExportJobs();
        }
      }
    } catch (error) {
      console.error('Error cancelling job:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'cancelled':
        return <Square className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'running':
      case 'processing':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'cancelled':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Backup & Export</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system backups and data exports</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={activeTab === 'backup' ? fetchBackupJobs : fetchExportJobs}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('backup')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'backup'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Database className="h-4 w-4 inline mr-2" />
              System Backup
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'export'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Download className="h-4 w-4 inline mr-2" />
              Data Export
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'backup' && (
        <>
          {/* Backup Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Backups</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create full system backups or selective data backups
                </p>
              </div>
              <button
                onClick={() => setShowCreateBackupModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Database className="h-4 w-4 mr-2" />
                Create Backup
              </button>
            </div>
          </div>

          {/* Backup Jobs List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading backup jobs...</p>
              </div>
            ) : backupJobs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No backup jobs found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {backupJobs.map((job) => (
                  <div key={job._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {job.name}
                          </h3>
                          <span className={getStatusBadge(job.status)}>
                            {job.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Type:</span> {job.type}
                          </div>
                          <div>
                            <span className="font-medium">Format:</span> {job.format.toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {formatFileSize(job.size)}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {job.status === 'running' && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${job.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {job.error && (
                          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">
                              <strong>Error:</strong> {job.error}
                            </p>
                          </div>
                        )}

                        {job.tables.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Tables: 
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {job.tables.map((table) => (
                                <span key={table} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                                  {table}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {job.status === 'completed' && (
                          <button
                            onClick={() => handleDownloadBackup(job._id)}
                            className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Download Backup"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                        {(job.status === 'running' || job.status === 'pending') && (
                          <button
                            onClick={() => handleCancelJob(job._id, 'backup')}
                            className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Cancel Backup"
                          >
                            <Square className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'export' && (
        <>
          {/* Export Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Data Exports</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Export specific data sets in various formats
                </p>
              </div>
              <button
                onClick={() => setShowCreateExportModal(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Create Export
              </button>
            </div>
          </div>

          {/* Export Jobs List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading export jobs...</p>
              </div>
            ) : exportJobs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No export jobs found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {exportJobs.map((job) => (
                  <div key={job._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {job.name}
                          </h3>
                          <span className={getStatusBadge(job.status)}>
                            {job.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="font-medium">Data Type:</span> {job.dataType}
                          </div>
                          <div>
                            <span className="font-medium">Format:</span> {job.format.toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium">Records:</span> {job.recordCount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {job.fileSize ? formatFileSize(job.fileSize) : 'N/A'}
                          </div>
                        </div>

                        {job.status === 'processing' && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${job.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {job.filters && (
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Filters: 
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {job.filters.dateRange && (
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                                  {job.filters.dateRange.start} to {job.filters.dateRange.end}
                                </span>
                              )}
                              {job.filters.status && (
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded">
                                  Status: {job.filters.status}
                                </span>
                              )}
                              {job.filters.type && (
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded">
                                  Type: {job.filters.type}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {job.status === 'completed' && job.downloadUrl && (
                          <button
                            onClick={() => handleDownloadExport(job._id)}
                            className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Download Export"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                        {(job.status === 'processing' || job.status === 'pending') && (
                          <button
                            onClick={() => handleCancelJob(job._id, 'export')}
                            className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Cancel Export"
                          >
                            <Square className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Create Backup Modal */}
      {showCreateBackupModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Create New Backup
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Backup Name
                  </label>
                  <input
                    type="text"
                    value={newBackup.name || ''}
                    onChange={(e) => setNewBackup({...newBackup, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter backup name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Backup Type
                    </label>
                    <select
                      value={newBackup.type || 'full'}
                      onChange={(e) => setNewBackup({...newBackup, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="full">Full System Backup</option>
                      <option value="incremental">Incremental Backup</option>
                      <option value="selective">Selective Backup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Format
                    </label>
                    <select
                      value={newBackup.format || 'json'}
                      onChange={(e) => setNewBackup({...newBackup, format: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="json">JSON</option>
                      <option value="csv">CSV</option>
                      <option value="sql">SQL</option>
                    </select>
                  </div>
                </div>

                {newBackup.type === 'selective' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Tables
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['users', 'submissions', 'journals', 'conferences', 'content', 'reviews', 'email_templates', 'system_config'].map((table) => (
                        <label key={table} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newBackup.tables?.includes(table) || false}
                            onChange={(e) => {
                              const tables = newBackup.tables || [];
                              if (e.target.checked) {
                                setNewBackup({...newBackup, tables: [...tables, table]});
                              } else {
                                setNewBackup({...newBackup, tables: tables.filter(t => t !== table)});
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {table.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateBackupModal(false);
                    setNewBackup({});
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBackup}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Export Modal */}
      {showCreateExportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Create New Export
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Export Name
                  </label>
                  <input
                    type="text"
                    value={newExport.name || ''}
                    onChange={(e) => setNewExport({...newExport, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter export name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Type
                    </label>
                    <select
                      value={newExport.dataType || 'users'}
                      onChange={(e) => setNewExport({...newExport, dataType: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="users">Users</option>
                      <option value="submissions">Submissions</option>
                      <option value="journals">Journals</option>
                      <option value="conferences">Conferences</option>
                      <option value="content">Content</option>
                      <option value="all">All Data</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Format
                    </label>
                    <select
                      value={newExport.format || 'csv'}
                      onChange={(e) => setNewExport({...newExport, format: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                      <option value="xlsx">Excel (XLSX)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newExport.filters?.dateRange?.start || ''}
                      onChange={(e) => setNewExport({
                        ...newExport, 
                        filters: {
                          ...newExport.filters,
                          dateRange: {
                            start: e.target.value,
                            end: newExport.filters?.dateRange?.end || ''
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newExport.filters?.dateRange?.end || ''}
                      onChange={(e) => setNewExport({
                        ...newExport, 
                        filters: {
                          ...newExport.filters,
                          dateRange: {
                            start: newExport.filters?.dateRange?.start || '',
                            end: e.target.value
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateExportModal(false);
                    setNewExport({});
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateExport}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Create Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBackupExport;
