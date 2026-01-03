import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, RefreshCw, Search, Filter, Eye, EyeOff, 
  Key, Globe, Mail, Database, Shield, AlertCircle, CheckCircle,
  Lock, Unlock, Edit, Trash2, Plus, X, Info, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';

interface SystemConfig {
  _id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'json';
  category: 'email' | 'payment' | 'storage' | 'api' | 'security' | 'general' | 'notification' | 'backup' | 'analytics' | 'integration' | 'system' | 'reviewer' | 'editor-in-chief' | 'publisher';
  name: string;
  description?: string;
  isEncrypted: boolean;
  isSensitive: boolean;
  isRequired: boolean;
  isPublic: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
    required?: boolean;
  };
  defaultValue?: any;
  environment: 'development' | 'staging' | 'production' | 'all';
  metadata?: {
    unit?: string;
    format?: string;
    helpText?: string;
    examples?: string[];
  };
  accessLevel: 'public' | 'admin' | 'super-admin';
  history: Array<{
    value: any;
    changedBy: {
      userId: string;
      name: string;
    };
    changedAt: string;
    reason?: string;
  }>;
  createdAt: string;
  updatedAt: string;
  lastModifiedBy?: {
    userId: string;
    name: string;
  };
}

interface SystemConfigurationProps {
  onClose?: () => void;
}

