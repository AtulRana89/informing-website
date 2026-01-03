import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const LegalDisclaimerPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1560px' }}>
          <div className="w-full">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6">
              <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Legal Disclaimer
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-600 mb-2">Legal Disclaimer</h1>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Disclaimer of Warranties and Liability</h2>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Neither Informing Science Institute nor its suppliers or licensors makes any warranty (including without limitation) of its Site that (a) it will be uninterrupted or error-free; (b) defects will be corrected; (c) it is free of viruses or other harmful components; (d) it is accurate, complete, reliable, available, and suitable, or (d) of its quality, non-infringement, operation or result obtained from the use of its content.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4 font-semibold">
                THE SITE AND ALL ITS CONTENT, PRODUCTS AND SERVICES AS WELL AS THOSE ACCESSIBLE FROM THE SITE ARE PROVIDED "AS IS" AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND, ALL OF WHICH THE INFORMING SCIENCE INSTITUTE DISCLAIMS TO THE FULLEST EXTENT PERMITTED BY LAW.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4 font-semibold">
                THE USE OF THE INFORMING SCIENCE INSTITUTE WEBSITE AND ITS CONTENT, IS AT YOUR SOLE RISK.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4">
                To the extent permitted under applicable law, no responsibility is assumed for any injury and/or damage to anything animate and inanimate from any use or operation of any ideas, instructions, methods, products or procedures contained in the Informing Science Institute WebSite.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                The Informing Science Institute does not claim ownership, endorse or take responsibility for any third-party products, information, guidelines, materials or services that may be offered, advertised, provided or displayed on the Site.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-6">Indemnification</h2>
              
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                You hereby agree to indemnify and hold the Informing Science Institute, its directors, officers, shareholders, predecessors, successors in interest, employees, agents, suppliers and licensors harmless from and against any and all third-party claims of liability, losses, damages and costs, including, without limitation, reasonable attorneys' fees, arising out of or in connection with your use of or inability to use the Site or its Content, products or services.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-6">Compliance</h2>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                You agree to comply with all relevant local, state, national and international laws, statutes, ordinances and regulations that apply to your use of the Site and its Content, products and services. You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-6">Governing Law and Venue</h2>
              
              <p className="text-gray-800 text-base leading-relaxed">
                All matters relating to your access to or use of the Site, including all disputes, shall be governed by and construed in accordance with the laws of the State of California, USA, without regard to its conflicts of law principles, except if you reside outside of the United States, then the laws of the country in the region where you reside. The exclusive jurisdiction and venue with respect to any action or suit arising out of or pertaining to the subject matter hereof shall be the courts of competent jurisdiction located in the State of California, USA, except if you reside outside of the United States, then the courts located in the country of the region where you reside. Any claim arising out of or in connection with your use of or inability to use the Site or its Content, products or services must be brought within one (1) year after the event or such claim is barred.
              </p>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default LegalDisclaimerPage;



