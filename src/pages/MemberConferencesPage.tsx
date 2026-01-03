import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';

const MemberConferencesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                  Conferences
                </h3>
              </div>

              {/* Main Content Box */}
              <div className="bg-[#f5f5f5] rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                {/* Main Heading */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3E3232] mb-4 md:mb-6">
                  View Upcoming ISI Conferences Along With The Ones You Have Attended In The Past
                </h2>

                {/* Upcoming Conferences Section */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#3E3232] mb-3 md:mb-4">
                  Upcoming Conferences
                </h3>

                {/* Previous Conferences Section */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#3E3232] mb-3 md:mb-4">
                  Previous Conferences Attended
                </h3>

                {/* No Conferences Message */}
                <p className="text-sm sm:text-base text-gray-600">
                  No Recent Conferences Found (Conferences Prior To 2015 Are Not Included)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default MemberConferencesPage;
