import React, { useState } from 'react';
import MemberHeader from '../components/MemberHeader';
import MemberSidebar from '../components/MemberSidebar';
import PublicFooter from '../components/PublicFooter';
import isiIcon from '../assets/images/isi-icon.png';

const MembershipOptionsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plan, setPlan] = React.useState<'1y-basic'|'1y-sponsor'|'5y-basic'|'5y-sponsor'|'life-basic'|'life-sponsor'>('1y-basic');

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
              {/* Breadcrumb */}
              <div className="mb-4">
                
                <h3 className="text-xl font-semibold text-[#3E3232] mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  MembershipOptions
                </h3>
              </div>
              <div className='bg-[#F5F5F5] p-8 rounded-[12px]'>
              {/* Page title */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-normal text-[#3E3232]">Select your membership:</h1>
              </div>

              {/* ISI Member Card */}
              <div className="max-w-[380px]">
                <div className="shadow-md overflow-hidden w-full flex flex-col bg-white">
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI Member</div>
                      <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                    </div>
                    
                    {/* Pricing table */}
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="text-left text-[#000] font-medium">
                            <th className="py-2 pr-3"></th>
                            <th className="py-2 pr-3 text-center">Basic</th>
                            <th className="py-2 pr-3 text-center">Sponsoring</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">1 Year</td>
                            <td className="py-2 pr-3 text-center">
                              <label className="inline-flex items-center gap-2">
                                <input 
                                  className="accent-[#295F9A]" 
                                  type="radio" 
                                  name="year1" 
                                  checked={plan==='1y-basic'} 
                                  onChange={() => setPlan('1y-basic')} 
                                /> 
                                $75 USD
                              </label>
                            </td>
                            <td className="py-2 pr-3 text-center">
                              <label className="inline-flex items-center gap-2">
                                <input 
                                  className="accent-[#295F9A]" 
                                  type="radio" 
                                  name="year1" 
                                  checked={plan==='1y-sponsor'} 
                                  onChange={() => setPlan('1y-sponsor')} 
                                /> 
                                $125 USD
                              </label>
                            </td>
                          </tr>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">5 Year</td>
                            <td className="py-2 pr-3 text-center">
                              <label className="inline-flex items-center gap-2">
                                <input 
                                  className="accent-[#295F9A]" 
                                  type="radio" 
                                  name="year5" 
                                  checked={plan==='5y-basic'} 
                                  onChange={() => setPlan('5y-basic')} 
                                /> 
                                $300 USD
                              </label>
                            </td>
                            <td className="py-2 pr-3 text-center">
                              <label className="inline-flex items-center gap-2">
                                <input 
                                  className="accent-[#295F9A]" 
                                  type="radio" 
                                  name="year5" 
                                  checked={plan==='5y-sponsor'} 
                                  onChange={() => setPlan('5y-sponsor')} 
                                /> 
                                $500 USD
                              </label>
                            </td>
                          </tr>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">Life</td>
                            <td className="py-2 pr-3 text-center">
                              <label className="inline-flex items-center gap-2">
                                <input 
                                  className="accent-[#295F9A]" 
                                  type="radio" 
                                  name="life" 
                                  checked={plan==='life-basic'} 
                                  onChange={() => setPlan('life-basic')} 
                                /> 
                                $1000 USD
                              </label>
                            </td>
                            <td className="py-2 pr-3 text-center">
                              <label className="inline-flex items-center gap-2">
                                <input 
                                  className="accent-[#295F9A]" 
                                  type="radio" 
                                  name="life" 
                                  checked={plan==='life-sponsor'} 
                                  onChange={() => setPlan('life-sponsor')} 
                                /> 
                                $5000 USD
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Members receive access to the following benefits:</div>
                    <ul className="my-4 space-y-4 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                      {['Article Submission','Article Review','Personalized Dashboard','Member Directory','Academic Profile Matching','Personalized Notifications','Reviewer Certificate','Discounts','No Article Publication Fee'].map(i=> (
                        <li key={i} className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="16" height="16" rx="8" fill="#295F9A"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/>
                          </svg>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-[#295F9A] mt-auto">
                    <button className="w-full h-11 text-white font-medium">Proceed to Payment</button>
                  </div>
                </div>
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

export default MembershipOptionsPage;
