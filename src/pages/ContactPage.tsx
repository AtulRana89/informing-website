import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const ContactPage: React.FC = () => {
  const [captcha, setCaptcha] = useState('7VJ7R1EE');
  const refresh = () => {
    // simple dummy refresh for screenshot parity
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let text = '';
    for (let i = 0; i < 8; i++) text += chars[Math.floor(Math.random() * chars.length)];
    setCaptcha(text);
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader onOpenMobile={() => {}} onOpenLogin={() => {}} />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6"><Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Contact Us</div>

          {/* Contact Form */}
          <div className="space-y-6 mt-[30px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Full Name</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Email</label>
                  <input type="email" className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Organization</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Message Type</label>
                <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1 w-full">
                <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Message</label>
                <div className="rounded-xl px-4 py-6" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                  <div className="rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                    <textarea className="w-full h-[350px] rounded-lg bg-transparent px-3 py-5 text-sm outline-none resize-none" placeholder="Type Your Feedback Here"></textarea>
                  </div>
                </div>
              </div>
              {/* Right: Captcha */}
                <div className="w-full md:w-[440px] flex-shrink-0">
                    <div className="rounded-xl p-6 h-full" >
                        <div className="text-xs text-[#3E3232] mb-3 font-semibold">Enter The Code Below</div>
                        <div className="rounded-2xl mb-6  p-6" style={{ backgroundColor: '#F5F5F5' }}>
                          <div className="rounded-2xl pt-3  bg-[#F5F5F5] border  border-dashed border-[#E1E1E1] mx-auto w-[440px] max-w-full  flex items-center justify-center flex-col">
                            <div className="font-mono tracking-widest text-[#295F9A] text-2xl sm:text-3xl select-none">{captcha}</div>
                            <div className="flex items-center justify-center mb-5">
                            <button onClick={refresh} className="px-8 py-3 rounded-xl border border-gray-300  text-[#3E3232] font-medium hover:shadow-sm mt-5">Refresh</button>
                            
                            </div>
                          </div>
                         
                       
                        <input className="w-full h-10 border border-[#E1E1E1] rounded-md  px-3 mt-5" style={{ backgroundColor: '#F5F5F5' }} placeholder="Enter code here" />
                        
                        </div>
                        <div className="flex justify-end mt-8">
                          <button className="flex items-center space-x-2 px-5 py-2 text-white rounded-lg" style={{ backgroundColor: '#FF4C7D' }}>
                            <span className="inline-flex items-center justify-center ">
                              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7012 0.886719C14.9199 1.02344 15.0293 1.26953 14.9473 1.51562L13.1973 13.3281C13.1699 13.5195 13.0605 13.7109 12.8691 13.793C12.7871 13.8477 12.6777 13.9023 12.5684 13.9023C12.459 13.9023 12.377 13.875 12.2949 13.8477L9.61523 12.6992L6.58008 14.668C6.4707 14.7227 6.33398 14.75 6.22461 14.75C6.14258 14.75 6.0332 14.7227 5.92383 14.6953C5.70508 14.5586 5.5957 14.3398 5.5957 14.0938V11.0039L1.38477 9.25391C1.16602 9.14453 1.00195 8.92578 1.00195 8.67969C0.974609 8.43359 1.11133 8.1875 1.33008 8.07812L14.0176 0.859375C14.2363 0.722656 14.5098 0.75 14.7012 0.886719ZM11.0918 4.03125L3.13477 8.54297L5.97852 9.74609L11.0918 4.03125ZM6.88086 12.8906L8.13867 12.0977L6.88086 11.5508V12.8906ZM12.0488 12.2891L13.3613 3.45703L7.23633 10.2656L12.0488 12.2891Z" fill="white"/>
                              </svg>
                            </span>
                            <span>Send</span>
                          </button>
                        </div>
                        
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ContactPage;


