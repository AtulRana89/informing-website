import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Edit, Trash2, Eye, Save, X, Search, Filter,
  Globe, Lock, Unlock, Calendar, User, Tag, Folder, RefreshCw,
  ChevronDown, ChevronRight, Settings, Copy, History, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';

interface Content {
  _id: string;
  key: string;
  title: string;
  description?: string;
  type: 'page' | 'section' | 'announcement' | 'featured-quote' | 'faq' | 'about' | 'news';
  content: string;
  richContent?: any;
  isActive: boolean;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  displayOrder: number;
  showInNavigation: boolean;
  showInFooter: boolean;
  categories: string[];
  tags: string[];
  author: {
    userId: string;
    name: string;
    email: string;
  };
  publishedAt?: string;
  publishedBy?: {
    userId: string;
    name: string;
  };
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface ContentManagementProps {
  onClose?: () => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({ onClose }) => {
  const { token } = useAuth();
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [editingContent, setEditingContent] = useState<Partial<Content>>({});
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    filterContents();
  }, [contents, searchTerm, selectedType, selectedStatus]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/api/admin/content'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContents(data.contents);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContents = () => {
    let filtered = contents;

    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(content => content.type === selectedType);
    }

    if (selectedStatus) {
      if (selectedStatus === 'published') {
        filtered = filtered.filter(content => content.isPublished && content.isActive);
      } else if (selectedStatus === 'draft') {
        filtered = filtered.filter(content => !content.isPublished);
      } else if (selectedStatus === 'inactive') {
        filtered = filtered.filter(content => !content.isActive);
      }
    }

