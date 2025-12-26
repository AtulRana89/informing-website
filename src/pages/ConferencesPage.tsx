import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

import c1 from '../assets/images/conferences-1.png';
import c2 from '../assets/images/conferences-2.png';
import c3 from '../assets/images/conferences-3.png';
import c4 from '../assets/images/conferences-4.png';
import c5 from '../assets/images/conferences-5.png';
import c6 from '../assets/images/conferences-6.png';
import c7 from '../assets/images/conferences-7.png';
import c8 from '../assets/images/conferences-8.png';
import c9 from '../assets/images/conferences-9.png';
import c10 from '../assets/images/conferences-10.png';

type Conference = {
  id: string;
  title: string;
  dateLocation: string;
  img: string;
  href: string;
  note?: string;
};

const conferences: Conference[] = [
  { id: 'conf-1', title: 'InSITE 2025: Informing Science + IT Education Conference', dateLocation: 'Jul 20 - 28, 2025, Hiroshima, Japan', img: c1, href: '#' },
  { id: 'conf-2', title: 'InSITE 2024: Informing Science + IT Education Conference', dateLocation: 'Jul 24 - 25, 2024, Online (Virtual)', img: c2, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-3', title: 'InSITE 2023: Informing Science + IT Education Conference', dateLocation: 'Jul 5 - 6, 2023, Online (Virtual)', img: c3, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-4', title: 'InSITE 2022: Informing Science + IT Education Conference', dateLocation: 'Jul 6 - 7, 2022, Online', img: c4, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-5', title: 'InSITE 2021: Informing Science + IT Education Conference', dateLocation: 'Jul 6 - 7, 2021, Online', img: c4, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-6', title: 'Education Under The Pandemic: Workshop And Conference', dateLocation: 'Apr 1, 2021, Online', img: c5, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-7', title: 'InSITE 2020: Informing Science + IT Education Conference', dateLocation: 'Jul 7 - 8, 2020, Online', img: c6, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-8', title: 'InSITE 2019: Informing Science + IT Education Conference', dateLocation: 'Jun 30 - Jul 4, 2019, Jerusalem, Israel', img: c7, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-9', title: 'InSITE 2018: Informing Science + IT Education Conference', dateLocation: 'Jun 24 - 28, 2018, La Verne, California, United States', img: c8, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-10', title: 'Engaged Management Scholarship 2017', dateLocation: 'Sep 7 - 10 2017, Tampa, Florida, United States', img: c10, href: '#', note: 'Collaborative Conference' },
  { id: 'conf-11', title: 'InSITE 2017: Informing Science + IT Education Conference', dateLocation: 'Jul 17 - 20, 2017, Ho Chi Minh City (Saigon), Vietnam', img: c9, href: '#', note: 'Online ISSN: 1535-0703' },
  { id: 'conf-12', title: 'InSITE 2016: Informing Science + IT Education Conference', dateLocation: 'Jun 27 - Jul 1, 2016, Vilnius, Lithuania', img: c10, href: '#', note: 'Online ISSN: 1535-0703' },
];

const ConferencesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const totalPages = Math.max(1, Math.ceil(conferences.length / pageSize));
  const current = useMemo(() => conferences.slice((page - 1) * pageSize, page * pageSize), [page]);
  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-[30px]"><Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Conferences</div>

          {/* Heading */}
          <h1 className="text-sm font-semibold sm:text-base text-[#3E3232] my-10">
            <span className="inline-block w-[4px] h-[10px] rounded-full mr-2 align-middle" style={{ backgroundColor: '#295F9A' }}></span>
            Conferences : Browse The ISI Conferences
          </h1>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {current.map((c) => (
              <a key={c.id} href={c.href} className="block h-full">
                <div className="p-3 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] rounded-[12px] overflow-hidden mb-3">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[13px] font-medium text-[#3E3232] line-clamp-2 mb-2">{c.title}</div>
                  <div className="text-[11px] text-gray-600 line-clamp-2 mb-3">{c.dateLocation}</div>
                  <div className="rounded-lg mt-auto py-5 px-4 flex items-center justify-between mt-[20px]" style={{ backgroundColor: '#F5F5F5' }}>
                    <div>
                      <div className="text-[11px] text-gray-600">{c.note || 'Online ISSN: 1535-0703'}</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-start mt-[40px]">
            <div className="flex items-center gap-1">
              <button onClick={() => goTo(1)} className={`w-8 h-8 rounded-md text-sm ${page === 1 ? 'bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}>1</button>
              <button onClick={() => goTo(2)} className={`w-8 h-8 rounded-md text-sm ${page === 2 ? 'bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}>2</button>
              <button onClick={() => goTo(3)} className={`w-8 h-8 rounded-md text-sm ${page === 3 ? 'bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}>3</button>
              <span className="px-2 text-gray-500">…</span>
              <button onClick={() => goTo(9)} className={`w-8 h-8 rounded-md text-sm ${page === 9 ? 'bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}>9</button>
              <button onClick={() => goTo(page + 1)} className="ml-2 px-3 h-8 rounded-md bg-[#F5F5F5] text-sm hover:bg-gray-100">Next »</button>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ConferencesPage;



