import React, { useMemo, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

type Pub = {
  id: string;
  title: string;
  excerpt: string;
  authors: string;
  meta: string; // journal, volume, year
  tag: 'Journal Articles' | 'Conference Proceedings' | 'Most Downloaded Publications' | 'Books';
  href: string;
  keywords?: string;
};

const TABS = ['All', 'Journal Articles', 'Conference Proceedings', 'Most Downloaded Publications', 'Books'] as const;

const publications: Pub[] = [
  {
    id: 'pub-1',
    title: 'Transdisciplinary Communication: Introduction To The Special Series',
    excerpt:
      'Aim/Purpose: This is an introductory paper for the Special Series on Transdisciplinary Communication. It summarizes the various articles in the special series and raises questions for future investigation.',
    authors: 'Shalini Misra, Gaetano R Lotrecchiano',
    meta: 'InformingSciJ , Volume 21 , 2018',
    tag: 'Journal Articles',
    href: '#',
    keywords: 'Transdisciplinary Communication',
  },
  {
    id: 'pub-2',
    title: 'A Thematic Analysis Of Interdisciplinary Journals',
    excerpt:
      'Aim/Purpose: This study investigates the Research Profile of the papers published in Interdisciplinary Journal of Information, Knowledge, and Management (IJIKM). The analysis provides silhouette information of the journal for the editorial team and researchers.',
    authors: 'Shouhong Wang, Hai Wang, Nadia Khalil',
    meta: 'IJIKM , Volume 13 , 2018',
    tag: 'Journal Articles',
    href: '#',
    keywords: 'Interdisciplinary Journal Of Information, Knowledge, and Management; Knowledge Management',
  },
  {
    id: 'pub-3',
    title: 'Predicting The Use Of Twitter In Developing Countries',
    excerpt:
      'Based on the Diffusion of Innovation theory and the Uses and Gratifications theory, this study investigated the factors that influence the use of Twitter among the Kuwait community. Data were gathered using a structured questionnaire.',
    authors: 'Mohammad A. Alajmi, Awadh H. Alharbi, Husain F. Ghoulom',
    meta: 'InformingSciJ , Volume 19 , 2016',
    tag: 'Journal Articles',
    href: '#',
    keywords: 'Social Media, Microblogging, Kuwait, Diffusion Of Innovation',
  },
  {
    id: 'pub-4',
    title: 'Designing To Inform: Toward Conceptualization',
    excerpt:
      'This paper identifies areas in the design science research (DSR) subfield of the Information Systems discipline where a more detailed consideration of practitioner audiences could improve current DSR research practice.',
    authors: 'Andreas Drescherl',
    meta: 'InformingSciJ , Volume 18 , 2015',
    tag: 'Journal Articles',
    href: '#',
    keywords: 'Design Science, Informing Science, Artifacts, Artifacts',
  },
  {
    id: 'pub-5',
    title: 'Fostering Problem-Solving In A Virtual Environment',
    excerpt:
      'This article investigates students’ perceptions of the relationship between problem-solving and the activities and resources used in a web‑based course on the fundamentals of information technology at a university in Canada.',
    authors: 'Danielle Morin, Jennifer D.E. Thomas, Raafat George Saadé',
    meta: 'JITE:Research , Volume 14 , 2015',
    tag: 'Journal Articles',
    href: '#',
    keywords: 'Critical Thinking Skills, Information Technology, Problem-Solving',
  },
  {
    id: 'pub-6',
    title: 'How The Use Of ICT Can Contribute To A Misleading Picture Of Conditions',
    excerpt:
      'This paper contributes to the limited research on roles ICT can play in impression‑management strategies and is based on case studies done in the Swedish police. It also gives a theoretical contribution by adopting a holistic approach.',
    authors: 'Stefan Holgersson',
    meta: 'IJIKM , Volume 10 , 2015',
    tag: 'Journal Articles',
    href: '#',
    keywords: 'ICT, Information Quality, Output, Impression‑Management',
  },
  {
    id: 'pub-7',
    title: 'The Road To Become A Legitimate Scholar: Doctoral Education',
    excerpt:
      'The purpose of the doctoral education process is to create and legitimize scholarly researchers. This transformation, from student to scholar, is widely discussed in the literature and is analyzed here with a focus on efficiency and productivity.',
    authors: 'Pia Bøgelund, Erik de Graaff',
    meta: 'IJDS , Volume 10 , 2015',
    tag: 'Conference Proceedings',
    href: '#',
    keywords: 'Legitimate Scholar, Independence, Interdependence',
  },
  {
    id: 'pub-8',
    title: 'Foundations Of Informing Science: 1999–2008',
    excerpt:
      'The transdiscipline Informing Science was first theorized just a decade ago. What is Informing Science? The foundations provide a number of answers and 23 chapters that explore this question and provide a fascinating read.',
    authors: '—',
    meta: 'Book , Volume 1 , 2009',
    tag: 'Books',
    href: '#',
    keywords: 'Informing Science, Theory',
  },
  {
    id: 'pub-9',
    title: 'Action‑Guidance: An Action Research Project',
    excerpt:
      '—',
    authors: 'Antonio Cartelli',
    meta: 'IISIT , Volume 1 , 2004',
    tag: 'Conference Proceedings',
    href: '#',
  },
];

const PublicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('All');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    if (activeTab === 'All') return publications;
    return publications.filter(p => p.tag === activeTab);
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
          <div className="text-xs text-gray-500 mb-[30px]"><a href="/" className="hover:underline">Home</a> <span className="mx-1">›</span> Publications</div>

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
            Publications : Browse And Search ISI Journal Articles, Conference Proceedings.
          </h1>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {current.map((p) => (
              <a key={p.id} href={p.href} className="block h-full">
                <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="text-[13px] font-medium text-[#3E3232] line-clamp-2 mb-2">{p.title}</div>
                  <div className="text-[11px] text-gray-600 line-clamp-3 mb-3">{p.excerpt}</div>
                  {p.keywords && (
                    <div className="text-[12px] text-[#3E3232] mt-2 line-clamp-1">{p.keywords}</div>
                  )}
                  <div className="rounded-lg mt-5 py-3 px-4 flex items-center justify-between" style={{ backgroundColor: '#F5F5F5' }}>
                    <div>
                      <div className="text-[12px] font-medium text-[#3E3232]">{p.authors}</div>
                      <div className="text-[11px] text-gray-600">{p.meta}</div>
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

export default PublicationsPage;


