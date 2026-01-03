import React, { useEffect, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
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


