import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, Plus, Edit, Trash2, Users, Settings, 
  Eye, UserPlus, FileText, Globe, MapPin, Clock, CheckCircle,
  XCircle, AlertCircle, Search, Filter, Download, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildApiUrl } from '../../config/api';

interface Journal {
  _id: string;
  name: string;
  shortName: string;
  description: string;
  issn?: string;
  isActive: boolean;
  isOpenForSubmissions: boolean;
  editorInChief: {
    userId: string;
    name: string;
    email: string;
  };
  associateEditors: Array<{
    userId: string;
    name: string;
    email: string;
    isActive: boolean;
  }>;
  reviewers: Array<{
    userId: string;
    name: string;
    email: string;
    status: string;
    totalReviews: number;
  }>;
  stats: {
    totalSubmissions: number;
    publishedArticles: number;
    rejectionRate: number;
  };
  createdAt: string;
}

interface Conference {
  _id: string;
  name: string;
  shortName: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    venue: string;
    city: string;
    country: string;
    isVirtual: boolean;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isActive: boolean;
  isOpenForRegistration: boolean;
  isOpenForSubmissions: boolean;
  organizingCommittee: {
    chair: {
      userId: string;
      name: string;
      email: string;
    };
    coChairs?: Array<{
      userId: string;
      name: string;
      email: string;
    }>;
  };
  stats: {
    totalSubmissions: number;
    acceptedPapers: number;
    totalRegistrations: number;
  };
  createdAt: string;
}

interface JournalConferenceManagementProps {
  onClose?: () => void;
}

