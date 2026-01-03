import React from 'react';

const Community: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community</h1>
            <p className="text-gray-600 dark:text-gray-400">Connect with researchers and academics worldwide</p>
          </div>
          
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌐</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Community Features Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-400">
                This section will include forums, discussion groups, networking opportunities, 
                and collaboration tools for the academic community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
