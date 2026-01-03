import React, { useEffect, useMemo, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import isiIcon from '../assets/images/isi-icon.png';
import editor1 from '../assets/images/editor-1.png';
import editor2 from '../assets/images/editor-2.png';
import testi1 from '../assets/images/testimonial-1.png';
import testi2 from '../assets/images/testimonial-2.png';

type Testimonial = {
  id: string;
  text: string;
  author: string;
  img: string;
};

const testimonials: Testimonial[] = [
  {
    id: 't1',
    text: 'Thanks to your excellent work our paper has been improvement. You are the best',
    author: '— Prof. Ewa Wanda Ziemba, Ambassador, University of Economics in Katowice, Poland',
    img: testi1,
  },
  {
    id: 't2',
    text: 'We appreciate the time and energy spent by the Review Board. We also extend our appreciation to the publisher, Betty Boyd, for her diligent work.',
    author: '— Alice Shu-Ju Lee, University of Macau, Macao',
    img: testi2,
  },
  {
    id: 't3',
    text: 'Thanks to your excellent work our paper has been improvement. You are the best',
    author: '— Prof. Ewa Wanda Ziemba, Ambassador, University of Economics in Katowice, Poland',
    img: testi1,
  },
  {
    id: 't4',
    text: 'We appreciate the time and energy spent by the Review Board. We also extend our appreciation to the publisher, Betty Boyd, for her diligent work.',
    author: '— Alice Shu-Ju Lee, University of Macau, Macao',
    img: testi2,
  },
];

type MemberChoice = {
  tier: 'basic' | 'sponsoring';
  period: '1y' | '5y' | 'life';
};

const CommunityPage: React.FC = () => {
  const [slide, setSlide] = useState(0); // index of first visible testimonial
  const [choice, setChoice] = useState<MemberChoice>({ tier: 'basic', period: '1y' });
  const [visible, setVisible] = useState(2);

  // Responsive slides per view (swiper-like)
  useEffect(() => {
    const updateVisible = () => {
      setVisible(window.innerWidth < 768 ? 1 : 2);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const totalSlides = Math.max(0, testimonials.length - visible);
  const go = (i: number) => setSlide(Math.min(Math.max(0, i), totalSlides));

  const windowed = useMemo(() => testimonials.slice(slide, slide + visible), [slide, visible]);

  // Autoplay
  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((curr) => (curr >= totalSlides ? 0 : curr + 1));
    }, 3500);
    return () => window.clearInterval(id);
  }, [totalSlides]);

  return (
    <div className="min-h-screen bg-white font-['Roboto'] text-[#3E3232]">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6"><a href="/" className="hover:underline">Home</a> <span className="mx-1">›</span> Community</div>

          <div className="">
            {/* Left content */}
            <div>
    <div className='flex gap-12 items-stretch mb-12'>
        <div className="flex-1 min-w-0">
              <p className="text-[18px]  text-[#3E3232] leading-8 mb-6 max-w-[1100px] w-full mb-10">
                The isi community is made up of over 6000 people who are contributing to the field of informing science as authors and reviewers. with a specific focus on mentorship, the isi community is committed to publishing high quality research by providing its community with the tools and knowledge needed to reach both professional and research goals.
              </p>

              {/* Editor/Reviewer of the month */}
              <div className="space-y-4 mt-10">
                <div className="bg-[#F5F5F5] rounded-[12px] p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="w-10 h-10 rounded-[8px] overflow-hidden bg-gray-300 flex-shrink-0">
                      <img src={editor1} alt="Editor avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Editor Of The Month</div>
                      <div className="flex items-center text-[11px] text-gray-600 mt-1">
                        <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        <span className="ml-1">June 2022</span>
                      </div>
                      
                    </div>
                    <div className="text-[12px] text-[#3E3232] w-full mt-1">Prof. Scott J. Lloyd, University Of Rhode Island, United States</div>
                   
                  </div>
                  <button className="text-[11px] px-3 py-1 rounded-[8px] bg-[#EDEDED] border border-gray-200 text-gray-700 hover:bg-gray-200 whitespace-nowrap flex-none">View All</button>
                </div>

                <div className="bg-[#F5F5F5] rounded-[12px] p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="w-10 h-10 rounded-[8px] overflow-hidden bg-gray-300 flex-shrink-0">
                      <img src={editor2} alt="Reviewer avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Reviewer Of The Month</div>
                      <div className="flex items-center text-[11px] text-gray-600 mt-1">
                        <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        <span className="ml-1">June 2022</span>
                      </div>
                     
                    </div>
                    <div className="text-[12px] text-[#3E3232] w-full mt-1">Joseph Budu, Ghana Institute Of Management And Public Administration, Ghana</div>
                    
                  </div>
                  <button className="text-[11px] px-3 py-1 rounded-[8px] bg-[#EDEDED] border border-gray-200 text-gray-700 hover:bg-gray-200 whitespace-nowrap flex-none">View All</button>
                </div>
              </div>
              </div>
               {/* Right sidebar - only for first section */}
            <div className="hidden lg:block w-[340px] flex-shrink-0">
              <div className="bg-[#F5F5F5] rounded-lg p-6 h-full">
                <h3 className="text-lg font-semibold text-[#3E3232] mb-4 flex items-center">
                  <span className="w-[4px] h-[10px] rounded-full mr-2" style={{ backgroundColor: '#4282C8' }}></span>
                  Overview
                </h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">Member Directory</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">The ISI Team</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">Testimonials</a></li>
                  <li><a href="#" className="text-[#3E3232] font-medium hover:underline hover:text-[#4282C8] transition-colors">Partners & Sponsors</a></li>
                </ul>
              </div>
            </div>
    </div>
              {/* Testimonials slider */}
              <h2 className="text-[20px] font-semibold mt-10 mb-3"><span className="inline-block w-[4px] h-[10px] rounded-full mr-2 align-middle" style={{ backgroundColor: '#295F9A' }}></span>Testimonials</h2>
              <div className="overflow-hidden px-2 sm:px-3 py-2 w-full mt-[20px]">
                <div
                  className="flex items-stretch transition-transform duration-500"
                  style={{ transform: `translateX(-${(100 / visible) * slide}%)` }}
                >
                  {testimonials.map((t) => (
                    <div key={t.id} className="px-3 py-5 sm:px-4" style={{ flex: `0 0 ${100 / visible}%` }}>
                      <div className="bg-white rounded-lg shadow-md p-5 h-full flex flex-col">
                        <div className="flex items-center justify-center">
                          <div className="w-[124px] h-[124px] rounded-[12px] overflow-hidden">
                            <img src={t.img} alt="avatar" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="text-[12px] text-center text-[#3E3232]/75 mt-3 min-h-[56px]">{t.text}</div>
                        <div className="mt-auto text-[13px] text-center text-[#3E3232] font-medium bg-gray-100 rounded-md p-3">{t.author}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: totalSlides + 1 }).map((_, i) => (
                  <button key={i} onClick={() => go(i)} className={`w-2.5 h-2.5 rounded-full ${i === slide ? 'bg-[#295F9A]' : 'bg-gray-300'}`} aria-label={`Go to slide ${i+1}`}></button>
                ))}
              </div>

              {/* Join section with pricing cards */}
              <h2 className="text-[20px] font-semibold mt-10 mb-4">Join The ISI Community Of Scholars</h2>
              <p className="text-[18px]  text-[#3E3232] leading-8 mb-6  w-full mb-10">Become an isi colleague to participate as a researcher (to submit articles for review) and/or reviewer (to review submitted articles) for free. become an isi member to gain access to additional benefits and to support free online access to our journals. click select to choose your participation level:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-stretch gap-8 sm:gap-12 md:gap-16 mt-12 px-2 max-w-[900px] mx-auto">
                {/* ISI associate */}
                <div className="shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col">
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI associate</div>
                      <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                    </div>
                    <div className="mt-5 h-28 bg-[#295f9a47] flex items-center justify-center text-[24px] font-semibold text-[#2D3748] mb-5">FREE</div>
                    <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Associates receive access to the following benefits:</div>
                    <ul className="my-4 space-y-4 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                      <li className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A"/><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/></svg>
                        Article Submission
                      </li>
                      <li className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A"/><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/></svg>
                        Article Review
                      </li>
                      <li className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A"/><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/></svg>
                        Personalized Dashboard
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 bg-[#295F9A] mt-auto">
                    <button className="w-full h-11 text-white font-medium hover:opacity-90">Proceed to Payment</button>
                  </div>
                </div>

                {/* ISI Member */}
                <div className="shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col">
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI Member</div>
                      <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                    </div>

                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="text-left  text-[#000] font-medium">
                            <th className="py-2 pr-3"></th>
                            <th className="py-2 pr-3">Basic</th>
                            <th className="py-2 pr-3">Sponsoring</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">1 Year</td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="m1" checked={choice.tier==='basic'&&choice.period==='1y'} onChange={() => setChoice({tier:'basic', period:'1y'})} /> $75 USD</label></td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="m1" checked={choice.tier==='sponsoring'&&choice.period==='1y'} onChange={() => setChoice({tier:'sponsoring', period:'1y'})} /> $125 USD</label></td>
                          </tr>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">5 Year</td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="m2" checked={choice.tier==='basic'&&choice.period==='5y'} onChange={() => setChoice({tier:'basic', period:'5y'})} /> $300 USD</label></td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="m2" checked={choice.tier==='sponsoring'&&choice.period==='5y'} onChange={() => setChoice({tier:'sponsoring', period:'5y'})} /> $500 USD</label></td>
                          </tr>
                          <tr className="border-t font-bold text-[#2D3748]">
                            <td className="py-2 pr-3">Life</td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="m3" checked={choice.tier==='basic'&&choice.period==='life'} onChange={() => setChoice({tier:'basic', period:'life'})} /> $1000 USD</label></td>
                            <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="m3" checked={choice.tier==='sponsoring'&&choice.period==='life'} onChange={() => setChoice({tier:'sponsoring', period:'life'})} /> $5000 USD</label></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 text-[16px] text-[#4A5568]">ISI Members receive access to the following benefits:</div>
                    <ul className="my-4 space-y-4 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                      {[
                        'Article Submission',
                        'Article Review',
                        'Personalized Dashboard',
                        'Member Directory',
                        'Academic Profile Matching',
                        'Personalized Notifications',
                        'Reviewer Certificate',
                        'Discounts',
                        'No Article Publication Fee',
                      ].map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A"/><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/></svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-[#295F9A] mt-auto">
                    <button className="w-full h-11 text-white font-medium hover:opacity-90">Proceed to Payment</button>
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

export default CommunityPage;



