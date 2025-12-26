import React from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-[#f5f5f5] rounded-lg px-4 py-3 mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-900">Informing Science Institute</h1>
              </div>
              <p className="text-sm text-[#3E3232] mb-6 mt-5">Exploring Better Ways to Inform.</p>

              {/* About Section */}
              <section className="space-y-4 mb-8">
                <h2 className="text-xl text-gray-900">About the Informing Science Institute</h2>
                <p className="text-[#3E3232] text-sm leading-6">
                  The Informing Science Institute (ISI) is a 501(c)3 charitable association under US tax laws. 
                  <a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=7F4XL35ELFWJG&source=url&ssrt=1757226439331" className="text-[#4282C8] underline ml-1 hover:text-[#295F9A] transition-colors">Make your tax-deductible contribution here</a>.
                </p>
                <p className="text-[#3E3232] text-sm leading-6">
                  Founded in 1998, it is a global community of academics shaping the future of informing science.
                  Informing science is the transdisciplinary quest to discover better ways to inform. The importance of
                  transdisciplinarity in solving real world problems is explored by Andrew Hargadon in his 2003 book
                  <span className="italic"> How Breakthroughs Happen</span>.
                </p>
                <p className="text-[#3E3232] text-sm leading-6">
                  Submitting or publishing papers in any of ISI's peer-reviewed online academic journals is free for ISI
                  Members. Non-members can choose to join or pay a modest article publication fee to cover some of the
                  costs for publication. With the help of sponsoring institutions, ISI hosts the highly regarded annual
                  <a href="/Conferences" className="text-[#4282C8] underline ml-1 hover:text-[#295F9A] transition-colors">InSITE conference</a> in a variety of international locations. ISI electronic publications
                  and e-books are available for free. Hard copies of ISI books and publications are available in the
                  <a href="http://ispress.org/" className="text-[#4282C8] underline ml-1 hover:text-[#295F9A] transition-colors">ISI Shop</a>, where all proceeds enable ISI to continue sharing knowledge online free of charge.
                </p>
              </section>

              {/* Philosophy */}
              <section className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Informing Science Institute Philosophy</h2>
                <p className="text-[#3E3232] text-sm leading-6">
                  The Informing Science Institute is a mentoring organization. One of the Informing Science Institute’s
                  core principles is helping our colleagues to become better and better: better as an author, as a
                  reviewer, as an editor, and as an editor-in-chief. We use the peer review process of our journals to
                  support other colleagues by providing them with constructive suggestions on ways to improve their
                  work even if a submitted article is not accepted for publication. Our Editors-in-Chief assist
                  reviewers and editors by being coaches and guides to the authors, reviewers, and editors.
                </p>
              </section>

              {/* Research Topics */}
              <section className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-900">ISI Research Topics</h2>
                <p className="text-[#3E3232] text-sm leading-6">
                  ISI encourages the sharing of knowledge and collaboration among the wide variety of fields, often using
                  information technology to advance the multidisciplinary study of informing science. These areas can
                  include Business, Communications, Communicating Meaning, Communication and Society, Computer Science,
                  Data Management, Distance Education, eCommerce, Education, eLearning, Government, Health Care,
                  History, Information and Library Science, Journalism, Justice and Law, Mathematics, Management,
                  Philosophical Issues, Psychology, Public Policy, Sociology, and Human Resources.
                </p>
                <p className="text-sm text-[#3E3232]">
                  <a href="http://www.inform.nu/Articles/Vol12/ISJv12p001-015Cohen399.pdf" className="text-[#4282C8] underline hover:text-[#295F9A] transition-colors">A Philosophy of Informing Science</a>
                </p>
              </section>

              {/* How it works */}
              <section className="space-y-4 mb-10">
                <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
                <p className="text-[#3E3232] text-sm leading-6">
                  Anyone can join the ISI Community of Scholars as a colleague for free. This enables you to submit an
                  article for review and to request joining the International Board of Reviewers for any of our journals
                  or conferences. We encourage all ISI Associate to become ISI Members to enhance their membership fee.
                  The membership fee enables free online access to our journals. ISI Members receive additional benefits
                  such as discounts on ISI products and services and access to the ISI Member Directory.
                </p>
                <p className="text-[#3E3232] text-sm leading-6">
                  One of the many benefits from being an ISI member is the ability to see other ISI members' profile
                  summaries, ordered by how closely they match your own. This feature lets you locate potential research
                  collaborators from around the globe. This members-only feature makes you a better-connected colleague.
                </p>
                <p className="text-[#3E3232] text-sm leading-6">
                  Only after a paper has been reviewed and accepted for publication do we require that the corresponding
                  author become an ISI Member, or alternatively, pay a fee equal to the membership fee.
                </p>
              </section>

              <a href="/join-isi" className="inline-block px-10 py-2 rounded-[6px] text-white hover:opacity-90 transition-colors" style={{ backgroundColor: '#FF4C7D' }}>
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


