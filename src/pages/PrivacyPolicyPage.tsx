import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1560px' }}>
          <div className="w-full">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6">
              <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Privacy Policy
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-600 mb-2">Privacy Policy</h1>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informing Science Institute Privacy Policy</h2>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Informing Science Institute Privacy Policy shown below is adapted from and is guided by the Privacy Policy used by the ACM, an association for which we have much respect.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Informing Science Institute ("ISI," "we," "us," or "our") is committed to protecting the privacy of its members and other individuals with whom it interacts.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4">
                This Privacy Policy ("<strong>Policy</strong>") explains how we use and maintain the privacy of personal information we collect online in connection with the ISI.org web site (the "<strong>Web Site</strong>"). For the purposes of any applicable data protection laws (including the EU General Data Protection Regulation), the data controller in relation to your personal information is the Informing Science Institute, with headquarters currently at 131 Brookhill Court, Santa Rosa, California 95409 USA.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                This Policy will apply to personal information ISI collects or otherwise receives about third parties ("you"), including ISI members ("Members"), when you use our Web Site or otherwise engage with us. Personal information which is provided to us, or otherwise obtained by us, from which you can be identified ("<strong>Personal Information</strong>") will only be used in the manner set out in this Policy. By visiting and/or contacting us through the Web Site (or otherwise engaging with us), you need to be aware that we may collect, use and transfer your Personal Information in the manner described in this Policy.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">1. How We Collect and Use Your Personal Information</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                ISI only collects Personal Information that is relevant to its activities and aims to keep it accurate and up-to-date. Examples of Personal Information that ISI may collect include your name, address and contact details, including your email address and telephone number, age range, gender, whether you identify as a member of an underrepresented group, and if you have a disability. We may use this information to improve our Web Site and wider offerings (on a confidential basis) or to comply with our legal obligations. Personal Information is primarily used for staying in touch with you and generally for the purposes for which you provided it.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4">
                ISI may use your Personal Information for the following specific purposes:
              </p>

              <ul className="list-disc list-inside text-gray-800 text-base leading-relaxed mb-6 space-y-2">
                <li>process your request to join ISI as a member, and for the renewal and update (and general administration) of your membership;</li>
                <li>process orders and supply the products and/or services you have requested and to provide information or support to you in respect of those products and/or services;</li>
                <li>process your application and registration for a conference, contest or other activity.</li>
              </ul>

              <h4 className="text-lg font-bold text-gray-900 mb-4">Member Databases</h4>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                ISI maintains member databases that contain mailing, billing, and Member profile information (such as your name, address and contact details), as well as a record of each Member's product and service purchases. ISI also maintains databases of Member and non-member purchases and of registrations for conferences and other ISI activities. This information is used by authorized ISI staff members to process orders; mail invoices, purchases, renewal notices, and announcements; respond to Member inquiries, and help us improve our offerings. Member records are maintained as long as an individual is an ISI member and for two years following a membership lapse. Purchases and credit card transactions are retained for as long as required to meet contractual, tax, or auditing needs.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-6">
                All personally identifiable information contained in ISI membership, purchase, and registration databases is treated as confidential and will be used only for the purposes stated in this Policy, except where required by law.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-4">ISI Emails</h4>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                From time to time, ISI may send emails to Members, Colleagues, or other visitors to the Web Site, such as:
              </p>

              <ol className="list-decimal list-inside text-gray-800 text-base leading-relaxed mb-4 space-y-2">
                <li><strong>"Must Have" messages</strong>: These are messages that help to service ISI Members including answers to Member questions; information about submissions to a journal or conference, reminders, acknowledgments of the receipt of membership applications, renewal notices, and other orders;</li>
                <li><strong>Occasional "Member Update" announcements</strong>: These are about ISI services that we believe to be of some importance to Members. These announcements are short, straightforward messages that contain pointers to online resources where members can explore the information more fully;</li>
                <li><strong>Email messages that are a part of a program</strong>: Specifically, for which a Member has registered (e.g., conferences); and</li>
                <li><strong>Targeted emails</strong>: These are sent where we have the consent of Members or users, emails targeted at specific ISI groups and which are on distribution lists (e.g., special interest group members, chapter officers, etc.). Only ISI headquarters staff can create and support "InformingScience.org" email distribution lists.</li>
              </ol>

              <p className="text-gray-800 text-base leading-relaxed mb-6">
                ISI does not sell, rent, or exchange email addresses of its Members and customers. If at any time you decide that you no longer wish to receive any of the emails described above, you may do so by using the "unsubscribe" instructions set out at the bottom of each email or selecting this option your ISI dashboard.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-4">ISI Web Accounts</h4>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Some portions of the ISI Web Site require an ISI Web Account for both Members and visitors. To create an account, ISI Members and customers must provide their name and email address. Email addresses are used as a "username" (which they may change) and asked to create a password. The system emails a verification email to which the Member must respond to obtain an ISI account.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Non-members ("ISI Colleagues" and those ordering printed books and journals) are asked for their name and email address when they create their account. ISI may send information about ISI products and services which we think may be of interest to non-member ISI Web account holders via email. If at any point you decide that you do not want to receive these emails, you may do so by using the "unsubscribe" instructions set out at the bottom of each email.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-4">Postal Mail</h4>
              
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                ISI does not send information by postal mail unless specifically requested by the Member.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">2. Technical Personal Information</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Other than in the restricted-access portions of the Web Site that require an ISI Web Account, ISI does not log the identity of visitors. However, we may keep access logs, for example containing a visitor's IP address and search queries. We may analyze log files periodically to help maintain and improve our Web Site and enforce our online service policies. ISI only uses analytical cookies and does not use any user-specific targeting cookies.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4">
                A cookie is a small file of letter and numbers that is placed on your device. Cookies are only set by ISI when you visit restricted portions of our Web Site and help us to provide you with an enhanced user experience. Raw log files are treated as confidential.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Information collected about ISI Web account usage (including logs of Web pages visited, searches performed, and content downloaded) will be stored in an anonymized form and used to improve the ISI Web offerings.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">3. Third Parties</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                From time to time, we may share Personal Information about ISI Members and customers with third parties where we have your explicit consent, or it is necessary (i) for the performance or provision of the goods or services you have requested, (ii) in response to valid legal process (for example, a search warrant, subpoena, or court order), or (iii) our legitimate business interests.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Third parties with whom your Personal Information may be shared include outside contractors, auditors, consultants, and others hired by ISI to assist in carrying out financial or operational activities. ISI informs these third parties about safeguarding personal information and requires them to use it only for an authorized purpose consistent with this Policy and to return it to ISI or destroy it upon completion of the activity.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Conversely, ISI may receive Personal Information from these third parties (such as Google Analytics) that they collect from you in the course of any engagement you have with them. Where this is the case, once ISI is holding your Personal Information it will be treated in accordance with this Policy.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">4. Global Transfer of Personal Information</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Personal Information you provide to ISI will be transferred to and stored on servers in the United States of America, and we take steps to protect your Personal Information from unauthorized access and against unlawful processing, accidental loss, destruction, and damage.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                ISI is an international organization, and in using and processing your Personal Information, it may on occasion be transferred to, stored and/or processed by our offices located outside of your country of residence. Similarly, ISI may also transfer your Personal Information from your country of residence in connection with our use and retention of your Personal Information as described in this Policy. By submitting your Personal Information, you are acknowledging this transfer, storage, and processing. As ISI recognizes the importance of data security, we require all our offices to handle your data in accordance with this Policy or equivalent data protection provisions, subject to their compliance with local law requirements.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">5. Links</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Our Web Site may, from time to time, contain links to and from the websites of third parties. If you follow a link to any of these websites, note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any Personal Information to these websites.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">6. Security</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                The security of personal information is important to ISI. ISI maintains all personal data with technical, administrative, and physical safeguards to protect against loss, unauthorized access, destruction, misuse, modification, and improper disclosure. No computer system or information can ever be fully protected against every possible hazard. ISI provides reasonable and appropriate security controls to protect personal information against foreseeable hazards.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">7. Changes to this Policy</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Any changes we may make to this Policy in the future will be posted on our Web. It is your responsibility to ensure that you are aware of the latest version of this Policy and by continuing to use our Web Site or otherwise engage with us, you will be deemed to accept any revised terms.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">8. Updating your Personal Information</h3>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                You can find out what Personal Information ISI holds about you by viewing your online dashboard or contacting us at <a href="mailto:executive@informingscience.org" className="text-blue-600 hover:underline">executive@informingscience.org</a>. In the event that any of the Personal Information we hold about you is incorrect, you can correct it in your dashboard or ask us to update it.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                ISI Members may access the Personal Information contained in their membership records and correct and update their member profile themselves in their dashboard or contacting us at <a href="mailto:executive@informingscience.org" className="text-blue-600 hover:underline">executive@informingscience.org</a>.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">9. Contact Us</h3>
              
              <p className="text-gray-800 text-base leading-relaxed">
                Questions, comments, and requests regarding this Policy should be sent to dashboard or contacting us at <a href="mailto:executive@informingscience.org" className="text-blue-600 hover:underline">executive@informingscience.org</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default PrivacyPolicyPage;



