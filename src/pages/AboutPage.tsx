import React, { useEffect, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import { apiService } from '../services';

interface ContentItem {
  _id?: string;
  pageType?: string;
  description?: string;
  insertDate?: number;
  [key: string]: any;
}

interface ApiResponse {
  data?: {
    list?: ContentItem[];
    totalCount?: number;
    message?: string;
  };
  status?: number;
  message?: string;
}

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get<ApiResponse>('/content/list', {
        params: { type: 'about' }
      });
      
      // Extract content from response.data.list
      const contents = response?.data?.list || [];
      setContent(contents);
    } catch (err: any) {
      console.error('Error fetching about content:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to render HTML content safely
  const renderContent = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
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
              ) : content && content.length > 0 ? (
                <div>
                  {content.map((item, index) => (
                    <div key={item._id || index} className="mb-8">
                      <div className="bg-[#f5f5f5] rounded-lg px-4 py-3 mb-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-900">Informing Science Institute</h1>
                      </div>
                      {item.description && (
                        <div 
                          className="text-[#3E3232] text-sm leading-6 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={renderContent(item.description)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#f5f5f5] rounded-lg px-4 py-3 mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-900">Informing Science Institute</h1>
                </div>
              )}

              <a href="/join-isi" className="inline-block px-10 py-2 rounded-[6px] text-white hover:opacity-90 transition-colors mt-6" style={{ backgroundColor: '#FF4C7D' }}>
                Join ISI
              </a>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-[#f5f5f5]   rounded-lg p-6 h-full min-h-[100vh]">
                <h3 className="text-lg font-semibold text-[#3E3232] mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Quick Facts
                </h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">Established in 1998</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">14 Academic Journals</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">International Conferences</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">Over 7,000 Colleagues and Members</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">From 75+ Countries</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">From 600+ Organizations</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">90,000+ Website Visits per Month</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">50+ Books Available on Amazon</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default AboutPage;


