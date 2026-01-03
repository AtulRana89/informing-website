import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const MemberHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to home page
    navigate('/');
  };

  return (
    <header style={{ backgroundColor: '#295F9A' }} className="w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1660px] mx-auto">
          <div className="flex items-center justify-between py-3">
            {/* Left side - Logo only */}
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Informing Science Institute" 
                className="h-8 sm:h-10 md:h-12 object-contain" 
              />
            </div>

            {/* Right side - Navigation links and logout button */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <nav className="hidden sm:flex items-center space-x-4">
                <a 
                  href="https://informingscience.org" 
                  className="text-white hover:opacity-80 transition-opacity text-sm font-medium"
                >
                  ISI Website
                </a>
                <a 
                  href="#" 
                  className="text-white hover:opacity-80 transition-opacity text-sm font-medium"
                >
                  Help
                </a>
                <a 
                  href="#" 
                  className="text-white hover:opacity-80 transition-opacity text-sm font-medium"
                >
                  Feedback
                </a>
              </nav>
              
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                style={{ color: '#295F9A' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
