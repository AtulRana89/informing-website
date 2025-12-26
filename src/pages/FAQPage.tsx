import React, { useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import ccImg from '../assets/images/cc-By-nc 1.png';
 
const linkBase = ' hover:text-[#295F9A] underline underline-offset-2 break-all';

const AccordionItem: React.FC<{ title: string; content: React.ReactNode; isOpen: boolean; onToggle: () => void }> = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="rounded-xl bg-[#F5F5F5]">
      <button
        onClick={onToggle} 
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left"
      >
        <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900">{title}</span>
        <span className="ml-4 w-6 h-6 flex items-center justify-center rounded-md bg-white text-gray-700">
          {isOpen ? '−' : 'I'}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 sm:px-6 pb-5 text-[15px] leading-relaxed" style={{ color: '#3E3232' }}>
          {content}
        </div>
      )}
    </div>
  );
};

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const items = [
    {
      title: 'What Is The Difference Between An ISI Associate And An ISI Member?',
      content: (
        <p>
          An ISI Associate is an individual with a free ISI account allowing them to be part of the ISI community and support ISI by submitting and reviewing articles, for example. An ISI Member is an individual who has paid the annual membership fee and receives multiple benefits in return.
        </p>
      )
    },
    { title: 'What Benefits Do I Receive As An ISI Member?', content: <p>Members enjoy discounts on conference registration, publication fees where applicable, and other benefits.</p> },
    { title: 'Do I Have To Be An ISI Member To Submit An Article To An ISI Journal?', content: <p>No. Submissions are welcome from both members and non‑members. Membership supports our mission but is not required to submit.</p> },
    { title: 'How Long Does My ISI Membership Last?', content: <p>Memberships are annual and expire one year from the date of purchase unless otherwise stated.</p> },
    { title: 'How Will I Know When My Annual Membership Is Going To Expire?', content: <p>You will receive reminder emails prior to expiration. You can also check your account dashboard for the current expiration date.</p> }
  ];

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

            <section className="mt-10 sm:mt-12 space-y-3">
              {items.map((item, idx) => (
                <AccordionItem
                  key={item.title}
                  title={item.title}
                  content={item.content}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
              ))}
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default FAQPage;


