import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const SponsorUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Roboto'] flex flex-col">
      <PublicHeader />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:underline">Home</Link> 
            <span className="mx-1">›</span> Sponsor Us
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              <span className="inline-block w-[4px] h-[10px] rounded-full mr-3 align-middle" style={{ backgroundColor: '#295F9A' }}></span>
              Sponsor Us
            </h1>
            <h2 className="text-lg text-gray-600 font-medium">
              Become an ISI Sponsor
            </h2>
          </div>

          {/* Sponsor Logos Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* AmazonSmile */}
              <a 
                href="https://smile.amazon.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src="https://www.informingscience.org/Uploads/amazonsmile.png" 
                  alt="AmazonSmile - Support Informing Science Institute" 
                  className="h-16 mx-auto object-contain"
                />
              </a>
              {/* Grammarly */}
              <a 
                href="https://www.grammarly.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src="https://www.informingscience.org/Uploads/Grammarly%20Cropped.png" 
                  alt="Grammarly" 
                  className="h-16 mx-auto object-contain"
                />
              </a>

              {/* Hire A Helper */}
              <a 
                href="https://www.hireahelper.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src="https://www.informingscience.org/Uploads/Hire_Helper.png" 
                  alt="Hire A Helper" 
                  className="h-16 mx-auto object-contain"
                />
              </a>

              {/* ISN Inspection Support Network */}
              <a 
                href="https://www.inspectionsupport.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src="https://www.informingscience.org/Uploads/Inspection_Support_Network.png" 
                  alt="ISN Inspection Support Network" 
                  className="h-16 mx-auto object-contain"
                />
              </a>

              {/* Porch */}
              <a 
                href="https://www.porch.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img 
                  src="https://www.informingscience.org/Uploads/Porch.jpg" 
                  alt="Porch" 
                  className="h-16 mx-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* InSITE Conference Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">InSITE Conference</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Since 2001, the five-day InSITE Conference has been the signature event for the Informing Science Institute (ISI). By becoming a sponsor of the InSITE Conference, sponsors will receive exposure to the growing community of over 6000 multidisciplinary academics from across the globe who are shaping the future of informing science and thousands of regular online visitors.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">InSITE Conferences aim to:</h3>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  <strong>Engage</strong> our ISI community (delegates, colleagues, and members) with the latest research in the field of informing science: technology and information technology tools used to inform and communicate, innovative research, approaches and frameworks, and knowledge management.
                </li>
                <li>
                  <strong>Foster</strong> high-quality research and professional development via mentorship, collaboration, and constructive feedback.
                </li>
                <li>
                  <strong>Support</strong> the ISI community via knowledge, experience, and tools, especially for academics in developing countries.
                </li>
              </ul>
            </div>
          </div>

          {/* Sponsor Benefits Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sponsor Benefits</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Brand Exposure:</h3>
                <p className="text-gray-700 leading-relaxed">
                  As a partner of the ISI community, thousands of members and online visitors will be exposed to your brand and products. A variety of sponsorship packages will give sponsors recognition and exposure to the ISI community, and the additional thousands of people in the informing science and technology research world that visit our website each month.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect With Your Target Audience:</h3>
                <p className="text-gray-700 leading-relaxed">
                  The ISI community is comprised of thought leaders who actively use and write about all forms of technology as part of their research and teaching practice. By sponsoring InSITE, your brand, information, and products will be showcased to thousands of individuals whose interests overlap with your brand.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Build Your Network of Contacts and Leads:</h3>
                <p className="text-gray-700 leading-relaxed">
                  The InSITE audience includes key decision-makers from a variety of international organizations. Sponsors of this event are given the opportunity to inform the group about products and activities, leading to a new network with thousands of contacts and potential leads.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Be Featured on the ISI and InSITE Websites:</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sponsors of the InSITE conference will be featured both on the ISI website which averages 5000+ unique visitors per month, and the InSITE conference website will also receive nearly a thousand visits per month. Sponsorship opportunities can also include additional brand exposure via ISI's social media sites, and the monthly e-newsletter. Sponsors will also have the opportunity to include branded giveaways in attendee conference packages.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-[#295F9A] rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Become a Sponsor?</h3>
              <p className="text-sm opacity-90 mb-4">
                For questions related to sponsorship, please feel free to{' '}
                <Link to="/contact" className="underline hover:no-underline">
                  contact us
                </Link>
                .
              </p>
              <Link 
                to="/contact" 
                className="inline-block px-6 py-2 bg-white text-[#295F9A] rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default SponsorUsPage;
