import React, { useState, useEffect } from 'react';
import { 
  Mail, Plus, Edit, Trash2, Eye, Save, X, Search, Filter,
  Send, Copy, History, RefreshCw, AlertCircle, CheckCircle,
  FileText, Globe, Settings, Users, Calendar, Tag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';

interface EmailTemplate {
  _id: string;
  name: string;
  key: string;
  subject: string;
  body: string;
  type: 'system' | 'journal' | 'conference' | 'user' | 'notification' | 'newsletter';
  isActive: boolean;
  variables: string[];
  description?: string;
  createdBy: {
    userId: string;
    name: string;
    email: string;
  };
  version: number;
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
  usageCount: number;
}

interface EmailTemplateManagementProps {
  onClose?: () => void;
}

const EmailTemplateManagement: React.FC<EmailTemplateManagementProps> = ({ onClose }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<Partial<EmailTemplate>>({});
  const [testEmail, setTestEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'bulk-unsubscribe'>('list');
  const [showBulkUnsubscribeModal, setShowBulkUnsubscribeModal] = useState(false);
  const [subscriptionStats, setSubscriptionStats] = useState<any>(null);
  const [bulkUnsubscribeData, setBulkUnsubscribeData] = useState({
    templateTypes: [] as string[],
    userFilters: {
      roles: [] as string[],
      accountType: '',
      membershipStatus: '',
      isActive: undefined as boolean | undefined
    }
  });

  useEffect(() => {
    fetchTemplates();
    fetchSubscriptionStats();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, selectedType, selectedStatus]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/email-templates'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching email templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(template => template.type === selectedType);
    }

    if (selectedStatus) {
      if (selectedStatus === 'active') {
        filtered = filtered.filter(template => template.isActive);
      } else if (selectedStatus === 'inactive') {
        filtered = filtered.filter(template => !template.isActive);
      }
    }

    setFilteredTemplates(filtered);
  };

  const handleCreateTemplate = () => {
    setEditingTemplate({
      type: 'system',
      isActive: true,
      variables: [],
      version: 1,
      usageCount: 0
    });
    setShowCreateModal(true);
    setActiveTab('editor');
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditingTemplate(template);
    setShowEditModal(true);
    setActiveTab('editor');
  };

  const handleViewTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowViewModal(true);
  };

  const handleSaveTemplate = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = buildApiUrl('/api/admin/email-templates');
      const method = selectedTemplate ? 'PUT' : 'POST';
      const endpoint = selectedTemplate ? `${url}/${selectedTemplate._id}` : url;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingTemplate)
      });

      if (response.ok) {
        await fetchTemplates();
        setShowCreateModal(false);
        setShowEditModal(false);
        setSelectedTemplate(null);
        setEditingTemplate({});
        setActiveTab('list');
      }
    } catch (error) {
      console.error('Error saving email template:', error);
    }
  };

  const handleDeleteTemplate = async (template: EmailTemplate) => {
    if (!window.confirm('Are you sure you want to delete this email template?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/email-templates/${template._id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchTemplates();
      }
    } catch (error) {
      console.error('Error deleting email template:', error);
    }
  };

  const handleToggleStatus = async (template: EmailTemplate) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/email-templates/${template._id}/status`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !template.isActive })
      });

      if (response.ok) {
        await fetchTemplates();
      }
    } catch (error) {
      console.error('Error updating template status:', error);
    }
  };

  const handleSendTestEmail = async () => {
    if (!selectedTemplate || !testEmail) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/admin/email-templates/${selectedTemplate._id}/test`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testEmail })
      });

      if (response.ok) {
        alert('Test email sent successfully!');
        setShowTestModal(false);
        setTestEmail('');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
    }
  };

  const fetchSubscriptionStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/email-templates/subscription-stats'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching subscription stats:', error);
    }
  };

  const handleBulkUnsubscribe = async () => {
    if (bulkUnsubscribeData.templateTypes.length === 0) {
      alert('Please select at least one template type to unsubscribe from');
      return;
    }

    if (!window.confirm(`Are you sure you want to bulk unsubscribe users from ${bulkUnsubscribeData.templateTypes.join(', ')} emails? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/email-templates/bulk-unsubscribe'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bulkUnsubscribeData)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Successfully unsubscribed ${data.affectedUsers} users from ${data.templateTypes.length} email template type(s)`);
        setShowBulkUnsubscribeModal(false);
        setBulkUnsubscribeData({
          templateTypes: [],
          userFilters: {
            roles: [],
            accountType: '',
            membershipStatus: '',
            isActive: undefined
          }
        });
        fetchSubscriptionStats(); // Refresh stats
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error performing bulk unsubscribe:', error);
      alert('Failed to perform bulk unsubscribe');
    }
  };

  const handleDuplicateTemplate = async (template: EmailTemplate) => {
    const duplicatedTemplate = {
      ...template,
      name: `${template.name} (Copy)`,
      key: `${template.key}_copy_${Date.now()}`,
      _id: undefined
    };
    
    setEditingTemplate(duplicatedTemplate);
    setShowCreateModal(true);
    setActiveTab('editor');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'journal':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'conference':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'user':
        return <Users className="h-4 w-4 text-orange-500" />;
      case 'notification':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'newsletter':
        return <Mail className="h-4 w-4 text-red-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (template: EmailTemplate) => {
    if (template.isActive) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>;
    }
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{(\w+)\}\}/g);
    return matches ? Array.from(new Set(matches.map(match => match.replace(/[{}]/g, '')))) : [];
  };

  const handleBodyChange = (body: string) => {
    const variables = extractVariables(body);
    setEditingTemplate({...editingTemplate, body, variables});
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Template Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage email templates for system notifications and communications</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowBulkUnsubscribeModal(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Unsubscribe
          </button>
          <button
            onClick={handleCreateTemplate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
          <button
            onClick={fetchTemplates}
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
              onClick={() => setActiveTab('list')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Template List
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'editor'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Edit className="h-4 w-4 inline mr-2" />
              Editor
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'list' && (
        <>
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Templates
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, key, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="system">System</option>
                  <option value="journal">Journal</option>
                  <option value="conference">Conference</option>
                  <option value="user">User</option>
                  <option value="notification">Notification</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('');
                    setSelectedStatus('');
                  }}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Templates List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading templates...</p>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No templates found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTemplates.map((template) => (
                  <div key={template._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getTypeIcon(template.type)}
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {template.name}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({template.key})
                          </span>
                          {getStatusBadge(template)}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          <strong>Subject:</strong> {template.subject}
                        </p>

                        {template.description && (
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {template.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {template.createdBy.name}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(template.updatedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            v{template.version}
                          </div>
                          <div className="flex items-center">
                            <Send className="h-4 w-4 mr-1" />
                            {template.usageCount} uses
                          </div>
                          {template.variables.length > 0 && (
                            <div className="flex items-center">
                              <Settings className="h-4 w-4 mr-1" />
                              {template.variables.length} variables
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewTemplate(template)}
                          className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateTemplate(template)}
                          className="p-2 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowTestModal(true);
                          }}
                          className="p-2 text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                          title="Send Test"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(template)}
                          className={`p-2 ${
                            template.isActive 
                              ? 'text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                          }`}
                          title={template.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {template.isActive ? <X className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template)}
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
        </>
      )}

      {activeTab === 'editor' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {showCreateModal ? 'Create New Email Template' : 'Edit Email Template'}
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={editingTemplate.name || ''}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Template Key
                </label>
                <input
                  type="text"
                  value={editingTemplate.key || ''}
                  onChange={(e) => setEditingTemplate({...editingTemplate, key: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={editingTemplate.description || ''}
                onChange={(e) => setEditingTemplate({...editingTemplate, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={editingTemplate.type || 'system'}
                  onChange={(e) => setEditingTemplate({...editingTemplate, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="system">System</option>
                  <option value="journal">Journal</option>
                  <option value="conference">Conference</option>
                  <option value="user">User</option>
                  <option value="notification">Notification</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingTemplate.isActive || false}
                    onChange={(e) => setEditingTemplate({...editingTemplate, isActive: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={editingTemplate.subject || ''}
                onChange={(e) => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Use {{variableName}} for dynamic content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Body
              </label>
              <textarea
                value={editingTemplate.body || ''}
                onChange={(e) => handleBodyChange(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
                placeholder="Enter your email template here. Use {{variableName}} for dynamic content. HTML is supported."
              />
            </div>

            {editingTemplate.variables && editingTemplate.variables.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Available Variables
                </label>
                <div className="flex flex-wrap gap-2">
                  {editingTemplate.variables.map((variable) => (
                    <span key={variable} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedTemplate(null);
                setEditingTemplate({});
                setActiveTab('list');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTemplate}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </button>
          </div>
        </div>
      )}

      {/* View Template Modal */}
      {showViewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {selectedTemplate.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {selectedTemplate.subject}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Body
                  </label>
                  <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                      {selectedTemplate.body}
                    </pre>
                  </div>
                </div>

                {selectedTemplate.variables.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Variables
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTemplate.variables.map((variable) => (
                        <span key={variable} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                          {`{{${variable}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Email Modal */}
      {showTestModal && selectedTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Send Test Email
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template: {selectedTemplate.name}
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Test Email Address
                  </label>
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowTestModal(false);
                    setTestEmail('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendTestEmail}
                  disabled={!testEmail}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Unsubscribe Modal */}
      {showBulkUnsubscribeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Bulk Unsubscribe Users
                </h3>
                <button
                  onClick={() => setShowBulkUnsubscribeModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Subscription Statistics */}
              {subscriptionStats && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Current Subscription Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Total Users:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{subscriptionStats.totalUsers}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Newsletter Subscribers:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{subscriptionStats.newsletterSubscribers}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Review Invitations:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{subscriptionStats.reviewInvitationSubscribers}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">System Notifications:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{subscriptionStats.systemNotificationSubscribers}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Conference Updates:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{subscriptionStats.conferenceUpdateSubscribers}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Journal Updates:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{subscriptionStats.journalUpdateSubscribers}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Template Types Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Email Template Types to Unsubscribe From
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: 'newsletter', label: 'Newsletters' },
                      { value: 'notification', label: 'Review Invitations' },
                      { value: 'system', label: 'System Notifications' },
                      { value: 'conference', label: 'Conference Updates' },
                      { value: 'journal', label: 'Journal Updates' },
                      { value: 'user', label: 'Marketing Emails' }
                    ].map((type) => (
                      <label key={type.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={bulkUnsubscribeData.templateTypes.includes(type.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkUnsubscribeData(prev => ({
                                ...prev,
                                templateTypes: [...prev.templateTypes, type.value]
                              }));
                            } else {
                              setBulkUnsubscribeData(prev => ({
                                ...prev,
                                templateTypes: prev.templateTypes.filter(t => t !== type.value)
                              }));
                            }
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* User Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Filter Users (Optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Roles
                      </label>
                      <div className="space-y-2">
                        {['reviewer', 'editor', 'editor-in-chief', 'administrator', 'super-admin'].map((role) => (
                          <label key={role} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={bulkUnsubscribeData.userFilters.roles.includes(role)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBulkUnsubscribeData(prev => ({
                                    ...prev,
                                    userFilters: {
                                      ...prev.userFilters,
                                      roles: [...prev.userFilters.roles, role]
                                    }
                                  }));
                                } else {
                                  setBulkUnsubscribeData(prev => ({
                                    ...prev,
                                    userFilters: {
                                      ...prev.userFilters,
                                      roles: prev.userFilters.roles.filter(r => r !== role)
                                    }
                                  }));
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{role.replace('-', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Account Type
                        </label>
                        <select
                          value={bulkUnsubscribeData.userFilters.accountType}
                          onChange={(e) => setBulkUnsubscribeData(prev => ({
                            ...prev,
                            userFilters: { ...prev.userFilters, accountType: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">All Account Types</option>
                          <option value="colleague">Colleague</option>
                          <option value="member">Member</option>
                          <option value="student">Student</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Membership Status
                        </label>
                        <select
                          value={bulkUnsubscribeData.userFilters.membershipStatus}
                          onChange={(e) => setBulkUnsubscribeData(prev => ({
                            ...prev,
                            userFilters: { ...prev.userFilters, membershipStatus: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="expired">Expired</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Account Status
                        </label>
                        <select
                          value={bulkUnsubscribeData.userFilters.isActive === undefined ? '' : bulkUnsubscribeData.userFilters.isActive.toString()}
                          onChange={(e) => setBulkUnsubscribeData(prev => ({
                            ...prev,
                            userFilters: { 
                              ...prev.userFilters, 
                              isActive: e.target.value === '' ? undefined : e.target.value === 'true'
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="">All Accounts</option>
                          <option value="true">Active Only</option>
                          <option value="false">Inactive Only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowBulkUnsubscribeModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUnsubscribe}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Bulk Unsubscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateManagement;