import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';

const PeerDirectoryPage: React.FC = () => {
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
                  Peer Directory
                </h3>
              </div>

              {/* Main Content Box */}
              <div className="bg-[#f5f5f5] rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                {/* Section Heading */}
                <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-2 md:mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Search ISI Profiles To Find People With Similar Research Interests As Yours
                </h2>

                {/* Description */}
                <p className="text-[#3E3232] text-xs md:text-sm mb-3 md:mb-4">
                  This Feature Is Available To ISI Members. You Currently Are An Associate, Not A Member. Click Below To Upgrade Your Account To An ISI Member.
                </p>

                {/* Button */}
                <button className="bg-[#FF4C7D] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-normal hover:opacity-90 transition-colors text-sm md:text-base">
                  Become Member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default PeerDirectoryPage;