const JournalConferenceManagement: React.FC<JournalConferenceManagementProps> = ({ onClose }) => {
  const { token, admin } = useAuth();
  const [activeTab, setActiveTab] = useState<'journals' | 'conferences'>('journals');
  const [journals, setJournals] = useState<Journal[]>([]);
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Journal | Conference | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<Journal | Conference>>({});

  // Check user permissions
  const isAdmin = admin?.role === 'administrator' || admin?.role === 'super-admin';
  const isEiC = admin?.role === 'editor-in-chief';
  const isConferenceOrganizer = admin?.role === 'conference-organizer';
  const canCreateJournals = isAdmin;
  const canCreateConferences = isAdmin;
  const canDeleteJournals = isAdmin;
  const canDeleteConferences = isAdmin;

  useEffect(() => {
    if (activeTab === 'journals') {
      fetchJournals();
    } else {
      fetchConferences();
    }
  }, [activeTab]);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/api/admin/journals'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJournals(data.journals || []);
      } else {
        console.error('Failed to fetch journals');
        setJournals([]);
      }
    } catch (error) {
      console.error('Error fetching journals:', error);
      setJournals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchConferences = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/api/admin/conferences'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConferences(data.conferences || []);
      } else {
        console.error('Failed to fetch conferences');
        setConferences([]);
      }
    } catch (error) {
      console.error('Error fetching conferences:', error);
      setConferences([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = () => {
    setEditingItem({});
    setShowCreateModal(true);
  };

  const handleEditItem = (item: Journal | Conference) => {
    setSelectedItem(item);
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleSaveItem = async () => {
    try {
      if (activeTab === 'journals') {
        const currentJournals = JSON.parse(localStorage.getItem('admin_journals') || '[]');
        
        if (selectedItem) {
          // Update existing journal
          const updatedJournals = currentJournals.map((journal: Journal) =>
            journal._id === selectedItem._id ? { ...editingItem, _id: selectedItem._id } : journal
          );
          localStorage.setItem('admin_journals', JSON.stringify(updatedJournals));
        } else {
          // Create new journal
          const journalData = editingItem as Partial<Journal>;
          const newJournal: Journal = {
            ...journalData,
            _id: Date.now().toString(), // Simple ID generation
            createdAt: new Date().toISOString(),
            // Initialize required properties with default values
            associateEditors: journalData.associateEditors || [],
            reviewers: journalData.reviewers || [],
            stats: journalData.stats || {
              totalSubmissions: 0,
              publishedArticles: 0,
              rejectionRate: 0
            },
            isActive: journalData.isActive !== undefined ? journalData.isActive : true,
            isOpenForSubmissions: journalData.isOpenForSubmissions !== undefined ? journalData.isOpenForSubmissions : true,
            editorInChief: journalData.editorInChief || {
              userId: '',
              name: '',
              email: ''
            }
          } as Journal;
          const updatedJournals = [...currentJournals, newJournal];
          localStorage.setItem('admin_journals', JSON.stringify(updatedJournals));
        }
        
        await fetchJournals();
      } else {
        const currentConferences = JSON.parse(localStorage.getItem('admin_conferences') || '[]');
        
        if (selectedItem) {
          // Update existing conference
          const updatedConferences = currentConferences.map((conference: Conference) =>
            conference._id === selectedItem._id ? { ...editingItem, _id: selectedItem._id } : conference
          );
          localStorage.setItem('admin_conferences', JSON.stringify(updatedConferences));
        } else {
          // Create new conference
          const conferenceData = editingItem as Partial<Conference>;
          const newConference: Conference = {
            ...conferenceData,
            _id: Date.now().toString(), // Simple ID generation
            createdAt: new Date().toISOString(),
            // Initialize required properties with default values
            stats: conferenceData.stats || {
              totalSubmissions: 0,
              acceptedPapers: 0,
              totalRegistrations: 0
            },
            isActive: conferenceData.isActive !== undefined ? conferenceData.isActive : true,
            isOpenForRegistration: conferenceData.isOpenForRegistration !== undefined ? conferenceData.isOpenForRegistration : true,
            isOpenForSubmissions: conferenceData.isOpenForSubmissions !== undefined ? conferenceData.isOpenForSubmissions : true,
            status: conferenceData.status || 'upcoming',
            location: conferenceData.location || {
              venue: '',
              city: '',
              country: '',
              isVirtual: false
            },
            startDate: conferenceData.startDate || new Date().toISOString(),
            endDate: conferenceData.endDate || new Date().toISOString(),
            organizingCommittee: conferenceData.organizingCommittee || {
              chair: {
                userId: '',
                name: '',
                email: ''
              }
            }
          } as Conference;
          const updatedConferences = [...currentConferences, newConference];
          localStorage.setItem('admin_conferences', JSON.stringify(updatedConferences));
        }
        
        await fetchConferences();
      }
      
      setShowCreateModal(false);
      setShowEditModal(false);
      setSelectedItem(null);
      setEditingItem({});
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDeleteItem = async (item: Journal | Conference) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (activeTab === 'journals') {
        const currentJournals = JSON.parse(localStorage.getItem('admin_journals') || '[]');
        const updatedJournals = currentJournals.filter((journal: Journal) => journal._id !== item._id);
        localStorage.setItem('admin_journals', JSON.stringify(updatedJournals));
        await fetchJournals();
      } else {
        const currentConferences = JSON.parse(localStorage.getItem('admin_conferences') || '[]');
        const updatedConferences = currentConferences.filter((conference: Conference) => conference._id !== item._id);
        localStorage.setItem('admin_conferences', JSON.stringify(updatedConferences));
        await fetchConferences();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleToggleStatus = async (item: Journal | Conference) => {
    try {
      if (activeTab === 'journals') {
        const currentJournals = JSON.parse(localStorage.getItem('admin_journals') || '[]');
        const updatedJournals = currentJournals.map((journal: Journal) =>
          journal._id === item._id ? { ...journal, isActive: !journal.isActive } : journal
        );
        localStorage.setItem('admin_journals', JSON.stringify(updatedJournals));
        await fetchJournals();
      } else {
        const currentConferences = JSON.parse(localStorage.getItem('admin_conferences') || '[]');
        const updatedConferences = currentConferences.map((conference: Conference) =>
          conference._id === item._id ? { ...conference, isActive: !conference.isActive } : conference
        );
        localStorage.setItem('admin_conferences', JSON.stringify(updatedConferences));
        await fetchConferences();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'upcoming':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ongoing':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const filteredItems = activeTab === 'journals' 
    ? journals.filter(journal => 
        journal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conferences.filter(conference =>
        conference.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conference.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conference.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'journals' ? 'Journal Management' : 'Conference Management'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage {activeTab === 'journals' ? 'journals and editorial teams' : 'conferences and events'}
          </p>
          {isEiC && activeTab === 'journals' && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              You can only edit journals where you are the Editor-in-Chief
            </p>
          )}
          {isConferenceOrganizer && activeTab === 'conferences' && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              You can only edit conferences where you are the organizer
            </p>
          )}
        </div>
        <div className="flex space-x-3">
          {(activeTab === 'journals' && canCreateJournals) || (activeTab === 'conferences' && canCreateConferences) ? (
            <button
              onClick={handleCreateItem}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create {activeTab === 'journals' ? 'Journal' : 'Conference'}
            </button>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400 px-4 py-2">
              {activeTab === 'journals' 
                ? 'Only administrators can create journals' 
                : 'Only administrators can create conferences'
              }
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('journals')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'journals'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Journals
            </button>
            <button
              onClick={() => setActiveTab('conferences')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'conferences'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Conferences
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={activeTab === 'journals' ? fetchJournals : fetchConferences}
            className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading {activeTab}...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No {activeTab} found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredItems.map((item) => (
              <div key={item._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({item.shortName})
                      </span>
                      {getStatusIcon(activeTab === 'journals' ? (item as Journal).isActive ? 'active' : 'inactive' : (item as Conference).status)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      {activeTab === 'journals' ? (
                        <>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {(item as Journal).associateEditors?.length || 0} Editors
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {(item as Journal).stats?.totalSubmissions || 0} Submissions
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {(item as Journal).stats?.publishedArticles || 0} Published
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {(item as Conference).startDate ? new Date((item as Conference).startDate).toLocaleDateString() : 'TBD'}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {(item as Conference).location?.city || 'TBD'}, {(item as Conference).location?.country || 'TBD'}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {(item as Conference).stats?.totalRegistrations || 0} Registrations
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Edit button - available to EiC for their journals, organizers for their conferences, and admins */}
                    {(isAdmin || 
                      (activeTab === 'journals' && isEiC && (item as Journal).editorInChief.userId === admin?.id) ||
                      (activeTab === 'conferences' && isConferenceOrganizer && 
                       ((item as Conference).organizingCommittee.chair.userId === admin?.id ||
                        (item as Conference).organizingCommittee.coChairs?.some(coChair => coChair.userId === admin?.id)))
                    ) && (
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* Toggle status button - available to EiC for their journals, organizers for their conferences, and admins */}
                    {(isAdmin || 
                      (activeTab === 'journals' && isEiC && (item as Journal).editorInChief.userId === admin?.id) ||
                      (activeTab === 'conferences' && isConferenceOrganizer && 
                       ((item as Conference).organizingCommittee.chair.userId === admin?.id ||
                        (item as Conference).organizingCommittee.coChairs?.some(coChair => coChair.userId === admin?.id)))
                    ) && (
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`p-2 ${
                          activeTab === 'journals' 
                            ? (item as Journal).isActive 
                              ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                            : (item as Conference).isActive
                              ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={activeTab === 'journals' 
                          ? (item as Journal).isActive ? 'Deactivate' : 'Activate'
                          : (item as Conference).isActive ? 'Deactivate' : 'Activate'
                        }
                      >
                        {activeTab === 'journals' 
                          ? (item as Journal).isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />
                          : (item as Conference).isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />
                        }
                      </button>
                    )}
                    
                    {/* Delete button - only available to admins */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
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
                {showCreateModal ? `Create New ${activeTab === 'journals' ? 'Journal' : 'Conference'}` : `Edit ${activeTab === 'journals' ? 'Journal' : 'Conference'}`}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingItem.name || ''}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Short Name
                    </label>
                    <input
                      type="text"
                      value={editingItem.shortName || ''}
                      onChange={(e) => setEditingItem({...editingItem, shortName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {activeTab === 'journals' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ISSN
                    </label>
                    <input
                      type="text"
                      value={(editingItem as Journal).issn || ''}
                      onChange={(e) => setEditingItem({...editingItem, issn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                )}

                {activeTab === 'conferences' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={(editingItem as Conference).startDate ? (editingItem as Conference).startDate.split('T')[0] : ''}
                        onChange={(e) => setEditingItem({...editingItem, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={(editingItem as Conference).endDate ? (editingItem as Conference).endDate.split('T')[0] : ''}
                        onChange={(e) => setEditingItem({...editingItem, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem.isActive || false}
                      onChange={(e) => setEditingItem({...editingItem, isActive: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                  
                  {activeTab === 'journals' && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(editingItem as Journal).isOpenForSubmissions || false}
                        onChange={(e) => setEditingItem({...editingItem, isOpenForSubmissions: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Open for Submissions</span>
                    </label>
                  )}

                  {activeTab === 'conferences' && (
                    <>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(editingItem as Conference).isOpenForRegistration || false}
                          onChange={(e) => setEditingItem({...editingItem, isOpenForRegistration: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Open for Registration</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(editingItem as Conference).isOpenForSubmissions || false}
                          onChange={(e) => setEditingItem({...editingItem, isOpenForSubmissions: e.target.checked})}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Open for Submissions</span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedItem(null);
                    setEditingItem({});
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {showCreateModal ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalConferenceManagement;


