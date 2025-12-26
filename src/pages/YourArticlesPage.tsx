import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';

const YourArticlesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingArticles = [
    {
      id: 1,
      title: "Chakra Soft UI Version",
      details: "InformingSciJ • PID 12665",
      dateCreated: "Jul 29",
      expectResponseBy: "N/A",
      status: "Awaiting Author Submission"
    },
    {
      id: 2,
      title: "Chakra Soft UI Version",
      details: "InformingSciJ • PID 12665",
      dateCreated: "Jul 29",
      expectResponseBy: "N/A",
      status: "Awaiting Author Submission"
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
                  Your Articles
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">View The Articles You Have Authored</p>
              </div>

              {/* Pending Section */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-sm sm:text-md font-bold text-gray-900 mb-3 sm:mb-4">Pending</h2>
                
                {/* Desktop Table */}
                <div className="hidden lg:block bg-white overflow-x-auto">
                  {/* Table Header */}
                  <div className="bg-white border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-2 lg:gap-4 p-3 lg:p-4 text-[12px] font-medium text-[#A0AEC0] min-w-[800px]">
                      <div className="col-span-4 text-[#A0AEC0]">Title</div>
                      <div className="col-span-2 text-[#A0AEC0]">Date Created</div>
                      <div className="col-span-2 text-[#A0AEC0]">Expect Response By</div>
                      <div className="col-span-3 text-[#A0AEC0]">Status</div>
                      <div className="col-span-1 text-[#A0AEC0]"></div>
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="">
                    {pendingArticles.map((article) => (
                      <div key={article.id} className="grid grid-cols-12 gap-2 lg:gap-4 p-3 lg:p-4 text-sm items-center border-b border-gray-200 min-w-[800px]">
                        <div className="col-span-4">
                          <div className="font-bold text-gray-900 text-[14px] break-words">{article.title}</div>
                          <div className="text-gray-500 text-[12px] mt-1 break-words">{article.details}</div>
                        </div>
                        <div className="col-span-2 text-gray-900 font-bold whitespace-nowrap">{article.dateCreated}</div>
                        <div className="col-span-2 text-gray-900 font-bold whitespace-nowrap">{article.expectResponseBy}</div>
                        <div className="col-span-3 text-gray-900 font-bold flex items-center justify-between">
                          <span className="break-words">{article.status}</span>
                          <button className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.49967 15.4167C1.49967 16.425 2.32467 17.25 3.33301 17.25H10.6663C11.6747 17.25 12.4997 16.425 12.4997 15.4167V6.25C12.4997 5.24167 11.6747 4.41667 10.6663 4.41667H3.33301C2.32467 4.41667 1.49967 5.24167 1.49967 6.25V15.4167ZM12.4997 1.66667H10.208L9.55717 1.01583C9.39217 0.850833 9.15384 0.75 8.91551 0.75H5.08384C4.84551 0.75 4.60717 0.850833 4.44217 1.01583L3.79134 1.66667H1.49967C0.995508 1.66667 0.583008 2.07917 0.583008 2.58333C0.583008 3.0875 0.995508 3.5 1.49967 3.5H12.4997C13.0038 3.5 13.4163 3.0875 13.4163 2.58333C13.4163 2.07917 13.0038 1.66667 12.4997 1.66667Z" fill="#E53E3E"/>
                            </svg>
                          </button>
                        </div>
                        <div className="col-span-1"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tablet Table */}
                <div className="hidden md:block lg:hidden bg-white overflow-x-auto">
                  {/* Table Header */}
                  <div className="bg-white border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-2 p-3 text-[11px] font-medium text-[#A0AEC0] min-w-[700px]">
                      <div className="col-span-5 text-[#A0AEC0]">Title</div>
                      <div className="col-span-2 text-[#A0AEC0]">Date</div>
                      <div className="col-span-2 text-[#A0AEC0]">Response</div>
                      <div className="col-span-2 text-[#A0AEC0]">Status</div>
                      <div className="col-span-1 text-[#A0AEC0]"></div>
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="">
                    {pendingArticles.map((article) => (
                      <div key={article.id} className="grid grid-cols-12 gap-2 p-3 text-xs items-center border-b border-gray-200 min-w-[700px]">
                        <div className="col-span-5">
                          <div className="font-bold text-gray-900 text-[13px] break-words">{article.title}</div>
                          <div className="text-gray-500 text-[11px] mt-1 break-words">{article.details}</div>
                        </div>
                        <div className="col-span-2 text-gray-900 font-bold whitespace-nowrap">{article.dateCreated}</div>
                        <div className="col-span-2 text-gray-900 font-bold whitespace-nowrap">{article.expectResponseBy}</div>
                        <div className="col-span-2 text-gray-900 font-bold flex items-center justify-between">
                          <span className="break-words text-[11px]">{article.status}</span>
                          <button className="text-red-500 hover:text-red-700 ml-1 flex-shrink-0">
                            <svg width="12" height="16" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.49967 15.4167C1.49967 16.425 2.32467 17.25 3.33301 17.25H10.6663C11.6747 17.25 12.4997 16.425 12.4997 15.4167V6.25C12.4997 5.24167 11.6747 4.41667 10.6663 4.41667H3.33301C2.32467 4.41667 1.49967 5.24167 1.49967 6.25V15.4167ZM12.4997 1.66667H10.208L9.55717 1.01583C9.39217 0.850833 9.15384 0.75 8.91551 0.75H5.08384C4.84551 0.75 4.60717 0.850833 4.44217 1.01583L3.79134 1.66667H1.49967C0.995508 1.66667 0.583008 2.07917 0.583008 2.58333C0.583008 3.0875 0.995508 3.5 1.49967 3.5H12.4997C13.0038 3.5 13.4163 3.0875 13.4163 2.58333C13.4163 2.07917 13.0038 1.66667 12.4997 1.66667Z" fill="#E53E3E"/>
                            </svg>
                          </button>
                        </div>
                        <div className="col-span-1"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {pendingArticles.map((article) => (
                    <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-2">
                          <div className="font-bold text-gray-900 text-sm break-words">{article.title}</div>
                          <div className="text-gray-500 text-xs mt-1 break-words">{article.details}</div>
                        </div>
                        <button className="text-red-500 hover:text-red-700 flex-shrink-0">
                          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.49967 15.4167C1.49967 16.425 2.32467 17.25 3.33301 17.25H10.6663C11.6747 17.25 12.4997 16.425 12.4997 15.4167V6.25C12.4997 5.24167 11.6747 4.41667 10.6663 4.41667H3.33301C2.32467 4.41667 1.49967 5.24167 1.49967 6.25V15.4167ZM12.4997 1.66667H10.208L9.55717 1.01583C9.39217 0.850833 9.15384 0.75 8.91551 0.75H5.08384C4.84551 0.75 4.60717 0.850833 4.44217 1.01583L3.79134 1.66667H1.49967C0.995508 1.66667 0.583008 2.07917 0.583008 2.58333C0.583008 3.0875 0.995508 3.5 1.49967 3.5H12.4997C13.0038 3.5 13.4163 3.0875 13.4163 2.58333C13.4163 2.07917 13.0038 1.66667 12.4997 1.66667Z" fill="#E53E3E"/>
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <div className="text-[#A0AEC0] font-medium text-[10px]">Date Created</div>
                          <div className="text-gray-900 font-bold text-sm">{article.dateCreated}</div>
                        </div>
                        <div>
                          <div className="text-[#A0AEC0] font-medium text-[10px]">Expect Response By</div>
                          <div className="text-gray-900 font-bold text-sm">{article.expectResponseBy}</div>
                        </div>
                        <div>
                          <div className="text-[#A0AEC0] font-medium text-[10px]">Status</div>
                          <div className="text-gray-900 font-bold text-xs break-words">{article.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Section */}
              <div>
                <h2 className="text-sm sm:text-md font-bold text-gray-900 mb-3 sm:mb-4">Completed</h2>
                <div className="bg-white text-left p-4 sm:p-6 md:p-8">
                  <p className="text-gray-500 text-xs sm:text-sm">No Articles Found.</p>
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

export default YourArticlesPage;
