import React from 'react';
import isiIcon from '../assets/images/isi-icon.png';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const JoinISIPage: React.FC = () => {
  const [plan, setPlan] = React.useState<'1y-basic'|'1y-sponsor'|'5y-basic'|'5y-sponsor'|'life-basic'|'life-sponsor'>('1y-basic');

  return (
    <div className="min-h-screen bg-white font-['Roboto'] text-[#3E3232]">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto">
          {/* Top form area (Contact page style) */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_440px] gap-6">
            <section className="space-y-6 mt-[10px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Personal Name</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Middle Initial</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Family Name</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Affiliation/University</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Department</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">City</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Country</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-[#3E3232] mb-3 font-semibold">Your Email <span className="font-normal">(We Will Send A Confirmation Email To This Account)</span></label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[#295F9A]" />
                Subscribe to our mailing list
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div>
                  <label className="block text-xs text-[#3E3232]  font-semibold">Set Your Password <span className="font-normal">(8 Characters Or Longer)</span></label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
                <div>
                  <label className="block text-xs text-[#3E3232]  font-semibold">Repeat Password (Enter Password Again)</label>
                  <input className="w-full h-10 rounded-md border-0 px-3" style={{ backgroundColor: '#F5F5F5' }} />
                </div>
              </div>
            </section>

            {/* Captcha panel */}
            <aside className="w-full xl:w-[440px] flex-shrink-0 h-full">
                <div className="text-xs text-[#3E3232] mb-3 font-semibold">Enter The Code Below</div>
                <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: '#F5F5F5' }}>
                    
                    <div className="rounded-2xl min-h-[80%] pt-3 border border-dashed border-[#E1E1E1] bg-[#F5F5F5] mx-auto w-[440px] max-w-full flex items-center justify-center flex-col">
                    <div className="font-mono tracking-widest text-[#295F9A] text-2xl sm:text-3xl select-none">7VJ7R1EE</div>
                    <button className="px-6 mt-[15%] mb-4 py-2 rounded-xl border border-gray-300 text-[#3E3232] font-medium hover:shadow-sm mt-5">Refresh</button>
                    </div>
                    <input className="w-full h-10 border border-[#E1E1E1] rounded-md px-3 mt-5" style={{ backgroundColor: '#F5F5F5' }} placeholder="Enter code here" />
                </div>
            </aside>
          </div>

          {/* Pricing cards (reuse Community styles) */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 justify-center items-stretch gap-12 mt-12 max-w-[900px] mx-auto">
            {/* Associate */}
            <div className="shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between">
                  <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI associate</div>
                  <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                </div>
                <div className="mt-5 h-28 bg-[#295f9a47] flex items-center justify-center text-[24px] font-semibold text-[#2D3748] mb-5">FREE</div>
                <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Associates receive access to the following benefits:</div>
                <ul className="my-4 space-y-4 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                  {['Article Submission','Article Review','Personalized Dashboard'].map(i=> (
                    <li key={i} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A"/><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/></svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 bg-[#295F9A] mt-auto">
                <button className="w-full h-11 text-white font-medium">Proceed to Payment</button>
              </div>
            </div>

            {/* Member */}
            <div className="shadow-md overflow-hidden w-full max-w-[380px] mx-auto flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between">
                  <div className="text-[24px] font-semibold text-[#2D3748] mb-5">ISI Member</div>
                  <img src={isiIcon} alt="isi" className="w-[25px] object-contain" />
                </div>
                {/* Small pricing table */}
                <div className="mt-2 overflow-x-auto">
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
                        <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year1" checked={plan==='1y-basic'} onChange={() => setPlan('1y-basic')} /> $75 USD</label></td>
                        <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year1" checked={plan==='1y-sponsor'} onChange={() => setPlan('1y-sponsor')} /> $125 USD</label></td>
                      </tr>
                      <tr className="border-t font-bold text-[#2D3748]">
                        <td className="py-2 pr-3">5 Year</td>
                        <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year5" checked={plan==='5y-basic'} onChange={() => setPlan('5y-basic')} /> $300 USD</label></td>
                        <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="year5" checked={plan==='5y-sponsor'} onChange={() => setPlan('5y-sponsor')} /> $500 USD</label></td>
                      </tr>
                      <tr className="border-t font-bold text-[#2D3748]">
                        <td className="py-2 pr-3">Life</td>
                        <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="life" checked={plan==='life-basic'} onChange={() => setPlan('life-basic')} /> $1000 USD</label></td>
                        <td className="py-2 pr-3"><label className="inline-flex items-center gap-2"><input className="accent-[#295F9A]" type="radio" name="life" checked={plan==='life-sponsor'} onChange={() => setPlan('life-sponsor')} /> $5000 USD</label></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-[16px] text-[#4A5568] mb-4">ISI Members receive access to the following benefits:</div>
                <ul className="my-4 space-y-2 text-[16px] text-[#000] font-medium max-w-[250px] w-full mx-auto">
                  {['Article Submission','Article Review','Personalized Dashboard','Member Directory','Academic Profile Matching','Personalized Notifications','Reviewer Certificate','Discounts','No Article Publication Fee'].map(i=> (
                    <li key={i} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#295F9A"/><path fillRule="evenodd" clipRule="evenodd" d="M11.7316 5.45921L6.77118 11.1282L4.26758 8.62463L4.87525 8.01696L6.72932 9.87103L11.0848 4.89331L11.7316 5.45921Z" fill="white"/></svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 bg-[#295F9A] mt-auto">
                <button className="w-full h-11 text-white font-medium">Proceed to Payment</button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 pt-12 pb-12">
            <button className="px-12 py-3 rounded-[14px] text-white text-[16px] font-medium" style={{ backgroundColor: '#FF4C7D' }}>Sign Up</button>
            <div className="flex items-center justify-center gap-8 text-sm text-[#3E3232] mt-8">
              <a href="#" className="hover:underline">ISI Website</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Ethics Policy</a>
              <a href="#" className="hover:underline">Legal Disclaimer</a>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default JoinISIPage;


