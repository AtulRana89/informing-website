import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';

const NotificationsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "InSITE conference 2023 (Virtual) - Call for Papers and REVIEWERS",
      date: "Jul 29, 2025"
    },
    {
      id: 2,
      title: "InSITE conference 2023 (Virtual) - Call for Papers and REVIEWERS",
      date: "Jul 29, 2025"
    },
    {
      id: 3,
      title: "InSITE conference 2022 (Virtual) - Call for Papers and REVIEWERS",
      date: "Jul 29, 2025"
    },
    {
      id: 4,
      title: "Donate to the Informing Science Institute (a 501(c)3 charitable association)",
      date: "Jul 29, 2025"
    },
    {
      id: 5,
      title: "Call for Papers: Fake News: Perspectives across disciplines",
      date: "Jul 29, 2025"
    }
  ];

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
                  Notifications
                </h3>
              </div>

              {/* Main Content Card */}
              <div className="bg-[#f5f5f5] rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                {/* Section Heading */}
                <h2 className="text-base md:text-lg font-medium text-[#3E3232] mb-3 md:mb-4 flex items-center">
                  Important ISI News And Announcements
                </h2>

                {/* Notifications List */}
                <div className="space-y-3 md:space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={notification.id} className="bg-white rounded-[12px] p-3 md:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-xs md:text-sm line-clamp-2 mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {notification.date}
                          </p>
                        </div>
                        <button className="w-full sm:w-auto sm:min-w-[120px] bg-[#FF4C7D] text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-xl font-normal hover:opacity-90 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0">
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default NotificationsPage;
