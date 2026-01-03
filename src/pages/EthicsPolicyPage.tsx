import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const EthicsPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1 bg-gray-100 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1560px' }}>
          <div className="w-full">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6">
              <Link to="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> Ethics Policy
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-600 mb-2">Ethics Policy</h1>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Preamble</h2>
              
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Informing Science Institute was founded in 1998 as a global community of academics shaping the future of informing science. Informing Science is the transdisciplinary quest to discover improved ways to inform.
              </p>

              <p className="text-gray-800 text-base leading-relaxed mb-8">
                The purpose of this statement is to articulate the Informing Science Institute's responsibilities and inform readers, authors, reviewers, editors, and governors of our expectations. The Informing Science Institute commits to the highest ethical and professional conduct.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 1. Institute Responsibilities</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">1.1 Mentoring</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                The Informing Science Institute has a proud heritage of colleagues mentoring colleagues. We strongly endorse the belief that we all have obligations to one another, treat each other with respect, and help our colleagues develop as readers, researchers, reviewers, and editors.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">1.2 Open Access</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                The Institute is committed to a policy of setting knowledge free. In this regard, we ensure that all our publications, both journals, and books, are available to all scholars and students online without charge. This allows the informing science community and the general public to gain unlimited and immediate access to scholarly articles. As researchers, we are obligated to ensure that all data and information we make public is sound and of the highest quality possible. We also have a responsibility as researchers to respect the rights of other researchers, publishers, the subjects of our studies, and those who may read and rely upon our reports. As a result of our policies, readers of the journals we publish are assured that the papers they read are derived from truthful, ethical, and current research.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">1.3 Privacy</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                The Informing Science Institute collects the minimal personal information about its reviewers, editors, and members that are needed to conduct business and review papers. Such information is collected with the full consent of such persons and is not used for other purposes without the person's consent.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 2. Author Responsibilities</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.1. Peer Review Process</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                In order to improve their writing and reviewing skills, all authors are required to participate in the peer-review process of their submissions. Except in rare cases, papers that we publish are double-blind externally peer-reviewed, typically by three or more reviewers. Exceptions, such as invited papers, are clearly identified; an invited paper may be published without external review. Cases published in the Journal of Information Technology Education: Discussion Cases are reviewed in a collaborative developmental setting by members of its panel of reviewers, as noted at <a href="https://www.informingscience.org/Journals/JITEDC/ArticleSubmission" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.informingscience.org/Journals/JITEDC/ArticleSubmission</a>, so as not only to ensure that all cases fit with the expectations of the readers but also to mentor authors on how to write discussion cases effectively.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                All authors are responsible for ensuring that they submit their manuscript to only one journal at a time and are made to understand that this is Informing Science Institute's ethical policy. If authors would like to submit their (same) manuscript to an alternative journal before the first journal has reached a publication determination, they must first receive written permission from the first journal's editor of this request to withdraw the paper from further consideration by that journal before submitting the article elsewhere. Because of the time and effort put into the peer review process by reviewers and editors, authors are expected to submit articles in good faith and to recognize that withdrawing a manuscript from one journal to submit it to another outlet is not a trivial action. Submitting the same or substantially the same paper to more than one outlet at a time is a serious breach of professional ethics.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.2. Intellectual Property, Plagiarism, and Use of Copyrighted Material</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                When submitting a paper to a journal published by the Informing Science Institute, the author is required to assert and confirm that the paper does not contain any copyrighted material except, as noted in the paper through proper citation, that the paper is not currently under review by any other publication outlet, that once the paper enters the review process for this journal the author will not submit the paper for publication consideration to any other publication outlet, and that the paper contains no plagiarized material. ISI journals now conduct an online search of submissions to uncover if the material provided has previously been published using iThenticate.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.3. Use of Human Participants in Research</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Authors are required to comply with all rules for human participants in research set forth by their institution and applicable governmental agencies. We recommend that authors include relevant details about ethics or IRB approval for the use of human participants in their research in the body of the paper. If IRB or ethics approval is not required, this may be stated in the body of the paper. Where reviewer or editor concerns are raised in this area, authors are expected to provide documentation of this compliance. Articles may be rejected or retracted when required rules regarding human participants in research have not been followed.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.4. Self-Plagiarism</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Authors should be transparent. Publishing the same material in multiple journals without clearly indicating that fact is self-plagiarism, a form of professional misconduct. This is not to limit the author from reporting the results of the same study to different journals or in separate articles to the same journal as long as a substantial proportion of the material is novel to this paper and the author clearly cites the original publication(s) in which this material appeared earlier. In such cases, direct rewordings and quotations from the prior publication must be cited as such in the submission. If the author is unsure about the level of duplication, the author must inform the journal's Editor-in-Chief at the time of submission. The Editor-in-Chief may allow for exceptions to this policy. In all cases, material that has been published elsewhere must be clearly identified, and the source cited.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.5. Authorship</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Honesty is an essential component of trust. Authors have a duty to be honest about their qualifications and about any potential conflicts of interest.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                When a paper is co-authored, all and only persons who have contributed substantially are to be listed as authors, and all authors give consent for the paper to be published if accepted. A person who has not made a substantial contribution may not be listed. Listing as an author someone who did not contribute to the research or writing of a paper or failing to list someone who did is professional misconduct. Those who make minor contributions to the research or writing should be acknowledged in a statement of thanks but not listed as co-authors.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                No one is to be listed as co-author simply on the basis of an institutional position, such as Head of School or department, or reputation. Co-authors are to be listed in order of their contribution to the research and writing of the paper. For papers based on student research, the student is expected to be listed as the first author unless the faculty member's contribution substantially exceeds that of the student.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.6. Author ID</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                ISI encourages all authors to establish an ORCID ID and add it to their online ISI profile.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.7 Responsibility for Accuracy</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Authors are responsible for ensuring and certifying that the data reported in their manuscript is genuine and reliable. Authors are responsible for ensuring that any statistical results presented in their manuscript are properly calculated and not manipulated. Authors agree to retain their datasets and provide them upon request to other researchers.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Authors are responsible for contacting their journal's editor promptly should they uncover an error or omission in their manuscript, both before and after publication. In addition, authors are responsible for providing editors with the information needed to publish a prompt retraction or correction in the case of errors or omissions.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">2.8 Responsibility to Credit Others</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Authors are responsible for citing and accurately listing all works that had a material influence on their research in their manuscript's reference list.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Authors are responsible for including an appropriate note acknowledging any financial support used in the research reported upon in their manuscript.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 3. Reviewer Responsibilities</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">3.1. Quality Reviews</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Reviewers have the responsibility for preparing thoughtful and objective manuscript evaluations. Unlike most other journals, Informing Science Institute's journals demand mentorship from its reviewers, requiring them to provide substantive, constructive suggestions to improve the submission, even if the reviewer does not recommend publication of the paper.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                All reviews should include mention of any relevant published work they are aware of that is not cited in the original manuscript.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">3.2. Objective Reviews</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                To avoid potential bias, reviewers are expected to recuse themselves from evaluating papers where they recognize that they have or have had a close relationship with one or more of the paper's authors.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Reviewers must also recuse themselves from commenting upon papers where they may have a conflict of interest with respect to the research topic or funders.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">3.3. Reviewer Expertise</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                When a paper is assigned, reviewers should evaluate their own qualifications and skill level. If the paper is outside the reviewer's area of expertise, the reviewer is expected to respond with constructive feedback regarding the areas the reviewer can respond upon, such as readability, development, and understandability to a reader not familiar with this line of inquiry.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">3.4. Paper Confidentiality</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Reviewers must maintain confidentiality during the review process. Reviewers may not disclose or use the contents of papers submitted to a journal that are yet to be accepted for publication. They also may not disclose the contents of papers not selected for publication.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 4. Editor Responsibilities</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">4.1. Publication Determinations</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Editors have absolute responsibility and authority for making recommendations to the editor-in-chief on paper publication. Editors are responsible for providing objective evaluations of all papers submitted to them. The editor, serving as chair of the paper's ad hoc review committee, composes a development letter for the author describing the strengths of the paper and areas for improvement. Raw reviewer reports are not included in the development letter. Instead, the development letter writes with a single voice on behalf of the review committee that the editor chairs.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Editors should recommend to the editor-in-chief acceptance of papers for publication "subject to revisions" only when they are reasonably certain that the paper will become fully publishable in a reasonable amount of time.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">4.2. Integrity</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Editors work with authors and Editorial Board members as necessary to ensure all are advised of the Informing Science Institute's ethics and publishing policies and enforce those policies in a fair and consistent manner. Editors also ensure that reviews are fair, unbiased, and timely.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Editors should have no material conflict of interest with respect to any paper that they are responsible for evaluating and should therefore recuse themselves in such instances.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">4.3. Retractions</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Editors have absolute responsibility and authority for ensuring that when an error or omission is detected in a previously published paper, a correction or retraction is promptly published. See Section 6 for guidelines for retractions and corrections.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">4.4. Reviewer Anonymity</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Editors have a duty to preserve the anonymity of each paper's reviewers. However, the journal website does publically recognize the contributions of reviewers without connected reviewers to specific papers.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">4.5. Paper Confidentiality</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Editors may not disclose or use the contents of papers submitted to a journal that are not yet accepted for publication. They also may not disclose the contents of papers not selected for publication.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 5. Board of Governors Responsibilities</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">5.1. Safeguarding Publishing Ethics</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Executive Director and Board of Governors have primary responsibility for maintaining the integrity of the academic record.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Executive Director and Board of Governors must not allow business needs or concerns for a journal or personal reputations to compromise their commitment to intellectual honesty or their ethical/moral standards. Similarly, we hold that it is unethical for any publisher to hold back the publication of a paper simply because the current issue is already full. For this reason, papers and cases will be published without undue delay as soon as they are accepted for publication without regard to profit.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Executive Director and Board of Governors are responsible for upholding the values and commitments expressed in this statement on ethics and misconduct.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Executive Director and Board of Governors are responsible for monitoring publishing ethics and acting promptly when ethical issues arise.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                The Executive Director and Board of Governors will publish retractions, corrections, clarifications, or apologies willingly and promptly. See Section 6 for guidelines for retractions and corrections.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                The Executive Director and Board of Governors are responsible for updating and enforcing this statement on ethics and misconduct.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 6. Guidelines for Retractions and Corrections</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">6.1. Speed of Reporting</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                All corrections of any type will be published promptly. Speed is of the essence to limit the potential damage from others who may rely on faulty research to maintain academic integrity.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">6.2. Retractions and Statements of Concern</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                We will publish retractions in cases where convincing evidence indicates plagiarism, self-plagiarism, unreliable data or statistical results, mistreatment of human participants, or other unethical research.
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                If the evidence in such cases is inconclusive or will take a long time to determine whether there has been a serious issue, the Executive Director or Board of Governors may decide to issue a Statement of Concern.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">6.3. Corrections</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                We will publish corrections for small errors in otherwise worthy manuscripts where authors may have made a mistake, but there was no intentional unethical activity, and the vast majority of a manuscript is sound.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">6.4. Prominence of Retractions and Corrections</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-8">
                Retractions, Statements of Concern, and Corrections will link to the original article in our online publication and be published in the next online version and the printed version if it has not already been printed. Statements of Concern that are resolved will be removed from the online version and, depending on timing, either not published in print at all, or their resolution will be published in the next print issue.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Section 7. Enforcement</h3>

              <h4 className="text-lg font-bold text-gray-900 mb-3">7.1. Reporting a Violation</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-6">
                Anyone may report a violation or suspected violation by emailing the Chair of the Ethics Committee of the Informing Science Institute at <a href="mailto:EthicsChair@informingscience.org" className="text-blue-600 hover:underline">EthicsChair@informingscience.org</a>. Those accused of violation of these policies will be objectively investigated by the Board of Governors of the Informing Science Institute. Governors with a personal or professional interest in the case will be expected to recuse themselves.
              </p>

              <h4 className="text-lg font-bold text-gray-900 mb-3">7.2. Investigation Process</h4>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Those involved will be notified of concerns and allowed to provide evidence and clarification.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                Following the investigation for professional misconduct, sanctions (if any are taken) may include temporary or permanent barring from ISI journals and conferences and notifying the offender's employer of the Board's findings. The individual's supervisor may be notified of the finding of the investigations should the investigation find a serious breach of professional ethics.
              </p>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

export default EthicsPolicyPage;



