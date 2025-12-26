import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const SiteMapPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1560px' }}>
          <div className="w-full">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6">
              <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Site Map
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-600 mb-2">Site Map</h1>
              <h2 className="text-lg text-gray-600 font-medium">An overview of the main sections of the ISI website.</h2>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Main Pages */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Main Pages</h3>
                    <ul className="space-y-2">
                      <li>
                        <NavLink to="/" className="text-blue-600 hover:underline">HOME</NavLink>
                      </li>
                      <li>
                        <NavLink to="/about" className="text-blue-600 hover:underline">ABOUT</NavLink>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">NEWS</a>
                      </li>
                      <li>
                        <NavLink to="/journals" className="text-blue-600 hover:underline">JOURNALS</NavLink>
                      </li>
                      <li>
                        <NavLink to="/conferences" className="text-blue-600 hover:underline">CONFERENCES</NavLink>
                      </li>
                      <li>
                        <NavLink to="/publications" className="text-blue-600 hover:underline">PUBLICATIONS</NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact" className="text-blue-600 hover:underline">CONTACT US</NavLink>
                      </li>
                      <li>
                        <NavLink to="/faq" className="text-blue-600 hover:underline">FAQ</NavLink>
                      </li>
                    </ul>
                  </div>

                  {/* Other Pages */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Other Pages</h3>
                    <ul className="space-y-2">
                      <li>
                        <NavLink to="/advertise" className="text-blue-600 hover:underline">ADVERTISE</NavLink>
                      </li>
                      <li>
                        <NavLink to="/sponsor-us" className="text-blue-600 hover:underline">SPONSOR US</NavLink>
                      </li>
                      <li>
                        <NavLink to="/isi-videos" className="text-blue-600 hover:underline">ISI VIDEOS</NavLink>
                      </li>
                      <li>
                        <NavLink to="/mentorship" className="text-blue-600 hover:underline">MENTORSHIP</NavLink>
                      </li>
                      <li>
                        <NavLink to="/second-act" className="text-blue-600 hover:underline">SECOND ACT</NavLink>
                      </li>
                      <li>
                        <NavLink to="/privacy-policy" className="text-blue-600 hover:underline">PRIVACY POLICY</NavLink>
                      </li>
                      <li>
                        <NavLink to="/ethics-policy" className="text-blue-600 hover:underline">ETHICS POLICY</NavLink>
                      </li>
                      <li>
                        <NavLink to="/legal-disclaimer" className="text-blue-600 hover:underline">LEGAL DISCLAIMER</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Journals */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Journals</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Informing Science: The International Journal of an Emerging Transdiscipline (InformingSciJ)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Journal of Information Technology Education: Research (JITE:Research)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Journal of Information Technology Education: Innovations in Practice (JITE:IIP)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Journal of Information Technology Education: Discussion Cases (JITE: DC)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Interdisciplinary Journal of e-Skills and Lifelong Learning (IJELL)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Interdisciplinary Journal of Information, Knowledge, and Management (IJIKM)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">International Journal of Doctoral Studies (IJDS)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Issues in Informing Science and Information Technology (IISIT)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Journal for the Study of Postsecondary and Tertiary Education (JSPTE)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Informing Faculty (IF)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Muma Case Review (MCR)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">Muma Business Review (MBR)</a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">International Journal of Community Development and Management Studies (IJCDMS)</a>
                      </li>
                    </ul>
                  </div>

                  {/* Conferences */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Conferences</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2001</a>: Jun 19 - 22 2001, Poland
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2002</a>: Jun 19 - 21 2002, Ireland
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2003</a>: Jun 24 - 27 2003, Finland
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2004</a>: Jun 26 - 28 2004, Australia
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2005</a>: Jun 16 - 19 2005, United States
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2006</a>: Jun 25 - 28 2006, United Kingdom
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2007</a>: Jun 22 - 25 2007, Slovenia
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2008</a>: Jun 22 - 25 2008, Bulgaria
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2009</a>: Jun 12 - 15 2009, United States
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2010</a>: Jun 19 - 24 2010, Italy
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2011</a>: Jun 18 - 23 2011, Serbia and Montenegro
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2012</a>: Jun 22 - 27 2012, Canada
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2013</a>: Jul 1 - 6 2013, Portugal
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2014</a>: Jun 30 - Jul 4 2014, Australia
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">e-Skills 2014</a>: Nov 17 - 21 2014, South Africa
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2015</a>: Jun 29 - Jul 5 2015, United States
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2016</a>: Jun 27 - Jul 1 2016, Lithuania
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2017</a>: Jul 31 - Aug 5 2017, Vietnam
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">ems2017</a>: Sep 7 - 10 2017, United States
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2018</a>: Jun 23 - 28 2018, United States
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2019</a>: Jun 30 - Jul 4 2019, Israel
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2020</a>: Jul 7 - 8 2020
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">covid</a>: Apr 1 - 1 2021
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2021</a>: Jul 6 - 7 2021
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2022</a>: Jul 6 - 7 2022
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2023</a>: Jul 5 - 6 2023
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE2024</a>: Jul 24 - 25 2024
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2025</a>: Jul 20 - 28 2025, Japan
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">InSITE 2026</a>: Jul 26 - 31 2026, United States
                      </li>
                    </ul>
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

export default SiteMapPage;



