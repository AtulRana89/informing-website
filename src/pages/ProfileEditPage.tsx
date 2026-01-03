import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicFooter from '../components/PublicFooter';
import PublicHeader from '../components/PublicHeader';
import AcademicInfoForm from '../components/profile/AcademicInfoForm';
import AccountInfoForm from '../components/profile/AccountInfoForm';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import PreferencesForm from '../components/profile/PreferencesForm';
import TopicsForm from '../components/profile/TopicsForm';

const ProfileEditPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [expandedSections, setExpandedSections] = useState({
    'fields-specializations': true,
    'special-signup': false,
    'general-inquiry': false,
    'research-topics': false,
    'research-method': false,
    'co-authorship': false
  });
  const [selectedTopics, setSelectedTopics] = useState(['Applied Psychology']);
  const [preferencesData, setPreferencesData] = useState({
    preventShowingCV: false,
    unsubscribeNewsletters: false,
    allowBasicProfile: false,
    websiteURL: 'www.informingscience.org',
    googlePlusURL: 'https://www.google.com/',
    twitterURL: 'https://x.com/',
    facebookURL: 'https://www.facebook.com/',
    linkedinURL: 'https://www.linkedin.com/'
  });
  const [formData, setFormData] = useState({
    personalTitle: '',
    gender: '',
    newsletterOptOut: false,
    personalName: '',
    middleInitial: '',
    familyName: '',
    address: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    officePhone: '',
    personalPhone: '',
    primaryEmail: 'tagusaasia@gmail.com',
    receivePrimaryEmails: true,
    secondaryEmail: '',
    receiveSecondaryEmails: true,
    currentPassword: '•••••',
    newPassword: '',
    confirmPassword: '',
    memberUntil: '',
    affiliation: '',
    positionTitle: '',
    department: '',
    orcid: '',
    academicAddress: '123 University Street',
    academicCity: '',
    academicStateProvince: '',
    academicPostalCode: '',
    academicCountry: '',
    shortBio: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const tabs = [
    { id: 'personal-info', label: 'Personal Info' },
    { id: 'account-info', label: 'Account Info' },
    { id: 'academic-info', label: 'Academic Info' },
    { id: 'topics', label: 'Topics' },
    { id: 'reviewing-options', label: 'Reviewing Options' },
    { id: 'preferences', label: 'Preferences' }
  ];

  const toggleSection = (sectionId: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics(prev => [...prev, topic]);
    } else {
      setSelectedTopics(prev => prev.filter(t => t !== topic));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6"><a href="/" className="hover:underline">Home</a> <span className="mx-1">›</span> Profile Edit</div>
          {/* Tab Navigation */}
          <div className="mb-8">
            {/* Desktop tabs - original styling */}
            <div className="hidden sm:flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-[12px] transition-colors ${activeTab === tab.id
                    ? 'bg-[#295F9A] text-white'
                    : 'bg-[#F5F5F5] text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile tabs - responsive with gray background */}
            <div className="sm:hidden rounded-lg p-2 w-full" style={{ backgroundColor: '#F5F5F5' }}>
              <div className="flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeTab === tab.id
                      ? 'text-[#295F9A]'
                      : 'text-[#3E3232] hover:text-[#295F9A]'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'personal-info' && <PersonalInfoForm />}


          {/* Account Info Tab Content */}
          {activeTab === "account-info" && <AccountInfoForm />}


          {/* Academic Info Tab Content */}
          {activeTab === "academic-info" && <AcademicInfoForm />}


          {/* Topics Tab Content */}
          {activeTab === "topics" && <TopicsForm />}


          {/* Preferences Tab Content */}
          {activeTab === "preferences" && <PreferencesForm />}

          {/* Other tabs content would go here */}
          {activeTab !== 'personal-info' && activeTab !== 'account-info' && activeTab !== 'academic-info' && activeTab !== 'topics' && activeTab !== 'preferences' && (
            <div className="bg-white p-8 text-center text-gray-500">
              <p>{tabs.find(tab => tab.id === activeTab)?.label} content coming soon...</p>
            </div>
          )}

          {/* Footer Links - For Personal Info, Account Info, Academic Info, Topics, and Preferences tabs */}
          {(activeTab === 'personal-info' || activeTab === 'account-info' || activeTab === 'academic-info' || activeTab === 'topics' || activeTab === 'preferences') && (
            <div className="text-center mt-6 pt-6 pb-12">
              {/* Next Button - Only for Personal Info tab */}
              {/* {activeTab === 'personal-info' && (
                <button className="px-12 py-3 rounded-[14px] text-white text-[16px] font-medium mb-8" style={{ backgroundColor: '#FF4C7D' }}>Next</button>
              )} */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-[#3E3232] mt-4">
                <a href="#" className="hover:underline">ISI Website</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Ethics Policy</a>
                <a href="#" className="hover:underline">Legal Disclaimer</a>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default ProfileEditPage;
