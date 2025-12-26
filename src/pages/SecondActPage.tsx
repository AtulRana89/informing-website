import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const SecondActPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Roboto'] flex flex-col">
      <PublicHeader />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:underline">Home</Link> 
            <span className="mx-1">›</span> Second Act
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              <span className="inline-block w-[4px] h-[10px] rounded-full mr-3 align-middle" style={{ backgroundColor: '#295F9A' }}></span>
              Second Act
            </h1>
            <h2 className="text-lg sm:text-xl text-gray-700 font-medium">
              Opportunities for Senior, Retired, or Retiring Academics
            </h2>
          </div>

          {/* Main Content */}
          <div className="w-full">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-sm sm:text-base">
                  ISI recognizes both the desire senior faculty members have to share their wisdom and knowledge, as well as the support new and developing faculty members need when beginning their careers. To address these needs, the Informing Science Institute is proud to announce the launch of the Second Act Academy.
                </p>
                
                <p className="text-sm sm:text-base">
                  Eligible senior (and retired) faculty who are interested in participating in the Second Act Academy are provided with the opportunity and infrastructure support to create a development program based on their own interests in order to share this knowledge and support new faculty. This could include one-on-one mentoring of ISI colleagues on topics including writing research papers, teaching, and the politics of academia, or developing text and video resources - all project ideas are welcome.
                </p>
                
                <p className="text-sm sm:text-base">
                  To get started or learn more, contact Eli at{' '}
                  <a 
                    href="mailto:EliCohen@InformingScience.org" 
                    className="text-[#295F9A] hover:underline font-medium"
                  >
                    EliCohen@InformingScience.org
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default SecondActPage;
