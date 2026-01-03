import React, { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import LoginModal from './LoginModal';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

type Props = {
  onOpenMobile?: () => void; // optional, header manages its own state if not provided
  onOpenLogin?: () => void;  // optional, header manages its own state if not provided
};

const PublicHeader: React.FC<Props> = ({ onOpenMobile, onOpenLogin }) => {
  const navigate = useNavigate();
  const [isJournalsOpen, setIsJournalsOpen] = useState(false);
  const [isConferencesOpen, setIsConferencesOpen] = useState(false);
  const journalsMenuRef = useRef<HTMLDivElement | null>(null);
  const conferencesMenuRef = useRef<HTMLDivElement | null>(null);
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const [mobileJournalsOpen, setMobileJournalsOpen] = useState(false);
  const [mobileConferencesOpen, setMobileConferencesOpen] = useState(false);

  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
  
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
  
      if (key === name) {
        return value ?? null;
      }
    }
    return null;
  };


  const handleUserClick = () => {
  // Read token from cookie
  const userToken = getCookie('authToken') 
                 || getCookie('COOKIES_USER_ACCESS_TOKEN');

  if (userToken) {
    // User is logged in
    navigate('/profile-edit');
  } else {
    // User is not logged in
    setInternalLoginOpen(true);
  }
};

  

  const isiJournalsMenu = [
    'Informing Science: The International Journal of an Emerging Transdiscipline (InformingScij)',
    'Journal of Information Technology Education: Research (JITE:Research)',
    'Journal of Information Technology Education: Innovations in Practice (JITE:IIP)',
    'Journal of Information Technology Education: Discussion Cases (JITE: DC)',
    'Interdisciplinary Journal of e-Skills and Lifelong Learning (IJELL)',
    'Interdisciplinary Journal of Information, Knowledge, and Management (IJIKM)',
    'International Journal of Doctoral Studies (IJDS)',
    'Issues in Informing Science and Information Technology (IISIT)',
    'Journal for the Study of Postsecondary and Tertiary Education (JSPTE)',
    'Informing Faculty (IF)'
  ];
  const collaborativeJournalsMenu = [
    'Muma Case Review (MCR)',
    'Muma Business Review (MBR)',
    'International Journal of Community Development and Management Studies (IJCDMS)'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (journalsMenuRef.current && !journalsMenuRef.current.contains(event.target as Node)) setIsJournalsOpen(false);
      if (conferencesMenuRef.current && !conferencesMenuRef.current.contains(event.target as Node)) setIsConferencesOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsJournalsOpen(false); setIsConferencesOpen(false); setInternalLoginOpen(false); setInternalMobileOpen(false);} 
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
    {/* Global Login Modal */}
    <LoginModal open={internalLoginOpen} onClose={() => setInternalLoginOpen(false)} />
    {/* Mobile Menu Overlay */}
    <div className={`xl:hidden fixed inset-0 z-50 transition-opacity duration-300 ${internalMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setInternalMobileOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${internalMobileOpen ? 'translate-x-0' : '-translate-x-full'} h-screen flex flex-col`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-none">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button onClick={() => setInternalMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4 pb-8">
            <a href="/about" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">About</a>
            <a href="/call-for-papers" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Call For Papers</a>
            {/* Journals mega menu (collapsible) */}
            <div className="space-y-2">
              <button onClick={() => setMobileJournalsOpen(v=>!v)} className="w-full flex items-center justify-between text-left text-gray-800 hover:text-[#295F9A] transition-colors font-medium">
                <span>Journals</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileJournalsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileJournalsOpen && (
                <div className="mt-2 pl-3 rounded-md bg-gray-50 p-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">ISI Journals</h4>
                  <ul className="space-y-2 text-sm leading-snug">
                    {isiJournalsMenu.map(j => (
                      <li key={j}><a href="/journals" className="text-gray-700 hover:text-[#295F9A]">{j}</a></li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-semibold text-gray-900 mt-4 mb-2">Collaborative Journals</h4>
                  <ul className="space-y-2 text-sm leading-snug">
                    {collaborativeJournalsMenu.map(j => (
                      <li key={j}><a href="#" className="text-gray-700 hover:text-[#295F9A]">{j}</a></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Conferences section (collapsible) */}
            <div className="space-y-2 mt-2">
              <button onClick={() => setMobileConferencesOpen(v=>!v)} className="w-full flex items-center justify-between text-left text-gray-800 hover:text-[#295F9A] transition-colors font-medium">
                <span>Conferences</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileConferencesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileConferencesOpen && (
                <div className="mt-2 pl-3 rounded-md bg-gray-50 p-3">
                  <div className="text-sm"><span className="font-semibold">InSITE 2026:</span> Jul 26 - 31 2026, United States</div>
                  <a href="/conferences" className="inline-flex items-center text-sm text-[#295F9A] mt-2">All Conferences »</a>
                </div>
              )}
            </div>
            <a href="/publications" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Publications</a>
            <a href="/community" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Community</a>
            <a href="/faq" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">FAQ</a>
            <a href="/contact" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Contact Us</a>
            {/* Follow Us */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex items-center space-x-4">
                <button className="w-10 h-10 flex items-center justify-center bg-[#295F9A] hover:bg-[#1e4a7a] rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-[#295F9A] hover:bg-[#1e4a7a] rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47H13.874v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-[#295F9A] hover:bg-[#1e4a7a] rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <header style={{ backgroundColor: '#295F9A' }}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1660px] mx-auto">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <a href="/">
                <img src={logo} alt="Informing Science Institute" className="h-8 sm:h-10 md:h-12 object-contain" />
              </a>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:flex space-x-1">
                <button className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-colors" aria-label="X (Twitter)">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:opacity-80 transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
              <button 
                className="bg-white text-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                style={{ color: '#295F9A' }}
                onClick={() => setInternalLoginOpen(true)}
              >
                Log In
              </button>
              {/* removed top-bar toggle per request */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1460px]  w-[90%]  mx-auto">
            <div className="flex items-center py-4 min-w-0 gap-2 md:gap-4">
              <nav className="hidden xl:flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8 flex-1 min-w-0 overflow-visible">
                <NavLink 
                  to="/about" 
                  className={({isActive}) => `text-xs md:text-sm font-medium transition-colors ${isActive ? 'text-[#295F9A]' : 'text-gray-800 hover:text-[#295F9A]'}`}
                >
                  About
                </NavLink>
                <NavLink 
                  to="/call-for-papers" 
                  className={({isActive}) => `text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${isActive ? 'text-[#295F9A]' : 'text-gray-800 hover:text-[#295F9A]'}`}
                >
                  Call For Papers
                </NavLink>
                <div ref={journalsMenuRef} className="relative">
                  <button onClick={() => setIsJournalsOpen(v=>!v)} className="text-gray-800 hover:text-[#295F9A] transition-colors flex items-center text-xs md:text-sm font-medium">
                    Journals
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isJournalsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isJournalsOpen && (
                    <div className="absolute left-0 top-full mt-3 w-[980px] max-w-[95vw] bg-[#295F9A] text-white rounded-lg shadow-xl p-8 z-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-2xl font-medium mb-4 opacity-90">ISI Journals</h4>
                          <ul className="space-y-4 text:[15px] leading-snug">
                            {isiJournalsMenu.map((j) => (
                              <li key={j} className="opacity-95 hover:underline"><a href="/journals">{j}</a></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-2xl font-medium mb-4 opacity-90">Collaborative Journals</h4>
                          <ul className="space-y-4 text-[15px] leading-snug">
                            {collaborativeJournalsMenu.map((j) => (
                              <li key={j} className="opacity-95 hover:underline"><a href="#">{j}</a></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={conferencesMenuRef} className="relative">
                  <button onClick={() => setIsConferencesOpen(v=>!v)} className="flex items-center text-gray-800 hover:text-[#295F9A] text-xs md:text-sm font-medium transition-colors">
                    <span>Conferences</span>
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isConferencesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isConferencesOpen && (
                    <div className="absolute left-0 top-full mt-3 w-[520px] max-w-[90vw] bg-[#295F9A] text-white rounded-lg shadow-xl p-6 z-50">
                      <div className="space-y-3">
                        <div className="text-base"><span className="font-semibold">InSITE 2026:</span> Jul 26 - 31 2026, United States</div>
                        <a href="/conferences" className="inline-flex items-center text-white underline opacity-90 hover:opacity-100">All Conferences »</a>
                      </div>
                    </div>
                  )}
                </div>
                <NavLink 
                  to="/community" 
                  className={({isActive}) => `text-xs md:text-sm font-medium transition-colors ${isActive ? 'text-[#295F9A]' : 'text-gray-800 hover:text-[#295F9A]'}`}
                >
                  Community
                </NavLink>
                <NavLink 
                  to="/publications" 
                  className={({isActive}) => `text-xs md:text-sm font-medium transition-colors ${isActive ? 'text-[#295F9A]' : 'text-gray-800 hover:text-[#295F9A]'}`}
                >
                  Publications
                </NavLink>
                <NavLink 
                  to="/faq" 
                  className={({isActive}) => `text-xs md:text-sm font-medium transition-colors ${isActive ? 'text-[#295F9A]' : 'text-gray-800 hover:text-[#295F9A]'}`}
                >
                  FAQ
                </NavLink>
                <a href="/contact" className="text-gray-800 hover:text-[#295F9A] transition-colors text-xs md:text-sm font-medium whitespace-nowrap">Contact Us</a>
              </nav>

              {/* mobile toggle placed below (as before), visible on small screens */}
              <button 
                className="xl:hidden flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
                onClick={() => setInternalMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center space-x-2 flex-shrink-0 ml-auto min-w-0 w-auto max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
                <div className="relative flex items-center bg-gray-100 rounded-lg min-w-0 flex-1">
                  <button className="flex-shrink-0 pl-3 pr-2 py-2.5 hover:bg-gray-200 rounded-l-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="12" cy="19" r="2"/>
                    </svg>
                  </button>
                  <input type="text" placeholder="Search" className="flex-1 min-w-0 pl-3 pr-10 py-2.5 bg-transparent border-0 focus:outline-none text-sm text-gray-700 placeholder-gray-500" />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 rounded p-1 transition-colors flex-shrink-0">
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button 
                  onClick={handleUserClick}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0" 
                  aria-label="User Profile"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="8" r="3" fill="currentColor"/>
                    <path d="M6.168 18.849A6 6 0 0 1 12 16a6 6 0 0 1 5.832 2.849" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default PublicHeader;

