import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

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
                className={`px-4 py-2 text-sm font-medium rounded-[12px] transition-colors ${
                  activeTab === tab.id
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
                  className={`flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab.id
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
        {activeTab === 'personal-info' && (
          <div className="bg-white">
            <form className="space-y-6">
              {/* Personal Details Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Personal Title</label>
                    <input
                      type="text"
                      name="personalTitle"
                      value={formData.personalTitle}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Gender</label>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="newsletterOptOut"
                    checked={formData.newsletterOptOut}
                    onChange={handleInputChange}
                    className="accent-[#295F9A]"
                  />
                  I'd like to opt out of the infrequent newsletter.
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Personal Name</label>
                    <input
                      type="text"
                      name="personalName"
                      value={formData.personalName}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Middle Initial</label>
                    <input
                      type="text"
                      name="middleInitial"
                      value={formData.middleInitial}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Family Name</label>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Photo</label>
                <div className="p-8 rounded-[12px] " style={{ backgroundColor: '#F5F5F5' }}>
                    <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-8">
                        <div className="flex items-center justify-center">
                            <svg width="120" height="96" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.5 22.5C45.375 22.5 49.5 26.625 49.5 31.5C49.5 36.5625 45.375 40.5 40.5 40.5C35.4375 40.5 31.5 36.5625 31.5 31.5C31.5 26.625 35.4375 22.5 40.5 22.5ZM95.8125 6C102.562 6 107.812 11.4375 107.812 18V78C107.812 84.75 102.375 90 95.8125 90H23.8125C17.25 90 11.8125 84.75 11.8125 78V18C11.8125 11.4375 17.25 6 23.8125 6H95.8125ZM98.8125 76.875V18C98.8125 16.5 97.5 15 95.8125 15H23.8125C22.3125 15 20.8125 16.5 20.8125 18L21 78L35.0625 60.375C35.8125 59.625 36.75 59.0625 37.875 59.0625C39 59.0625 39.9375 59.625 40.6875 60.375L47.625 69L67.5 42C68.25 41.0625 69.1875 40.5 70.5 40.5C71.625 40.5 72.5625 41.0625 73.125 42L98.8125 76.875Z" fill="#3E3232" fillOpacity="0.25"/>
                            </svg>
                            <div className="flex flex-col items-center">
                            <p className="text-sm text-[#3E3232]/75 mb-2">Recommended Size: 100 X 100px</p>
                            <button
                                type="button"
                                className="px-4 py-2 border border-[#E6E6E6] rounded-[12px] text-sm font-medium text-[#3E3232] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#295F9A]"
                            >
                                + Select
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border-0 px-3"
                    style={{ backgroundColor: '#F5F5F5' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">State/Province</label>
                    <input
                      type="text"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Country</label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-md border-0 px-3 pr-8 appearance-none"
                        style={{ backgroundColor: '#F5F5F5' }}
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 6.25C5.75391 6.25 5.53516 6.16797 5.37109 6.00391L0.996094 1.62891C0.640625 1.30078 0.640625 0.726562 0.996094 0.398438C1.32422 0.0429688 1.89844 0.0429688 2.22656 0.398438L6 4.14453L9.74609 0.398437C10.0742 0.0429687 10.6484 0.0429687 10.9766 0.398437C11.332 0.726562 11.332 1.30078 10.9766 1.62891L6.60156 6.00391C6.4375 6.16797 6.21875 6.25 6 6.25Z" fill="#3E3232" fillOpacity="0.5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Office Phone Number</label>
                    <div className="relative">
                      <select
                        name="officePhone"
                        value={formData.officePhone}
                        onChange={handleInputChange}
                        className="w-full h-10 rounded-md border-0 px-3 pr-8 appearance-none"
                        style={{ backgroundColor: '#F5F5F5' }}
                      >
                        <option value="">Select</option>
                        <option value="+1">+1 (US/CA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (AU)</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 6.25C5.75391 6.25 5.53516 6.16797 5.37109 6.00391L0.996094 1.62891C0.640625 1.30078 0.640625 0.726562 0.996094 0.398438C1.32422 0.0429688 1.89844 0.0429688 2.22656 0.398438L6 4.14453L9.74609 0.398437C10.0742 0.0429687 10.6484 0.0429687 10.9766 0.398437C11.332 0.726562 11.332 1.30078 10.9766 1.62891L6.60156 6.00391C6.4375 6.16797 6.21875 6.25 6 6.25Z" fill="#3E3232" fillOpacity="0.5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Personal Phone Number</label>
                    <input
                      type="text"
                      name="personalPhone"
                      value={formData.personalPhone}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* Account Info Tab Content */}
        {activeTab === 'account-info' && (
          <div className="bg-white">
            <form className="space-y-6">
              {/* Top Row - Primary Email, Secondary Email, Change Password */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Primary Email Section */}
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Primary Email</label>
                  <input
                    type="email"
                    name="primaryEmail"
                    value={formData.primaryEmail}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border-0 px-3"
                    style={{ backgroundColor: '#F5F5F5' }}
                  />
                  <label className="flex items-center gap-2 text-sm mt-2">
                    <input
                      type="checkbox"
                      name="receivePrimaryEmails"
                      checked={formData.receivePrimaryEmails}
                      onChange={handleInputChange}
                      className="accent-[#295F9A]"
                    />
                    Receive emails at this address
                  </label>
                </div>

                {/* Secondary Email Section */}
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Secondary Email</label>
                  <input
                    type="email"
                    name="secondaryEmail"
                    value={formData.secondaryEmail}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border-0 px-3"
                    style={{ backgroundColor: '#F5F5F5' }}
                  />
                  <label className="flex items-center gap-2 text-sm mt-2">
                    <input
                      type="checkbox"
                      name="receiveSecondaryEmails"
                      checked={formData.receiveSecondaryEmails}
                      onChange={handleInputChange}
                      className="accent-[#295F9A]"
                    />
                    Receive emails at this address
                  </label>
                </div>

                {/* Change Password Section */}
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Change My Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border-0 px-3"
                    style={{ backgroundColor: '#F5F5F5' }}
                  />
                </div>
              </div>

              {/* Bottom Row - Confirm Password, Member Until */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Confirm Password Section */}
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Type Your New Password Again</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border-0 px-3"
                    style={{ backgroundColor: '#F5F5F5' }}
                  />
                </div>

                {/* Member Until Section */}
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">
                    Member Until <span className="text-xs text-[#3E3232] font-normal">(Become An ISI Member To Receive Access To Additional Features. <span className="text-[#295F9A] hover:underline cursor-pointer">View Options</span>)</span>
                  </label>
                  <input
                    type="text"
                    name="memberUntil"
                    value={formData.memberUntil}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border-0 px-3"
                    style={{ backgroundColor: '#F5F5F5' }}
                  />
                </div>
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-center gap-4 pt-8">
                <button
                  type="button"
                  className="px-16 py-3 rounded-[14px] text-white text-[16px] font-medium"
                  style={{ backgroundColor: '#FF4C7D' }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-16 py-3 rounded-[14px] text-[#3E3232] text-[16px] font-medium  bg-[#F5F5F5] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Academic Info Tab Content */}
        {activeTab === 'academic-info' && (
          <div className="bg-white">
            <form className="space-y-6">
              {/* Form with Specific Widths */}
              <div className="space-y-6">
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* Affiliation/University */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Affiliation/University</label>
                    <input
                      type="text"
                      name="affiliation"
                      value={formData.affiliation}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* Department */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* Position Title */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Position Title</label>
                    <input
                      type="text"
                      name="positionTitle"
                      value={formData.positionTitle}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* ORCID */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">ORCID</label>
                    <input
                      type="text"
                      name="orcid"
                      value={formData.orcid}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>
                {/* Address */}
                <div>
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Address</label>
                    <input
                      type="text"
                      name="academicAddress"
                      value={formData.academicAddress}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                {/* Third Row */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                   {/* City */}
                   <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">City</label>
                    <input
                      type="text"
                      name="academicCity"
                      value={formData.academicCity}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* State/Province */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">State/Province</label>
                    <input
                      type="text"
                      name="academicStateProvince"
                      value={formData.academicStateProvince}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                 
                </div>

                {/* Fourth Row */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  {/* Country */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Country</label>
                    <input
                      type="text"
                      name="academicCountry"
                      value={formData.academicCountry}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Postal Code</label>
                    <input
                      type="text"
                      name="academicPostalCode"
                      value={formData.academicPostalCode}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>

                

                {/* CV/Résumé Upload Section */}
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">CV/Résumé (required *)</label>
                  <div className="w-full  rounded-[12px] p-8 text-center" style={{ backgroundColor: '#F5F5F5' }}>
                    <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-8">
                        <p className="text-sm text-[#3E3232] mb-4">Recommended PDF Or Word (Max Size 2MB)</p>
                        <button
                        type="button"
                        className="px-4 py-2 border border-[#E6E6E6] rounded-[12px] text-sm font-medium text-[#3E3232] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#295F9A]"
                        >
                        + Select
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Bio Summary - Full Width */}
              <div>
                <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Short Bio Summary (Will Show In Peer Directory)</label>
                <textarea
                  name="shortBio"
                  value={formData.shortBio}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full rounded-md border-0 px-4 py-4"
                  style={{ backgroundColor: '#F5F5F5' }}
                />
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-center gap-4 pt-8">
                <button
                  type="button"
                  className="px-16 py-3 rounded-[14px] text-white text-[16px] font-medium"
                  style={{ backgroundColor: '#FF4C7D' }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-16 py-3 rounded-[14px] text-[#3E3232] text-[16px] font-medium bg-[#F5F5F5] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Topics Tab Content */}
        {activeTab === 'topics' && (
          <div className="bg-white">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Column - Topic Selection */}
              <div className="flex-1">
                {/* Fields/Specializations Section */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between p-3 sm:p-4 cursor-pointer rounded-[12px]"
                    onClick={() => toggleSection('fields-specializations')}
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <h3 className="text-xs sm:text-sm font-semibold text-[#3E3232]">Fields/Specializations <span className="text-xs font-normal">(At Least 2)</span></h3>
                    <span className="text-base sm:text-lg text-[#3E3232]">
                      {expandedSections['fields-specializations'] ? '−' : '+'}
                    </span>
                  </div>
                  
                  {expandedSections['fields-specializations'] && (
                    <div className="p-3 sm:p-4 rounded-b-[12px]" style={{ backgroundColor: '#F5F5F5' }}>
                      <div className="space-y-2 sm:space-y-3">
                        {[
                          'Applied Psychology',
                          'Artificial Intelligence (AI) and application',
                          'Deep/Machine Learning & Data Science',
                          'Technology/Computer Science Issue',
                          'Library / Information Science',
                          'Art, Design, Architecture, Fine Arts, History',
                          'Business/Commerce/Organizational Issue',
                          'Linguistics/Rhetoric/Communications',
                          'Journalism/Public Relations',
                          'Expressive Arts (Music, Dance, and so on)',
                          'Psychology/Sociology / Brain Science/ HCI / Usability Issues',
                          'Medical / Health / Biological issues',
                          'Justice/Legal Issue',
                          'Public/Government/Community Issues/Politics',
                          'Engineering, Cybernetics, Systemics'
                        ].map((topic) => (
                          <label key={topic} className="flex items-start sm:items-center space-x-2 sm:space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedTopics.includes(topic)}
                              onChange={(e) => handleTopicChange(topic, e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded focus:ring-[#295F9A] mt-0.5 sm:mt-0 flex-shrink-0"
                              style={{ 
                                accentColor: '#3E3232',
                                backgroundColor: selectedTopics.includes(topic) ? '#3E3232' : 'white'
                              }}
                            />
                            <span className="text-xs sm:text-sm text-[#3E3232] leading-relaxed">{topic}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Sign Up Section */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                    onClick={() => toggleSection('special-signup')}
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <h3 className="text-sm font-semibold text-[#3E3232]">Special Sign Up <span className="text-xs font-normal">(Select If Signing Up For Special Series Or Track)</span></h3>
                    <span className="text-lg text-[#3E3232]">
                      {expandedSections['special-signup'] ? '−' : '+'}
                    </span>
                  </div>
                  
                  {expandedSections['special-signup'] && (
                    <div className="p-4 rounded-b-[12px]" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="text-sm text-[#3E3232]">Special sign up options will appear here.</p>
                    </div>
                  )}
                </div>

                {/* General Lines Of Inquiry Section */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                    onClick={() => toggleSection('general-inquiry')}
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <h3 className="text-sm font-semibold text-[#3E3232]">General Lines Of Inquiry <span className="text-xs font-normal">(At Least 4)</span></h3>
                    <span className="text-lg text-[#3E3232]">
                      {expandedSections['general-inquiry'] ? '−' : '+'}
                    </span>
                  </div>
                  
                  {expandedSections['general-inquiry'] && (
                    <div className="p-4 rounded-b-[12px]" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="text-sm text-[#3E3232]">General inquiry options will appear here.</p>
                    </div>
                  )}
                </div>

                {/* Research Topics Section */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                    onClick={() => toggleSection('research-topics')}
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <h3 className="text-sm font-semibold text-[#3E3232]">Research Topics - Specific <span className="text-xs font-normal">(At Least 6)</span></h3>
                    <span className="text-lg text-[#3E3232]">
                      {expandedSections['research-topics'] ? '−' : '+'}
                    </span>
                  </div>
                  
                  {expandedSections['research-topics'] && (
                    <div className="p-4 rounded-b-[12px]" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="text-sm text-[#3E3232]">Research topic options will appear here.</p>
                    </div>
                  )}
                </div>

                {/* Type Of Research Method Section */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                    onClick={() => toggleSection('research-method')}
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <h3 className="text-sm font-semibold text-[#3E3232]">Type Of Research Method <span className="text-xs font-normal">(At Least 2)</span></h3>
                    <span className="text-lg text-[#3E3232]">
                      {expandedSections['research-method'] ? '−' : '+'}
                    </span>
                  </div>
                  
                  {expandedSections['research-method'] && (
                    <div className="p-4 rounded-b-[12px]" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="text-sm text-[#3E3232]">Research method options will appear here.</p>
                    </div>
                  )}
                </div>

                {/* ISI Member Available For Co-Authorship Section */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer rounded-[12px]"
                    onClick={() => toggleSection('co-authorship')}
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <h3 className="text-sm font-semibold text-[#3E3232]">ISI Member Available For Co-Authorship</h3>
                    <span className="text-lg text-[#3E3232]">
                      {expandedSections['co-authorship'] ? '−' : '+'}
                    </span>
                  </div>
                  
                  {expandedSections['co-authorship'] && (
                    <div className="p-4 rounded-b-[12px]" style={{ backgroundColor: '#F5F5F5' }}>
                      <p className="text-sm text-[#3E3232]">Co-authorship options will appear here.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Selected Topics */}
              <div className="w-full lg:w-80">
                <div className="border-2 border-dashed border-gray-300 rounded-[12px] p-4" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex items-center mb-4 ">                 
                    <h3 className="text-lg font-semibold text-[#3E3232] flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    Selected Topics
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedTopics.map((topic) => (
                      <div key={topic} className="text-sm font-medium text-[#3E3232] p-3 rounded-[8px]" style={{ backgroundColor: '#F5F5F5' }}>
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-center gap-4 pt-8">
              <button
                type="button"
                className="px-16 py-3 rounded-[14px] text-white text-[16px] font-medium"
                style={{ backgroundColor: '#FF4C7D' }}
              >
                Save
              </button>
              <button
                type="button"
                className="px-16 py-3 rounded-[14px] text-[#3E3232] text-[16px] font-medium bg-[#F5F5F5] hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Preferences Tab Content */}
        {activeTab === 'preferences' && (
          <div className="bg-white">
            <div className="space-y-8">
              {/* Privacy and Notification Settings */}
              <div className="space-y-6">
                {/* Prevent showing CV link */}
                <div>
                  <a href="#" className="text-[#4282C8] hover:underline">
                    Prevent showing my CV and email address to ISI members.
                  </a>
                </div>

                {/* Checkbox Options */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 max-w-[1030px] w-full">
                  {/* Unsubscribe from newsletters */}
                  <div className="flex-1">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferencesData.unsubscribeNewsletters}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, unsubscribeNewsletters: e.target.checked }))}
                        className="w-4 h-4 border-gray-300 rounded focus:ring-[#295F9A] mt-1 flex-shrink-0"
                        style={{ 
                          accentColor: '#3E3232',
                          backgroundColor: preferencesData.unsubscribeNewsletters ? '#3E3232' : 'white'
                        }}
                      />
                      <div>
                        <span className="text-sm text-[#3E3232]">Unsubscribe from ISI newsletters and notifications.</span>
                        <p className="text-xs text-gray-500 mt-1">(To stop receiving all emails change your settings in your Account Info)</p>
                      </div>
                    </label>
                  </div>

                  {/* Allow basic profile */}
                  <div className="flex-1">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferencesData.allowBasicProfile}
                        onChange={(e) => setPreferencesData(prev => ({ ...prev, allowBasicProfile: e.target.checked }))}
                        className="w-4 h-4 border-gray-300 rounded focus:ring-[#295F9A] mt-1 flex-shrink-0"
                        style={{ 
                          accentColor: '#3E3232',
                          backgroundColor: preferencesData.allowBasicProfile ? '#3E3232' : 'white'
                        }}
                      />
                      <div>
                        <span className="text-sm text-[#3E3232]">Allow basic profile information to be shown on ISI website.</span>
                        <p className="text-xs text-gray-500 mt-1">(Applies to ISI Members only. Your CV and email address will not be shown.)</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Social Media and Website URLs */}
              <div className="space-y-6">
                {/* First Row - Three Fields */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Your Website URL */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Your Website URL</label>
                    <input
                      type="text"
                      value={preferencesData.websiteURL}
                      onChange={(e) => setPreferencesData(prev => ({ ...prev, websiteURL: e.target.value }))}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* X (Twitter) URL */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">X (Twitter) URL</label>
                    <input
                      type="text"
                      value={preferencesData.twitterURL}
                      onChange={(e) => setPreferencesData(prev => ({ ...prev, twitterURL: e.target.value }))}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* Facebook URL */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Facebook URL</label>
                    <input
                      type="text"
                      value={preferencesData.facebookURL}
                      onChange={(e) => setPreferencesData(prev => ({ ...prev, facebookURL: e.target.value }))}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>

                {/* Second Row - Two Fields */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Google+ URL */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Google+ URL</label>
                    <input
                      type="text"
                      value={preferencesData.googlePlusURL}
                      onChange={(e) => setPreferencesData(prev => ({ ...prev, googlePlusURL: e.target.value }))}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="flex-1">
                    <label className="block text-xs text-[#3E3232] mb-3 font-semibold">LinkedIn URL</label>
                    <input
                      type="text"
                      value={preferencesData.linkedinURL}
                      onChange={(e) => setPreferencesData(prev => ({ ...prev, linkedinURL: e.target.value }))}
                      className="w-full h-12 rounded-md border-0 px-4"
                      style={{ backgroundColor: '#F5F5F5' }}
                    />
                  </div>
                </div>
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-center gap-4 pt-8">
                <button
                  type="button"
                  className="px-16 py-3 rounded-[14px] text-white text-[16px] font-medium"
                  style={{ backgroundColor: '#FF4C7D' }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-16 py-3 rounded-[14px] text-[#3E3232] text-[16px] font-medium bg-[#F5F5F5] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
            {activeTab === 'personal-info' && (
              <button className="px-12 py-3 rounded-[14px] text-white text-[16px] font-medium mb-8" style={{ backgroundColor: '#FF4C7D' }}>Next</button>
            )}
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