const SystemConfiguration: React.FC<SystemConfigurationProps> = ({ onClose }) => {
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [filteredConfigs, setFilteredConfigs] = useState<SystemConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<SystemConfig | null>(null);
  const [editingConfig, setEditingConfig] = useState<Partial<SystemConfig>>({});
  const [showSensitiveValues, setShowSensitiveValues] = useState<Set<string>>(new Set());
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchConfigs();
  }, []);

  useEffect(() => {
    filterConfigs();
  }, [configs, searchTerm, selectedCategories, selectedAccessLevel]);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/system-config'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConfigs(data.configs);
      }
    } catch (error) {
      console.error('Error fetching configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterConfigs = () => {
    let filtered = configs;

    if (searchTerm) {
      filtered = filtered.filter(config =>
        config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(config => selectedCategories.includes(config.category));
    }

    if (selectedAccessLevel) {
      filtered = filtered.filter(config => config.accessLevel === selectedAccessLevel);
    }

    setFilteredConfigs(filtered);
  };

  const handleCreateConfig = () => {
    setEditingConfig({
      type: 'string',
      category: 'general',
      isEncrypted: false,
      isSensitive: false,
      isRequired: false,
      isPublic: false,
      environment: 'all',
      accessLevel: 'admin',
      history: []
    });
    setShowCreateModal(true);
  };

  const handleEditConfig = (config: SystemConfig) => {
    setSelectedConfig(config);
    setEditingConfig(config);
    setShowEditModal(true);
  };

  const handleViewHistory = (config: SystemConfig) => {
    setSelectedConfig(config);
    setShowHistoryModal(true);
  };

  const handleSaveConfig = async () => {
    try {
      // Validate the configuration
      const errors = validateConfig(editingConfig);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      const token = localStorage.getItem('token');
      const url = buildApiUrl('/api/admin/system-config');
      const method = selectedConfig ? 'PUT' : 'POST';
      const endpoint = selectedConfig ? `${url}/${selectedConfig._id}` : url;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingConfig)
      });

      if (response.ok) {
        await fetchConfigs();
        setShowCreateModal(false);
        setShowEditModal(false);
        setSelectedConfig(null);
        setEditingConfig({});
        setValidationErrors({});
      }
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  const handleDeleteConfig = async (config: SystemConfig) => {
    if (!window.confirm('Are you sure you want to delete this configuration?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/system-config/${config._id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchConfigs();
      }
    } catch (error) {
      console.error('Error deleting config:', error);
    }
  };

  const handleUpdateValue = async (config: SystemConfig, newValue: any, reason?: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/system-config/${config._id}/value`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: newValue, reason })
      });

      if (response.ok) {
        await fetchConfigs();
      }
    } catch (error) {
      console.error('Error updating config value:', error);
    }
  };

  const validateConfig = (config: Partial<SystemConfig>): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!config.key) {
      errors.key = 'Key is required';
    }

    if (!config.name) {
      errors.name = 'Name is required';
    }

    if (!config.type) {
      errors.type = 'Type is required';
    }

    if (!config.category) {
      errors.category = 'Category is required';
    }

    // Validate value based on type
    if (config.value !== undefined && config.type) {
      if (config.type === 'string' && typeof config.value !== 'string') {
        errors.value = 'Value must be a string';
      } else if (config.type === 'number' && typeof config.value !== 'number') {
        errors.value = 'Value must be a number';
      } else if (config.type === 'boolean' && typeof config.value !== 'boolean') {
        errors.value = 'Value must be a boolean';
      } else if (config.type === 'object' && typeof config.value !== 'object') {
        errors.value = 'Value must be an object';
      } else if (config.type === 'array' && !Array.isArray(config.value)) {
        errors.value = 'Value must be an array';
      }
    }

    return errors;
  };

  const toggleSensitiveValue = (configKey: string) => {
    const newShowSensitive = new Set(showSensitiveValues);
    if (newShowSensitive.has(configKey)) {
      newShowSensitive.delete(configKey);
    } else {
      newShowSensitive.add(configKey);
    }
    setShowSensitiveValues(newShowSensitive);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'payment':
        return <Key className="h-4 w-4 text-green-500" />;
      case 'storage':
        return <Database className="h-4 w-4 text-purple-500" />;
      case 'api':
        return <Globe className="h-4 w-4 text-orange-500" />;
      case 'security':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'general':
        return <Settings className="h-4 w-4 text-gray-500" />;
      case 'notification':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'backup':
        return <Database className="h-4 w-4 text-indigo-500" />;
      case 'analytics':
        return <Info className="h-4 w-4 text-pink-500" />;
      case 'integration':
        return <Globe className="h-4 w-4 text-teal-500" />;
      case 'system':
        return <Settings className="h-4 w-4 text-cyan-500" />;
      default:
        return <Settings className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAccessLevelBadge = (accessLevel: string) => {
    switch (accessLevel) {
      case 'public':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Public</span>;
      case 'admin':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Admin</span>;
      case 'super-admin':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Super Admin</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  const renderValue = (config: SystemConfig) => {
    if (config.isSensitive && !showSensitiveValues.has(config.key)) {
      return (
        <div className="flex items-center">
          <span className="text-gray-500">••••••••</span>
          <button
            onClick={() => toggleSensitiveValue(config.key)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      );
    }

    if (config.isSensitive && showSensitiveValues.has(config.key)) {
      return (
        <div className="flex items-center">
          <span className="text-gray-900 dark:text-white">{String(config.value)}</span>
          <button
            onClick={() => toggleSensitiveValue(config.key)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>
      );
    }

    if (config.type === 'boolean') {
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          config.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {config.value ? 'True' : 'False'}
        </span>
      );
    }

    if (config.type === 'object' || config.type === 'array') {
      return (
        <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {JSON.stringify(config.value, null, 2)}
        </code>
      );
    }

    return <span className="text-gray-900 dark:text-white">{String(config.value)}</span>;
  };

  const renderValueInput = (config: SystemConfig, value: any, onChange: (value: any) => void) => {
    switch (config.type) {
      case 'boolean':
        return (
          <select
            value={String(value)}
            onChange={(e) => onChange(e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        );
      case 'object':
      case 'array':
        return (
          <textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value));
              } catch (error) {
                // Invalid JSON, keep the text for editing
              }
            }}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Configuration</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system settings and configuration values</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreateConfig}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Configuration
          </button>
          <button
            onClick={fetchConfigs}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Configurations
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, key, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categories
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
              {[
                { value: 'email', label: 'Email' },
                { value: 'payment', label: 'Payment' },
                { value: 'storage', label: 'Storage' },
                { value: 'api', label: 'API' },
                { value: 'security', label: 'Security' },
                { value: 'general', label: 'General' },
                { value: 'notification', label: 'Notification' },
                { value: 'backup', label: 'Backup' },
                { value: 'analytics', label: 'Analytics' },
                { value: 'integration', label: 'Integration' },
                { value: 'system', label: 'System' },
                { value: 'reviewer', label: 'Reviewer' },
                { value: 'editor-in-chief', label: 'Editor-in-Chief' },
                { value: 'publisher', label: 'Publisher' }
              ].map((category) => (
                <label key={category.value} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, category.value]);
                      } else {
                        setSelectedCategories(selectedCategories.filter(cat => cat !== category.value));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Access Level
            </label>
            <select
              value={selectedAccessLevel}
              onChange={(e) => setSelectedAccessLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Levels</option>
              <option value="public">Public</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategories([]);
                setSelectedAccessLevel('');
              }}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Configurations List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading configurations...</p>
          </div>
        ) : filteredConfigs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No configurations found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredConfigs.map((config) => (
              <div key={config._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getCategoryIcon(config.category)}
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {config.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({config.key})
                      </span>
                      {getAccessLevelBadge(config.accessLevel)}
                      {config.isRequired && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Required
                        </span>
                      )}
                      {config.isSensitive && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Sensitive
                        </span>
                      )}
                    </div>
                    
                    {config.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {config.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <span className="font-medium">Type:</span>
                        <span className="ml-1 capitalize">{config.type}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Category:</span>
                        <span className="ml-1 capitalize">{config.category}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Environment:</span>
                        <span className="ml-1 capitalize">{config.environment}</span>
                      </div>
                      {config.metadata?.unit && (
                        <div className="flex items-center">
                          <span className="font-medium">Unit:</span>
                          <span className="ml-1">{config.metadata.unit}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Value:</span>
                      <div className="mt-1">
                        {renderValue(config)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewHistory(config)}
                      className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      title="View History"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditConfig(config)}
                      className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteConfig(config)}
                      className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {showCreateModal ? 'Create New Configuration' : 'Edit Configuration'}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key *
                    </label>
                    <input
                      type="text"
                      value={editingConfig.key || ''}
                      onChange={(e) => setEditingConfig({...editingConfig, key: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {validationErrors.key && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.key}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={editingConfig.name || ''}
                      onChange={(e) => setEditingConfig({...editingConfig, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingConfig.description || ''}
                    onChange={(e) => setEditingConfig({...editingConfig, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type *
                    </label>
                    <select
                      value={editingConfig.type || 'string'}
                      onChange={(e) => setEditingConfig({...editingConfig, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="object">Object</option>
                      <option value="array">Array</option>
                      <option value="json">JSON</option>
                    </select>
                    {validationErrors.type && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.type}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      value={editingConfig.category || 'general'}
                      onChange={(e) => setEditingConfig({...editingConfig, category: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="email">Email</option>
                      <option value="payment">Payment</option>
                      <option value="storage">Storage</option>
                      <option value="api">API</option>
                      <option value="security">Security</option>
                      <option value="general">General</option>
                      <option value="notification">Notification</option>
                      <option value="backup">Backup</option>
                      <option value="analytics">Analytics</option>
                      <option value="integration">Integration</option>
                      <option value="system">System</option>
                    </select>
                    {validationErrors.category && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Value
                  </label>
                  {renderValueInput(editingConfig as SystemConfig, editingConfig.value, (value) => 
                    setEditingConfig({...editingConfig, value})
                  )}
                  {validationErrors.value && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.value}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Environment
                    </label>
                    <select
                      value={editingConfig.environment || 'all'}
                      onChange={(e) => setEditingConfig({...editingConfig, environment: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All</option>
                      <option value="development">Development</option>
                      <option value="staging">Staging</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Access Level
                    </label>
                    <select
                      value={editingConfig.accessLevel || 'admin'}
                      onChange={(e) => setEditingConfig({...editingConfig, accessLevel: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="public">Public</option>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingConfig.isRequired || false}
                      onChange={(e) => setEditingConfig({...editingConfig, isRequired: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Required</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingConfig.isSensitive || false}
                      onChange={(e) => setEditingConfig({...editingConfig, isSensitive: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Sensitive</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingConfig.isPublic || false}
                      onChange={(e) => setEditingConfig({...editingConfig, isPublic: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Public</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingConfig.isEncrypted || false}
                      onChange={(e) => setEditingConfig({...editingConfig, isEncrypted: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Encrypted</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedConfig(null);
                    setEditingConfig({});
                    setValidationErrors({});
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedConfig && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Configuration History: {selectedConfig.name}
              </h3>
              
              <div className="space-y-4">
                {selectedConfig.history.map((entry, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Version {selectedConfig.history.length - index}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(entry.changedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Changed by: {entry.changedBy.name}
                    </div>
                    {entry.reason && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Reason: {entry.reason}
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium">Value:</span>
                      <code className="ml-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {JSON.stringify(entry.value)}
                      </code>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemConfiguration;


