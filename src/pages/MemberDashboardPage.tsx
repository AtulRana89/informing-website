import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';

const MemberDashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "InSITE conference 2023 (Virtual) - Call for Papers and REVIEWERS",
      date: "Jul 29, 2005"
    },
    {
      id: 2,
      title: "InSITE conference 2023 (Virtual) - Call for Papers and REVIEWERS",
      date: "Jul 29, 2005"
    },
    {
      id: 3,
      title: "InSITE conference 2022 (Virtual) - Call for Papers and REVIEWERS",
      date: "Jul 29, 2005"
    },
    {
      id: 4,
      title: "Donate to the Informing Science Institute (a 501(c)3 charitable association)",
      date: "Jul 29, 2005"
    },
    {
      id: 5,
      title: "Call for Papers: Fake News: Perspectives across disciplines",
      date: "Jul 29, 2005"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MemberHeader />
      
      <div className="max-w-[1460px]  w-[90%]  mx-auto py-4 md:py-8 px-2">
        <div className="flex">
          <MemberSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 md:p-6">
            {/* Page title */}
            <div className="mb-4">
              <div className="bg-[#f5f5f5] rounded-lg px-4 py-3">
               
                <h3 className="text-xl font-semibold text-[#3E3232] mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Dashboard
                </h3>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
              {/* Left column - Main content */}
              <div className="xl:col-span-2 space-y-4 md:space-y-6">
                {/* Pending Articles */}
                <div className="bg-[#f5f5f5] rounded-[12px] shadow-md p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    Pending Articles
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">Awaiting Author Submission</p>
                  <div className="flex items-center justify-between p-3 md:p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">InformingSciJ</h3>
                      <p className="text-xs md:text-sm text-gray-600">Jul 29, 2025</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Pending Review Tasks */}
                <div className="bg-[#f5f5f5] rounded-[12px] shadow-md p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    Pending Review Tasks
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">You Are Not Currently A Reviewer For Any ISI Journals Or Conferences.</p>
                  <div className="flex items-center justify-between p-3 md:p-4 bg-white rounded-lg shadow-sm">
                    <a href="#" className="text-gray-800 underline hover:text-gray-600 text-sm md:text-base flex-1 min-w-0">
                      Apply to become a Reviewer
                    </a>
                    <button className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-[#f5f5f5] rounded-[12px] shadow-md p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    Notifications
                  </h2>
                  <div className="space-y-2 md:space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-3 md:p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-xs md:text-sm line-clamp-2">{notification.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{notification.date}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0">
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Sidebar content */}
              <div className="space-y-4 md:space-y-6">
                {/* ISI Membership */}
                <div className="bg-[#f5f5f5] rounded-[12px] shadow-md p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    ISI Membership
                  </h2>
                  <p className="text-[#3E3232] text-xs md:text-sm mb-3 md:mb-4">Become An ISI Member And Receive Access To Additional Features</p>
                  <button className="w-full bg-[#FF4C7D] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-normal hover:opacity-90 transition-colors mt-2 md:mt-3 mb-2 md:mb-4 max-w-[186px] text-sm md:text-base">
                    Learn More
                  </button>
                </div>

                {/* Your Stats */}
                <div className="bg-[#f5f5f5] rounded-[12px] shadow-md p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    Your Stats
                  </h2>
                   <div className='flex justify-between'>
                     <p className="text-[#3E3232] text-xs md:text-sm">Total Articles Submitted:</p>
                    <p className="text-[#3E3232] text-xs md:text-sm">0</p>
                   </div>
                </div>

                {/* Quick Links */}
                <div className="bg-[#f5f5f5] rounded-[12px] shadow-md p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                    <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                    Quick Links
                  </h2>
                  <a href="#" className="text-[#4282C8] hover:text-[#295F9A] transition-colors text-xs md:text-sm">
                    How To Write A Good Paper
                  </a>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default MemberDashboardPage;
