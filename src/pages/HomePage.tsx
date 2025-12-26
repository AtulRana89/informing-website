import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Twitter, Facebook, Linkedin, ChevronDown } from 'lucide-react';
import logo from '../assets/images/logo.png';
import banner from '../assets/images/banner.png';
import avatar01 from '../assets/images/avatar-01.png';
import avatar02 from '../assets/images/avatar-02.png';
import avatar04 from '../assets/images/avatar-04.png';
import avatar05 from '../assets/images/avatar-05.png';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import LoginModal from '../components/LoginModal';

const HomePage: React.FC = () => {
  const [activeJournalTab, setActiveJournalTab] = useState('Journals');
  const [activePublicationTab, setActivePublicationTab] = useState('Recent');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isJournalsOpen, setIsJournalsOpen] = useState(false);
  const journalsMenuRef = useRef<HTMLDivElement | null>(null);
  const [isConferencesOpen, setIsConferencesOpen] = useState(false);
  const conferencesMenuRef = useRef<HTMLDivElement | null>(null);
  const [mobileJournalsOpen, setMobileJournalsOpen] = useState(false);
  const [mobileConferencesOpen, setMobileConferencesOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Close login modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLoginOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const journals = [
    'InformingSciJ', 'JITE:Research', 'JITE:IIP', 'JITE: DC', 
    'IJELL', 'IJIKM', 'IJDS', 'IISIT', 'JSPTE'
  ];

  const isiJournals = [
    'InformingSciJ', 'JITE:Research', 'JITE:IIP', 'JITE: DC', 
    'IJELL', 'IJIKM', 'IJDS', 'IISIT', 'JSPTE'
  ];

  const collaborativeJournals = [
    'Muma Case Review (MCR)',
    'Muma Business Review (MBR)',
    'International Journal of Community Development and Management Studies (IJCDMS)'
  ];

  // Journals content for the header mega menu (full titles)
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

  const allJournals = [
    'InformingSciJ', 'JITE:Research', 'JITE:IIP', 'JITE: DC', 
    'IJELL', 'IJIKM', 'IJDS', 'IISIT', 'JSPTE',
    'Additional Journal 1', 'Additional Journal 2', 'Additional Journal 3'
  ];

  const recentPublications = [
    {
      title: "Enhancing Successor Preparedness: Succession Strategies Impacting Organizational Survival Th...",
      authors: "Uzoma Heman Ononye, David Chucks Akan, Olufemi Olabode Olayemi",
      journal: "InformingSciJ",
      volume: "Volume 28, 2025"
    },
    {
      title: "COCP: A Modular Core Ontology For Intelligent Management Of Customs Procedures",
      authors: "Minh Duc Nguyen",
      journal: "IJIKM",
      volume: "Volume 20, 2025"
    },
    {
      title: "ChatGPT In Doctoral Supervision: Proposing A Tripartite Mentoring Model For AI-Assisted Acade...",
      authors: "Omiros Iatrellis, Areti Bania, Nicholas Samaras, Ioanna Kosmopoulou, Theodor Panagiotakopoulos",
      journal: "IJDS",
      volume: "Volume 20, 2025"
    }
  ];

  const featuredPublications = [
    {
      title: "Featured Publication 1: Advanced Research in Information Systems",
      authors: "Dr. John Smith, Dr. Jane Doe",
      journal: "InformingSciJ",
      volume: "Volume 29, 2025"
    },
    {
      title: "Featured Publication 2: Innovative Approaches to Data Science",
      authors: "Prof. Michael Johnson, Dr. Sarah Wilson",
      journal: "IJIKM",
      volume: "Volume 21, 2025"
    },
    {
      title: "Featured Publication 3: Emerging Trends in Technology",
      authors: "Dr. Robert Brown, Dr. Emily Davis",
      journal: "IJDS",
      volume: "Volume 21, 2025"
    }
  ];

  const popularPublications = [
    {
      title: "Popular Publication 1: Most Cited Research Paper",
      authors: "Dr. David Miller, Dr. Lisa Anderson",
      journal: "InformingSciJ",
      volume: "Volume 27, 2025"
    },
    {
      title: "Popular Publication 2: Trending Technology Study",
      authors: "Prof. James Wilson, Dr. Maria Garcia",
      journal: "IJIKM",
      volume: "Volume 19, 2025"
    },
    {
      title: "Popular Publication 3: High Impact Research",
      authors: "Dr. Thomas Lee, Dr. Jennifer Taylor",
      journal: "IJDS",
      volume: "Volume 19, 2025"
    }
  ];

  const allPublications = [
    ...recentPublications,
    ...featuredPublications,
    ...popularPublications
  ];

  const testimonials = [
    {
      text: "I Really Liked Meeting Delegates With Multi-Cultural Background Giving A...",
      name: "Said Hadjerrouit",
      location: "Norway",
      avatar: avatar04
    },
    {
      text: "Never Has The Process Been So Professional And Attentive To Detail...",
      name: "Prof. Gaetano R Lotrecchiano",
      title: "Editor, United States",
      avatar: avatar05
    }
  ];

  // Auto-play slider with continuous loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveSlide((prev) => {
          const nextSlide = prev + 1;
          // Create seamless loop
          if (nextSlide >= testimonials.length) {
            return 0; // Reset to first slide
          }
          return nextSlide;
        });
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, isDragging]);

  // Swipe handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - next slide
        setActiveSlide((prev) => {
          const nextSlide = prev + 1;
          return nextSlide >= testimonials.length ? 0 : nextSlide;
        });
      } else {
        // Swiped right - previous slide
        setActiveSlide((prev) => {
          const prevSlide = prev - 1;
          return prevSlide < 0 ? testimonials.length - 1 : prevSlide;
        });
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const news = [
    {
      date: "15 Aug",
      headline: "Donate To The Informing Science Institute (A 501(C)3 Charitable Association)"
    },
    {
      date: "06 Jan",
      headline: "Call For Papers: Fake News: Perspectives Across Disciplines"
    }
  ];

  // Close Journals menu on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (journalsMenuRef.current && !journalsMenuRef.current.contains(event.target as Node)) setIsJournalsOpen(false);
      if (conferencesMenuRef.current && !conferencesMenuRef.current.contains(event.target as Node)) setIsConferencesOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsJournalsOpen(false); setIsConferencesOpen(false);} 
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader onOpenMobile={() => setMobileMenuOpen(true)} onOpenLogin={() => setLoginOpen(true)} />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* Mobile Menu Overlay */}
      <div className={`xl:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`fixed inset-y-0 h-full left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} h-screen flex flex-col`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-none">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
                         <nav className="p-4 flex-1 overflow-y-auto">
               <div className="space-y-4 pb-8">
                 <a href="/about" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">About</a>
                 <a href="/call-for-papers" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Call For Papers</a>
                 <div className="space-y-2">
                   <button onClick={() => setMobileJournalsOpen((v)=>!v)} className="w-full flex items-center justify-between text-left text-gray-800 hover:text-[#295F9A] transition-colors font-medium">
                    <span>Journals</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileJournalsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileJournalsOpen && (
                    <div className="mt-2 pl-3 rounded-md bg-gray-50 p-3">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">ISI Journals</h4>
                      <ul className="space-y-2 text-sm leading-snug">
                        {isiJournalsMenu.map((j)=> (
                          <li key={j}><a href="#" className="text-gray-700 hover:text-[#295F9A]">{j}</a></li>
                        ))}
                      </ul>
                      <h4 className="text-sm font-semibold text-gray-900 mt-4 mb-2">Collaborative Journals</h4>
                      <ul className="space-y-2 text-sm leading-snug">
                        {collaborativeJournalsMenu.map((j)=> (
                          <li key={j}><a href="#" className="text-gray-700 hover:text-[#295F9A]">{j}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="space-y-2 mt-2">
                    <button onClick={() => setMobileConferencesOpen((v)=>!v)} className="w-full flex items-center justify-between text-left text-gray-800 hover:text-[#295F9A] transition-colors font-medium">
                      <span>Conferences</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileConferencesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileConferencesOpen && (
                      <div className="mt-2 pl-3 rounded-md bg-gray-50 p-3">
                        <div className="text-sm"><span className="font-semibold">InSITE 2026:</span> Jul 26 - 31 2026, United States</div>
                        <a href="#" className="inline-flex items-center text-sm text-[#295F9A] mt-2">All Conferences »</a>
                      </div>
                    )}
                  </div>
                </div>
                 <a href="#" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Community</a>
                 <a href="/publications" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Publications</a>
                 <a href="#" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Faq</a>
                 <a href="/contact" className="block text-gray-800 hover:text-[#295F9A] transition-colors font-medium">Contact Us</a>
                 
                 {/* Social Media Icons */}
                 <div className="pt-6 border-t border-gray-200">
                   <h3 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h3>
                   <div className="flex items-center space-x-4">
                     {/* X (Twitter) Icon */}
                     <button className="w-10 h-10 flex items-center justify-center bg-[#295F9A] hover:bg-[#1e4a7a] rounded-lg transition-colors">
                       <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                       </svg>
                     </button>
                     {/* Facebook Icon */}
                     <button className="w-10 h-10 flex items-center justify-center bg-[#295F9A] hover:bg-[#1e4a7a] rounded-lg transition-colors">
                       <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47H13.874v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                       </svg>
                     </button>
                     {/* LinkedIn Icon */}
                     <button className="w-10 h-10 flex items-center justify-center bg-[#295F9A] hover:bg-[#1e4a7a] rounded-lg transition-colors">
                       <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>
             </nav>
           </div>
         </div>

      {/* Main Content */}
      <main className="py-8">
        {/* Hero Section - Full Width */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1460px]  w-[90%]  mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 mb-12 pt-4 sm:pt-6 lg:pt-10">
          {/* Left Side - Text and Stats - 50% width */}
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Hero Text */}
            <div>
              <h1 className="text-[26px] md:text-[36px] lg:text-[46px]  font-normal text-gray-900 leading-[1.1] mb-6">
                An international association advancing the multidisciplinary study of informing systems.
              </h1>
                 <button 
                  className="text-white px-8 py-3 rounded-xl font-normal hover:opacity-90 transition-colors mt-3 mb-4"
                  style={{ backgroundColor: '#FF4C7D', fontSize: '14px' }}
                >
                  Learn More
                </button>
            </div>

            {/* Statistics Cards - Clickable Links */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <a 
                href="#"
                className="text-white py-8 px-6 rounded-lg text-center hover:opacity-90 transition-opacity block "
                style={{ backgroundColor: '#295F9A' }}
              >
                <div className="text-2xl lg:text-3xl font-bold">13</div>
                <div className="text-xs">Journals</div>
              </a>
              <a 
                href="#"
                className="text-white py-8 px-6 rounded-lg text-center hover:opacity-90 transition-opacity block "
                style={{ backgroundColor: '#295F9A' }}
              >
                <div className="text-2xl lg:text-3xl font-bold">5208</div>
                <div className="text-xs">Publications</div>
              </a>
              <a 
                href="#"
                className="text-white py-8 px-6 rounded-lg text-center hover:opacity-90 transition-opacity block "
                style={{ backgroundColor: '#295F9A' }}
              >
                <div className="text-2xl lg:text-3xl font-bold">6456</div>
                <div className="text-xs">Authors</div>
              </a>
              <a 
                href="#"
                className="text-white py-8 px-6 rounded-lg text-center hover:opacity-90 transition-opacity block "
                style={{ backgroundColor: '#295F9A' }}
              >
                <div className="text-2xl lg:text-3xl font-bold">1407</div>
                <div className="text-xs">Reviewers</div>
              </a>
            </div>
          </div>

          {/* Right Side - Conference Banner - 50% width */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="relative rounded-[12px] overflow-hidden shadow-lg h-56 sm:h-72 md:h-80 lg:h-full">
              {/* Background banner image */}
              <img 
                src={banner} 
                alt="Conference Banner" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Semi-transparent overlay at bottom */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm rounded-[12px] p-4">
                <div className="flex items-center justify-between">
                  {/* Text content on left */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">InSITE 2025 CONFERENCE</h3>
                    <p className="text-gray-600 text-sm">Jul 20 - 28 2025, Hiroshima Japan</p>
                  </div>
                  
                  {/* Details button on right */}
                  <button 
                    className="text-white px-8 py-3 rounded-xl font-normal hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#FF4C7D', fontSize: '14px' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Journals and Publications Section */}
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1460px]  w-[90%]  mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          {/* Left Column - Journals */}
          <div className="flex flex-col h-full">
            {/* Journals Section */}
            <div className="bg-white py-8 px-6 rounded-lg shadow-lg flex-1">

              <div className="flex space-x-6 mb-10">
                {['Journals', 'ISI', 'Collaborative', 'All'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveJournalTab(tab)}
                    className={`text-sm font-medium ${
                      activeJournalTab === tab 
                        ? '' 
                        : 'text-gray-500'
                    }`}
                    style={{ 
                      color: activeJournalTab === tab ? '#295F9A' : undefined
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {(activeJournalTab === 'Journals' ? journals : 
                  activeJournalTab === 'ISI' ? isiJournals :
                  activeJournalTab === 'Collaborative' ? collaborativeJournals :
                  allJournals).map((journal) => (
                  <div 
                    key={journal} 
                    className="text-white py-6 sm:py-8 lg:py-[50px] px-3 sm:px-4 rounded-lg text-center text-sm sm:text-base lg:text-[20px] cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center"
                    style={{ backgroundColor: '#295F9A' }}
                  >
                    {journal}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Publications */}
          <div className="flex flex-col h-full">
            {/* Publications Section */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-2">
                <div className="flex items-center">
                  <div className="w-[4px] h-[10px] rounded-full mr-3" style={{ backgroundColor: '#295F9A' }}></div>
                  <h3 className="text-lg font-bold text-gray-900">Publications</h3>
                </div>
                <div className="flex flex-wrap items-center space-x-3 sm:space-x-6">
                  {['Recent', 'Featured', 'Popular'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePublicationTab(tab)}
                      className={`text-xs sm:text-sm ${
                        activePublicationTab === tab ? 'font-medium' : 'text-gray-500'
                      }`}
                      style={{ color: activePublicationTab === tab ? '#295F9A' : undefined }}
                    >
                      {tab}
                    </button>
                  ))}
                  <a href="" className="text-xs sm:text-sm text-gray-500 hover:text-[#295F9A] transition-colors">
                    Browse All
                  </a>
                </div>
              </div>
              <div className="mb-1">
                <h4 className="text-base font-medium" style={{ color: '#295F9A' }}>
                  {activePublicationTab}
                </h4>
              </div>
              <div className="space-y-4">
                {(activePublicationTab === 'Recent' ? recentPublications :
                  activePublicationTab === 'Featured' ? featuredPublications :
                  activePublicationTab === 'Popular' ? popularPublications :
                  recentPublications).map((pub, index) => (
                  <div className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="mb-2">
                      <h4 className="text-[13px] sm:text-[14px] font-medium text-[#3E3232] line-clamp-2">{pub.title}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-600 mb-2">{pub.authors}</p>
                    <div className="bg-gray-100 py-2 px-3 rounded-lg flex items-center justify-between mt-4 sm:mt-[30px]">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={pub.journal === 'InformingSciJ' ? avatar01 : pub.journal === 'IJIKM' ? avatar02 : avatar01}
                          alt={pub.journal}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-medium cursor-pointer hover:underline" style={{ color: '#295F9A' }}>
                            {pub.journal}
                          </span>
                          <div className="text-[11px] sm:text-xs text-gray-600">
                            {pub.volume}
                          </div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Community and News Section - Separate Section */}
        <div className="py-8 sm:py-12 lg:py-[50px] my-8 sm:my-12 lg:my-[80px] px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid #DDDDDD', borderBottom: '1px solid #DDDDDD' }}>
          <div className="max-w-[1460px]  w-[90%]  mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[80px]">
            {/* Left Column - Community (65%) */}
            <div className="flex flex-col h-full lg:w-[65%]">
              <div className="flex-1">
                <div className="flex items-center mb-8">
                  <div className="w-[4px] h-[10px] rounded-full mr-3" style={{ backgroundColor: '#295F9A' }}></div>
                  <h3 className="text-lg font-bold text-gray-900">Community</h3>
                </div>
                
                {/* Testimonials Swipe Slider */}
                <div 
                  className="mb-6 overflow-hidden cursor-grab active:cursor-grabbing select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div 
                    className={`flex transition-transform ease-in-out ${isDragging ? 'duration-0' : 'duration-700'}`}
                    style={{ 
                      transform: `translateX(-${activeSlide * 100}%)`,
                      userSelect: 'none'
                    }}
                  >
                    {/* Create slides with loop duplication for seamless infinite scroll */}
                    {[...testimonials, ...testimonials].map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 flex space-x-0 md:space-x-4">
                        <div className="bg-gray-100 p-3 sm:p-4 flex-1">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[8px] overflow-hidden flex-shrink-0 bg-gray-200">
                              <img 
                                src={testimonials[slideIndex % testimonials.length].avatar}
                                alt={testimonials[slideIndex % testimonials.length].name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 leading-snug">
                                {testimonials[slideIndex % testimonials.length].text}
                              </h4>
                              <div className="mt-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {testimonials[slideIndex % testimonials.length].name} <span className="text-gray-500 font-normal">{testimonials[slideIndex % testimonials.length].location || testimonials[slideIndex % testimonials.length].title}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 p-3 sm:p-4 flex-1 hidden md:block">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[8px] overflow-hidden flex-shrink-0 bg-gray-200">
                              <img 
                                src={testimonials[(slideIndex + 1) % testimonials.length].avatar}
                                alt={testimonials[(slideIndex + 1) % testimonials.length].name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 leading-snug">
                                {testimonials[(slideIndex + 1) % testimonials.length].text}
                              </h4>
                              <div className="mt-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {testimonials[(slideIndex + 1) % testimonials.length].name} <span className="text-gray-500 font-normal">{testimonials[(slideIndex + 1) % testimonials.length].title || testimonials[(slideIndex + 1) % testimonials.length].location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Slider Dots */}
                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className="w-2 h-2 rounded-full transition-colors"
                      style={{ 
                        backgroundColor: index === activeSlide ? '#295F9A' : '#D1D5DB' 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - News (35%) */}
            <div className="flex flex-col h-full lg:w-[35%]">
              <div className="px-0 sm:px-4 md:px-6 flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-[4px] h-[10px] rounded-full mr-3" style={{ backgroundColor: '#295F9A' }}></div>
                    <h3 className="text-lg font-bold text-gray-900">News</h3>
                  </div>
                  <a href="" className="text-sm font-bold hover:underline" style={{ color: '#295F9A' }}>
                    View All
                  </a>
                </div>
                
                {/* News Items */}
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="mb-2">
                      <span className="text-sm font-bold" style={{ color: '#FF4C7D' }}>15 Aug</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        Donate To The Informing Science Institute (A 501(C)3 Charitable Association)
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="mb-2">
                      <span className="text-sm font-bold" style={{ color: '#FF4C7D' }}>06 Jan</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        Call For Papers: Fake News: Perspectives Across Disciplines
                      </span>
                    </div>
                  </div>
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

export default HomePage; 