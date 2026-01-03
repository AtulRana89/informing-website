import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';

const YourReviewsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [activeView, setActiveView] = useState('list');

  return (
    <div className="min-h-screen bg-white">
      <MemberHeader />
      
      <div className="max-w-[1460px]  w-[90%]  mx-auto py-2 sm:py-4 md:py-8 px-2">
        <div className="flex">
          <MemberSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden p-2 sm:p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="p-2 sm:p-4 md:p-6">
              {/* Page title */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-xl font-semibold text-[#3E3232] mb-1 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Your Reviews
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  View And Manage The Articles You Are Reviewing. <a href="#" className="underline">Manage Your Reviewing Options</a>
                </p>
              </div>

              {/* Filters and Search */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Journal/Conferences Dropdown */}
                  <div className="flex-1">
                    <div className="relative">
                      <select className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#F5F5F5] rounded-lg text-xs sm:text-sm text-[#3E3232] appearance-none focus:outline-none">
                        <option>All Journal/Conferences</option>
                        <option>Journal 1</option>
                        <option>Journal 2</option>
                        <option>Conference 1</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search Everything"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#F5F5F5] rounded-lg text-xs sm:text-sm text-[#3E3232] focus:outline-none"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[22px] sm:h-[22px]">
                          <path d="M20.5312 18.3438C21.1172 18.9688 21.1172 19.9453 20.5312 20.5703C19.9062 21.1562 18.9297 21.1562 18.3047 20.5703L13.6562 15.8828C12.0547 16.9375 10.1016 17.4844 7.99219 17.2109C4.39844 16.7031 1.50781 13.7734 1.03906 10.2188C0.375 4.90625 4.86719 0.414062 10.1797 1.07812C13.7344 1.54688 16.6641 4.4375 17.1719 8.03125C17.4453 10.1406 16.8984 12.0938 15.8438 13.6562L20.5312 18.3438ZM4.08594 9.125C4.08594 11.8984 6.3125 14.125 9.08594 14.125C11.8203 14.125 14.0859 11.8984 14.0859 9.125C14.0859 6.39062 11.8203 4.125 9.08594 4.125C6.3125 4.125 4.08594 6.39062 4.08594 9.125Z" fill="#3E3232"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs and View Options */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Status Tabs */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => setActiveTab('pending')}
                      className={`w-full sm:w-[186px] px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
                        activeTab === 'pending'
                          ? 'bg-[#295F9A] text-white'
                          : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Pending (0)
                    </button>
                    <button
                      onClick={() => setActiveTab('completed')}
                      className={`w-full sm:w-[186px] px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
                        activeTab === 'completed'
                          ? 'bg-[#295F9A] text-white'
                          : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Completed (0)
                    </button>
                  </div>

                  {/* View Options */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => setActiveView('list')}
                      className={`w-full sm:w-[186px] px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
                        activeView === 'list'
                          ? 'bg-[#295F9A] text-white'
                          : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      List View
                    </button>
                    <button
                      onClick={() => setActiveView('calendar')}
                      className={`w-full sm:w-[186px] px-4 py-3 rounded-[12px] text-sm font-medium transition-colors ${
                        activeView === 'calendar'
                          ? 'bg-[#295F9A] text-white'
                          : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Calendar View
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 sm:p-6 md:p-8 text-left">
                <p className="text-gray-700 text-xs sm:text-sm">No Articles Found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default YourReviewsPage;
