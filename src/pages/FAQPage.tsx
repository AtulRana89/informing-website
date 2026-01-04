import React, { useEffect, useState } from 'react';
import ccImg from '../assets/images/cc-By-nc 1.png';
import PublicFooter from '../components/PublicFooter';
import PublicHeader from '../components/PublicHeader';
import { apiService } from '../services';

interface FAQItem {
  faqId?: string;
  question?: string;
  answer?: string;
  sortOrder?: number;
  status?: string;
  insertDate?: number;
  creationDate?: string;
  [key: string]: any;
}

interface ApiResponse {
  data?: {
    list?: FAQItem[];
    totalCount?: number;
    message?: string;
  };
  status?: number;
  message?: string;
}
const linkBase = ' hover:text-[#295F9A] underline underline-offset-2 break-all';
const AccordionItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void
}> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="rounded-xl bg-[#F5F5F5]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left"
      >
        <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-4 w-6 h-6 flex items-center justify-center rounded-md bg-white text-gray-700">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div
          className="px-4 sm:px-6 pb-5 text-[15px] leading-relaxed"
          style={{ color: '#3E3232' }}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQContent();
  }, []);

  const fetchFAQContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get<ApiResponse>('/faq/list');

      // Extract FAQs from response.data.list and sort by sortOrder
      const faqList = response?.data?.list || [];
      const sortedFaqs = faqList.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setFaqs(sortedFaqs);
    } catch (err: any) {
      console.error('Error fetching FAQ content:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1 overflow-x-hidden">
        <div className="px-4 sm:px-6 lg:px-8 md:pb-10 overflow-x-hidden">
          <div className="max-w-[1500px] mx-auto py-6 sm:py-10">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">FAQ</h1>
            <section className="space-y-4 sm:space-y-5 break-words" style={{ color: '#3E3232' }}>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">DOAJ Principles Of Transparency</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Peer review process: Each journal specifies its review process. In general, all submissions are first reviewed by the Editor‑in‑Chief and successful submissions are blind reviewed by an ad hoc review committee consisting of four or more external reviewers and an Editor.</li>
                <li>Governing Body: The full names and affiliations of organization’s governing body are provided on the journal’s Web site.</li>
                <li>Editorial team/contact information: Journals provide the full names and affiliations of the journal’s editors and reviewers on the journal’s Web site as well as contact information for the editorial office.</li>
                <li>Author fees: There are no fees for reviewing. ISI members pay no fee publication.</li>
                <li>Creative Commons License: Licensing information is clearly described on each journal’s Web site. ISI’s journals publications are now published under the CC BY‑NC 4.0 license:</li>
              </ul>

              <img src={ccImg} alt="CC BY-NC" className="w-24 sm:w-28 md:w-32" />

              <p className="text-[15px] leading-relaxed">
                (CC BY‑NC 4.0) This article is licensed to you under a{' '}
                <a className={linkBase} href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noreferrer">
                  Creative Commons Attribution‑NonCommercial 4.0 International License
                </a>.
                When you copy and redistribute this paper in full or in part, you need to provide proper attribution to it to ensure that others can later locate this work (and to ensure that others do not accuse you of plagiarism). You may (and we encourage you to) adapt, remix, transform, and build upon the material for any noncommercial purposes. This license does not permit you to use this material for commercial purposes.
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Process for identification of and dealing with allegations of research misconduct: The Informing Science Institute policies are shown at{' '}
                  <a className={linkBase} href="http://www.informingscience.org/Pages/EthicsPolicy" target="_blank" rel="noreferrer">http://www.informingscience.org/Pages/EthicsPolicy</a>.
                </li>
                <li>Ownership and management: Journals identified as Informing Science Institute journals are managed by ISI. Partner journals show their ownership and management.</li>
                <li>Web site: Our journal’s Web site, including the text that it contains, demonstrate that care has been taken to ensure high ethical and professional standards. It does not contain misleading information, including any attempt to mimic another journal/publisher’s site.</li>
                <li>Name of journal: The Journal name shall be unique and not be one that is easily confused with another journal or that might mislead potential authors and readers about the Journal’s origin or association with other journals.</li>
                <li>Conflicts of interest: Our policy regarding conflict of interest are shown at{' '}
                  <a className={linkBase} href="http://www.informingscience.org/Pages/EthicsPolicy" target="_blank" rel="noreferrer">http://www.informingscience.org/Pages/EthicsPolicy</a>
                  .
                </li>
                <li>Access: ISI journals require no subscription and are accessible without fee. Printed copies are available for sale on{' '}
                  <a className={linkBase} href="http://Amazon.com" target="_blank" rel="noreferrer">http://Amazon.com</a> and{' '}
                  <a className={linkBase} href="http://ISPress.org" target="_blank" rel="noreferrer">http://ISPress.org</a>.
                </li>
                <li>Revenue sources: ISI receives support via its membership and institutional sponsorships.</li>
                <li>Advertising: At present ISI does not accept advertising within its journal. Institutional support is acknowledged.</li>
                <li>Publishing schedule: Papers are published online as accepted and in paper format at least once a year.</li>
                <li>Archiving: Our journals are archived internally.</li>
                <li>Direct marketing: Any direct marketing activities, including solicitation of manuscripts that are conducted on behalf of the journal, are appropriate, well targeted, and unobtrusive.</li>
              </ul>
            </section>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#295F9A] mx-auto mb-4"></div>
                  <p className="text-[#3E3232]">Loading content...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
              </div>
            ) : faqs && faqs.length > 0 ? (
              <section className="mt-10 sm:mt-12 space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.faqId || index}
                    question={faq.question || ''}
                    answer={faq.answer || ''}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </section>
            ) : (
              <div className="text-center py-10">
                <p className="text-[#3E3232]">No FAQs available.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default FAQPage;