    setFilteredContents(filtered);
  };

  const handleCreateContent = () => {
    setEditingContent({
      type: 'page',
      isActive: true,
      isPublished: false,
      displayOrder: 0,
      showInNavigation: false,
      showInFooter: false,
      categories: [],
      tags: []
    });
    setShowCreateModal(true);
    setActiveTab('editor');
  };

  const handleEditContent = (content: Content) => {
    setSelectedContent(content);
    setEditingContent(content);
    setShowEditModal(true);
    setActiveTab('editor');
  };

  const handleViewContent = (content: Content) => {
    setSelectedContent(content);
    setShowViewModal(true);
  };

  const handleSaveContent = async () => {
    try {
      const url = buildApiUrl('/api/admin/content');
      const method = selectedContent ? 'PUT' : 'POST';
      const endpoint = selectedContent ? `${url}/${selectedContent._id}` : url;

      console.log('Content Save: Making request to:', endpoint);
      console.log('Content Save: Method:', method);
      console.log('Content Save: Data:', editingContent);

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingContent)
      });

      console.log('Content Save: Response status:', response.status);
      console.log('Content Save: Response ok:', response.ok);

      if (response.ok) {
        await fetchContents();
        setShowCreateModal(false);
        setShowEditModal(false);
        setSelectedContent(null);
        setEditingContent({});
        setActiveTab('list');
      } else {
        const errorData = await response.json();
        console.error('Content Save: Error response:', errorData);
        alert(`Failed to save content: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to save content: ${errorMessage}`);
    }
  };

  const handleDeleteContent = async (content: Content) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      const response = await fetch(buildApiUrl(`/api/admin/content/${content._id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchContents();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleToggleStatus = async (content: Content, field: 'isActive' | 'isPublished') => {
    try {
      const response = await fetch(buildApiUrl(`/api/admin/content/${content._id}/status`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [field]: !content[field] })
      });

      if (response.ok) {
        await fetchContents();
      }
    } catch (error) {
      console.error('Error updating content status:', error);
    }
  };

  const handleDuplicateContent = async (content: Content) => {
    const duplicatedContent = {
      ...content,
      title: `${content.title} (Copy)`,
      key: `${content.key}_copy_${Date.now()}`,
      isPublished: false,
      _id: undefined
    };
    
    setEditingContent(duplicatedContent);
    setShowCreateModal(true);
    setActiveTab('editor');
  };

  const toggleExpanded = (contentId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(contentId)) {
      newExpanded.delete(contentId);
    } else {
      newExpanded.add(contentId);
    }
    setExpandedItems(newExpanded);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'section':
        return <Folder className="h-4 w-4 text-green-500" />;
      case 'announcement':
        return <Globe className="h-4 w-4 text-yellow-500" />;
      case 'featured-quote':
        return <Tag className="h-4 w-4 text-purple-500" />;
      case 'faq':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'about':
        return <User className="h-4 w-4 text-indigo-500" />;
      case 'news':
        return <Globe className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (content: Content) => {
    if (!content.isActive) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>;
    } else if (content.isPublished) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Published</span>;
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage website content, pages, and announcements</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreateContent}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </button>
          <button
            onClick={fetchContents}
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
              Content List
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
                  Search Content
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, key, or content..."
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
                  <option value="page">Page</option>
                  <option value="section">Section</option>
                  <option value="announcement">Announcement</option>
                  <option value="featured-quote">Featured Quote</option>
                  <option value="faq">FAQ</option>
                  <option value="about">About</option>
                  <option value="news">News</option>
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
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
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

          {/* Content List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
              </div>
            ) : filteredContents.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No content found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredContents.map((content) => (
                  <div key={content._id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getTypeIcon(content.type)}
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {content.title}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({content.key})
                          </span>
                          {getStatusBadge(content)}
                        </div>
                        
                        {content.description && (
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {content.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {content.author.name}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(content.updatedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            v{content.version}
                          </div>
                          {content.categories.length > 0 && (
                            <div className="flex items-center">
                              <Folder className="h-4 w-4 mr-1" />
                              {content.categories.join(', ')}
                            </div>
                          )}
                        </div>

                        {expandedItems.has(content._id) && (
                          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="prose dark:prose-invert max-w-none">
                              <div dangerouslySetInnerHTML={{ __html: content.content }} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleExpanded(content._id)}
                          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                          title={expandedItems.has(content._id) ? 'Collapse' : 'Expand'}
                        >
                          {expandedItems.has(content._id) ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </button>
                        <button
                          onClick={() => handleViewContent(content)}
                          className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditContent(content)}
                          className="p-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicateContent(content)}
                          className="p-2 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(content, 'isPublished')}
                          className={`p-2 ${
                            content.isPublished 
                              ? 'text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                          }`}
                          title={content.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {content.isPublished ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleToggleStatus(content, 'isActive')}
                          className={`p-2 ${
                            content.isActive 
                              ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                          }`}
                          title={content.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {content.isActive ? <X className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteContent(content)}
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
            {showCreateModal ? 'Create New Content' : 'Edit Content'}
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingContent.title || ''}
                  onChange={(e) => setEditingContent({...editingContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key
                </label>
                <input
                  type="text"
                  value={editingContent.key || ''}
                  onChange={(e) => setEditingContent({...editingContent, key: e.target.value})}
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
                value={editingContent.description || ''}
                onChange={(e) => setEditingContent({...editingContent, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={editingContent.type || 'page'}
                  onChange={(e) => setEditingContent({...editingContent, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="page">Page</option>
                  <option value="section">Section</option>
                  <option value="announcement">Announcement</option>
                  <option value="featured-quote">Featured Quote</option>
                  <option value="faq">FAQ</option>
                  <option value="about">About</option>
                  <option value="news">News</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingContent.displayOrder || 0}
                  onChange={(e) => setEditingContent({...editingContent, displayOrder: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={editingContent.content || ''}
                onChange={(e) => setEditingContent({...editingContent, content: e.target.value})}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter your content here. You can use HTML tags for formatting."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={editingContent.metaTitle || ''}
                  onChange={(e) => setEditingContent({...editingContent, metaTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={editingContent.slug || ''}
                  onChange={(e) => setEditingContent({...editingContent, slug: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Description
              </label>
              <textarea
                value={editingContent.metaDescription || ''}
                onChange={(e) => setEditingContent({...editingContent, metaDescription: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingContent.isActive || false}
                  onChange={(e) => setEditingContent({...editingContent, isActive: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingContent.isPublished || false}
                  onChange={(e) => setEditingContent({...editingContent, isPublished: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingContent.showInNavigation || false}
                  onChange={(e) => setEditingContent({...editingContent, showInNavigation: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Show in Navigation</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingContent.showInFooter || false}
                  onChange={(e) => setEditingContent({...editingContent, showInFooter: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Show in Footer</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedContent(null);
                setEditingContent({});
                setActiveTab('list');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveContent}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Content
            </button>
          </div>
        </div>
      )}

      {/* View Content Modal */}
      {showViewModal && selectedContent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {selectedContent.title}
              </h3>
              
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
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
    </div>
  );
};

export default ContentManagement;


