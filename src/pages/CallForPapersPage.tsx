import React, { useMemo, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

type Paper = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  date: string;
  tag: 'Journal News' | 'Website';
  href: string;
};

// Display labels should match screenshot exactly, while we filter with internal values
const TABS = ['All', 'Journals News', 'Website'] as const;

const samplePapers: Paper[] = Array.from({ length: 36 }).map((_, i) => ({
  id: `paper-${i + 1}`,
  title: i % 2 === 0
    ? 'Call For Papers: Fake News: Perspectives Across Disciplines'
    : 'Donate To The Informing Science Institute (A 501(c)3) – Support Knowledge',
  excerpt: 'Informing Science: The International Journal of An Emerging Transdiscipline (InformingSciJ). Click for details…',
  source: i % 2 === 0 ? 'InformingSciJ' : 'ISI Website',
  date: i % 2 === 0 ? '06 Jan 2019' : '15 Aug 2019',
  tag: i % 2 === 0 ? 'Journal News' as const : 'Website' as const,
  href: i % 2 === 0 ? '#' : '#',
}));

const CallForPapersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    if (activeTab === 'All') return samplePapers;
    const tag = activeTab === 'Journals News' ? 'Journal News' : activeTab;
    return samplePapers.filter(p => p.tag === (tag as Paper['tag']));
  }, [activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader />

      {/* Mobile menu handled globally in PublicHeader */}

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-[30px]"><a href="/" className="hover:underline">Home</a> <span className="mx-1">›</span> Call For Papers</div>

          {/* Tabs */}
          <div className="rounded-lg p-2 w-full mb-6" style={{ backgroundColor: '#F5F5F5' }}>
            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setPage(1); }}
                  className={`flex-none px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeTab === tab ? 'text-[#295F9A]' : 'text-[#3E3232] hover:text-[#295F9A]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-sm font-semibold sm:text-base text-[#3E3232] my-10">
            <span className="inline-block w-[4px] h-[10px] rounded-full mr-2 align-middle" style={{ backgroundColor: '#295F9A' }}></span>
            Call For Papers : Latest ISI News And Announcements.
          </h1>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {current.map((p) => (
              <a key={p.id} href={p.href} className="block h-full">
                <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="text-[13px] font-medium text-[#3E3232] line-clamp-2 mb-2">{p.title}</div>
                  <div className="text-[11px] text-gray-600 line-clamp-2">{p.excerpt}</div>
                  <div className="rounded-lg mt-auto py-6 px-4 flex items-center justify-between" style={{ backgroundColor: '#F5F5F5' }}>
                    <div className="text-[11px] text-gray-600">{p.date} | {p.tag}</div>
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
              <button onClick={() => goTo(page + 1)} disabled={page === totalPages} className={`ml-2 px-3 h-8 rounded-md bg-[#F5F5F5] text-sm ${page === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-200' : 'hover:bg-gray-100'}`}>Next »</button>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default CallForPapersPage;


