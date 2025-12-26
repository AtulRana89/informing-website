import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface MenuItem {
  name: string;
  icon: string;
  path: string;
  roles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { admin, logout } = useAuth();
  const location = useLocation();

  // Get menu items based on user role
  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { name: 'Dashboard', icon: '📊', path: '/dashboard', roles: [] },
    ];

    if (admin?.role === 'super-admin' || admin?.role === 'administrator') {
      baseItems.push(
        { name: 'Admin Dashboard', icon: '👑', path: '/admin-dashboard', roles: ['super-admin', 'administrator'] },
        { name: 'User Management', icon: '👥', path: '/admin/users', roles: ['super-admin', 'administrator'] },
        { name: 'System Settings', icon: '⚙️', path: '/admin/settings', roles: ['super-admin', 'administrator'] }
      );
    }

    // Add common items for all users
    baseItems.push(
      { name: 'Profile', icon: '👤', path: '/profile', roles: [] },
      { name: 'Publications', icon: '📚', path: '/publications', roles: [] },
      { name: 'Community', icon: '🌐', path: '/community', roles: [] }
    );

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => {
              // Check if admin has required role for this menu item
              const hasAccess = item.roles.length === 0 || 
                item.roles.includes(admin?.role || '');
              
              if (!hasAccess) return null;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {admin ? admin.username : 'Admin'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {admin?.email || 'admin@example.com'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

