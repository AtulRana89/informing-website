import React from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services';

interface HeaderProps {
  onMenuClick: () => void;
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, darkMode = false, onDarkModeToggle }) => {
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    authService.logout()
    logout();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          ☰
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-4 lg:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              🔍
            </div>
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          {onDarkModeToggle && (
            <button
              onClick={onDarkModeToggle}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          )}

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-lg relative transition-colors">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-lg relative transition-colors">
            💬
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {admin?.username || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {admin?.email || 'admin@example.com'}
              </p>
            </div>
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

