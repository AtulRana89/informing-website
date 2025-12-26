import React from 'react';
import { Link } from 'react-router-dom';
import editor3 from '../assets/images/editer-3.png';
import editor4 from '../assets/images/editer-4.png';
import ccImg from '../assets/images/cc-By-nc 1.png';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const JournalsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Roboto'] text-[#3E3232]">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6"><Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Journals</div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr_0.8fr] gap-6">
            {/* Left: Journal overview */}
            <section className="space-y-6">
              <div className="rounded-lg p-5 sm:p-6" style={{ backgroundColor: '#F5F5F5' }}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 text-[#2D3748]">Informing Science: The International Journal of an Emerging Transdiscipline (InformingSciJ)</h1>
                <div className="mt-4 text-[14px] text-gray-600">online issn: 1521-4672 <span className="mx-2">•</span> print issn: 1547-9684</div>
                
              </div>
              <div className="mt-6">
                  <h2 className="text-xl font-medium  text-[#2D3748] mb-2">Overview</h2>
                  <p className="text-[#3E3232] text-sm leading-6 mb-4">
                    Informing Science publishes scholarly articles that provide insight into the complexities of informing clients. Submissions should illuminate ways to improve and provide fresh insights useful in developing theories. We are interested in papers that critique established phenomena and perspectives typically taken for granted, especially through applied psychology (AP). We welcome submissions that connect Applied Psychology topics with other disciplines.
                  </p>
                  <p className="text-[#3E3232] text-sm leading-6mt-3">
                    Readers of the journal come from many disciplines, so all papers must be understandable by all. Manuscripts are submitted electronically, desk-reviewed, and double-anonymized peer-reviewed.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <a href="#" className="px-8 py-2 rounded-[6px] text-white  hover:opacity-90 transition-colors" style={{ backgroundColor: '#FF4C7D' }}>Learn More</a>
                    <div className="flex items-center gap-2 text-gray-500">
                      <img src={ccImg} alt="CC BY-NC" className="h-10 w-auto" />
                    </div>
                  </div>
                </div>
              {/* Recent Publications */}
              <div className="bg-white rounded-lg pt-6">
                
                <h3 className="text-[20px] font-medium text-[#3E3232] mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Recent Publications
                </h3>
                <div className=" space-y-7">
                  {[1,2,3,4,5].map((i)=> (
                    <a key={i} href="#" className="block rounded-lg shadow-lg hover:shadow-sm transition-shadow bg-white">
                      <div className="px-5 pt-6 pb-5">
                        <div className="text-[14px] font-medium text-[#2D3748] leading-snug">
                          Using Machine Learning Algorithms To Cluster And Analyse Students' Acceptance Of...
                        </div>
                        <div className="mt-4 bg-[#F5F5F5] rounded-md px-4 py-5 flex items-center justify-between">
                          <div className="text-[12px] text-gray-600 line-clamp-1 pr-3">Delali Kwasi Dake, Esther Gyimah</div>
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        </div>
                      </div>
                    </a>
                  ))}
                  <div>
                    <a href="#" className="inline-block px-8 py-2 rounded-[6px] text-white" style={{backgroundColor:'#FF4C7D'}}>Browse All</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Middle: Editors-in-Chief */}
            <aside className="space-y-6 h-full">
              <div className="rounded-lg p-5 h-full" style={{ backgroundColor: '#F5F5F5' }}>
               
                <h3 className="text-[20px] font-medium text-[#3E3232] mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Editors-In-Chief
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <img src={editor3} alt="Editor" className="w-[70px] h-[70px] rounded-[12px] object-cover" />
                    <div>
                      <div className="text-[13px] font-medium text-[3E3232]">Eli Cohen</div>
                      <div className="text-[13px] font-medium text-[3E3232]">Senior Editor In Chief</div>
                      <div className="text-[12px] text-[#3E3232]/75 ">InformingScience@Comcast.net</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={editor4} alt="Editor" className="w-[70px] h-[70px] rounded-[12px] object-cover" />
                    <div>
                      <div className="text-[13px] font-medium text-[3E3232]">Dr Francesco Tommasi</div>
                      <div className="text-[13px] font-medium text-[3E3232]">Editor In Chief</div>
                      <div className="text-[12px] text-[#3E3232]/75 ">francesco.tommasi@unimi.it</div>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-[#3E3232]/75 leading-5 mt-5">
                  Informing Science: The International Journal of an Emerging Transdiscipline (InformingSciJ)
                  Online ISSN: 1521-4672  •  Print ISSN: 1547-9684 The journal is transdisciplinary. InformSciJ’s
                  transdisciplinary character enables us to provide you with a broad array of contributions from
                  various disparate fields. These contributions elaborate on finding better ways to inform. Sadly,
                  unlike successful commercial businesses, academia still pr ...
                </p>
                <a href="#" className="inline-block mt-4 px-8 py-2 rounded-[6px] text-white  hover:opacity-90 transition-colors" style={{ backgroundColor: '#FF4C7D' }}>Learn More</a>
                <div className="mt-4">
               
                {/* License and publication details */}
                <div className="mt-6 text-[12px] text-[#3E3232]/75 leading-5  space-y-2">
                  <p>
                    All articles of this open access journal are licensed to you under the
                    <a href="#" className=" underline ml-1">Creative Commons BY-NC 4.0</a> license. Copyright to articles is retained by their respective authors.
                    Immediately upon publication, articles can be accessed from anywhere in the world at no charge.
                  </p>
                  <p>
                    There is no fee to submit an article. There is no publication fee for ISI members. Upon acceptance of the paper, non-members may choose to become a member or to pay a one-time publication fee of USD 75.
                  </p>
                  <p>
                    The journal is published by the Informing Science Institute, a 501(c)3 charitable association under USA tax laws, registered in the State of California with office at 131 Brookhill Court, Santa Rosa, California, USA. This journal is archived by Portico.
                  </p>
                </div>
              </div>
              </div>
            </aside>

            {/* Right: Overview menu */}
            <aside >
              <div className="rounded-lg p-6 " style={{ backgroundColor: '#F5F5F5', minHeight:'460px'}}>
                <h3 className="text-lg font-semibold text-[#3E3232] mb-4 flex items-center">
                  
                  Overview
                </h3>
                <ul className="space-y-3 text-sm">
                  {['Submission Process','Message From Editor In Chief','Published Articles','Board Members','Reviewer Information','Journal Information','Indexed In'].map(i=> (
                    <li key={i}><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">{i}</a></li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
              <a href="#" className="w-full inline-flex justify-center px-4 py-2 rounded-md text-white" style={{ backgroundColor: '#FF4C7D' }}>Learn More</a>
              </div>
              
            </aside>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default JournalsPage;


