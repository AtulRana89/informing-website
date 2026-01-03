import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const AdvertisePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1560px' }}>
          <div className="w-full">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Advertise
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertise</h1>
            <h2 className="text-lg text-gray-600 font-medium">Advertise with ISI</h2>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-gray-800 text-base leading-relaxed">
              The Informing Science Institute is non-commercial and so does not solicit advertising.
            </p>
          </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default AdvertisePage;
