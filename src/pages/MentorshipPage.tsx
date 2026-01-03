import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const MentorshipPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Roboto'] flex flex-col">
      <PublicHeader />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:underline">Home</Link> 
            <span className="mx-1">›</span> Mentorship
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              <span className="inline-block w-[4px] h-[10px] rounded-full mr-3 align-middle" style={{ backgroundColor: '#295F9A' }}></span>
              Mentorship
            </h1>
          </div>

          {/* Main Content */}
          <div className="w-full">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-sm sm:text-base">
                  ISI journal editors are senior faculty members who are widely published. While only about 10% of submitted articles are accepted for publication, ISI editors spend time providing constructive feedback to help authors learn how to improve the quality of submitted articles and reach publishing goals. All authors benefit from the review process as a result of this mentoring process.
                </p>
                
                <p className="text-sm sm:text-base">
                  As well, ISI is in the process of launching the{' '}
                  <Link 
                    to="/second-act" 
                    className="text-[#295F9A] hover:underline font-medium"
                  >
                    Second Act Academy
                  </Link>
                  , a program that allows senior and retired academics to share their wisdom and knowledge with new and developing faculty members.
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

export default MentorshipPage;
