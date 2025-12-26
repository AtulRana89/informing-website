import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-gray-200 ">
      <div className="">
        <div className="max-w-[1660px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:flex lg:flex-row lg:gap-16">
              <div className="xl:basis-[420px] lg:shrink-0">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-[4px] h-[10px] rounded-full mr-3" style={{ backgroundColor: '#FF4C7D' }}></div>
                  SEARCH PUBLICATIONS
                </h4>
                <div className="relative mb-6">
                  <input type="text" placeholder="Enter Keywords" className="w-full pl-4 pr-12 h-10 rounded-[12px] bg-white shadow-sm border-0 focus:outline-none text-sm" />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 inline-flex items-center justify-center h-7 w-8 rounded-md  pointer-events-none shadow">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.125 0.734131C19.1406 0.734131 20 1.59351 20 2.60913C20 3.23413 19.6875 3.78101 19.2188 4.13257L10.7422 10.4998C10.2734 10.8513 9.6875 10.8513 9.21875 10.4998L0.742188 4.13257C0.273438 3.78101 0 3.23413 0 2.60913C0 1.59351 0.820312 0.734131 1.875 0.734131H18.125ZM8.47656 11.5154C9.375 12.1794 10.5859 12.1794 11.4844 11.5154L20 5.10913V13.2341C20 14.6404 18.8672 15.7341 17.5 15.7341H2.5C1.09375 15.7341 0 14.6404 0 13.2341V5.10913L8.47656 11.5154Z" fill="#3E3232" fillOpacity="0.75"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={logo} alt="Informing Science Institute" className="w-full max-w-[301px] filter drop-shadow-lg" />
                </div>
              </div>
              <div className="lg:flex-1">
                <div className="space-y-3">
                  <NavLink to="/advertise" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Advertise</NavLink>
                  <NavLink to="/sponsor-us" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Sponsor Us</NavLink>
                  <NavLink to="/contact" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Contact</NavLink>
                  <NavLink to="/faq" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">FAQ</NavLink>
                </div>
              </div>
              <div className="lg:flex-1">
                <div className="space-y-3">
                  <NavLink to="/join-isi" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Become A Reviewer</NavLink>
                  <NavLink to="/isi-videos" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">ISI Videos</NavLink>
                  <NavLink to="/mentorship" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Mentorship</NavLink>
                  <NavLink to="/second-act" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Second Act</NavLink>
                </div>
              </div>
              <div className="lg:flex-1">
                <div className="space-y-3">
                  <NavLink to="/privacy-policy" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Privacy Policy</NavLink>
                  <NavLink to="/ethics-policy" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Ethics Policy</NavLink>
                  <NavLink to="/legal-disclaimer" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Legal Disclaimer</NavLink>
                  <NavLink to="/site-map" className="block text-sm text-gray-700 hover:text-[#295F9A] transition-colors">Site Map</NavLink>
                </div>
              </div>
              <div className="text-[#3E3232] lg:flex-1">
                <h4 className="mb-4 flex items-center text-[20px] font-medium">
                  <div className="w-[4px] h-[10px] rounded-full mr-3" style={{ backgroundColor: '#FF4C7D' }}></div>
                  Social Network
                </h4>
                <div className="flex items-center flex-wrap gap-3 mb-4">
                  <a href="#" className="inline-flex items-center justify-center"><svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="#" className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47H13.874v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                  <a href="#" className="inline-flex items-center justify-center w-6 h-6 rounded-[2px] bg-black text-white"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                </div>
                <button className="max-w-[161px] w-full px-5 py-1.5 rounded-[6px] text-white text-sm font-semibold inline-flex items-center justify-center hover:opacity-90 transition-colors" style={{ backgroundColor: '#FF4C7D' }}>Donate</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#3E3232]/5 text-center py-2">
          <p className="text-[12px] text-[#3E3232]/75">All Copyright © 2025 Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

