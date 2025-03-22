import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className={`${currentTheme.main} ${currentTheme.text} min-h-screen py-6 transition-colors duration-300`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`rounded-lg shadow-lg ${currentTheme.main} border ${currentTheme.border} overflow-hidden`}>
          {/* Fixed header section that doesn't scroll */}
          <div className="sticky top-0 z-10 p-6 border-b border-opacity-20 backdrop-blur-sm bg-opacity-90" 
               style={{ 
                 backgroundColor: `var(--${currentTheme.main.slice(3)})`,
                 borderColor: `var(--${currentTheme.border.slice(7)})` 
               }}>
            <h1 className="text-3xl font-bold mb-2 text-center">Terms of Service</h1>
            <p className="text-center text-sm">Last Updated: August 26, 2024</p>
          </div>
          
          {/* Scrollable content area */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <div className="space-y-6">
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">1. Agreement to Terms</h2>
                <p className="mb-3">Welcome to Schedule-SPX. These Terms of Service ("Terms") govern your access to and use of the Schedule-SPX website, mobile application, and services (collectively, the "Service"), operated by Schedule-SPX ("we," "us," or "our").</p>
                <p className="mb-3">By accessing or using our Service, you agree to be bound by these Terms and our <Link to="/privacy" className={`${currentTheme.accent} hover:underline`}>Privacy Policy</Link>. If you disagree with any part of these Terms, you may not access or use our Service.</p>
                <p>These Terms apply to all visitors, users, and others who access or use the Service. Please read them carefully.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
                <p className="mb-3">To use the Service, you must be at least 13 years of age. By using the Service, you represent and warrant that you meet the eligibility requirement. If you are under 18, you represent that you have your parent or guardian's permission to use the Service and that they have read and agree to these Terms on your behalf.</p>
                <p>Users from educational institutions may be subject to additional terms based on their institutional policies. It is your responsibility to comply with any applicable institutional policies when using our Service.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">3. Account Creation and Security</h2>
                <p className="mb-3">When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of these Terms, which may result in immediate termination of your account.</p>
                <p className="mb-3">You are responsible for safeguarding the password and any other credentials used to access your account. You agree not to disclose your password to any third party and to immediately notify us of any unauthorized use of your account. You are solely responsible for any activities or actions that occur under your account, whether or not you have authorized such activities or actions.</p>
                <p>We reserve the right to disable any user account at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">4. Service License and Restrictions</h2>
                <h3 className="text-xl font-medium mb-2">4.1 License</h3>
                <p className="mb-3">Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Service for your personal, non-commercial use.</p>
                
                <h3 className="text-xl font-medium mb-2">4.2 Restrictions</h3>
                <p className="mb-3">You may not:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li>Use the Service in any way that violates any applicable local, state, national, or international law or regulation</li>
                  <li>Attempt to gain unauthorized access to any portion of the Service or any other systems or networks connected to the Service</li>
                  <li>Use the Service to send automated queries to any website or to send any unsolicited commercial email</li>
                  <li>Impersonate or attempt to impersonate another user or any other person or entity</li>
                  <li>Use the Service in any manner that could disable, overburden, damage, or impair the Service</li>
                  <li>Engage in any data mining, data harvesting, data extracting, or any other similar activity in relation to the Service</li>
                  <li>Use any robot, spider, or other automatic device, process, or means to access the Service for any purpose</li>
                  <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of any part of the Service</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property Rights</h2>
                <p className="mb-3">The Service and its original content, features, and functionality are and will remain the exclusive property of Schedule-SPX and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
                <p className="mb-3">Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Schedule-SPX.</p>
                <p>All feedback, comments, or suggestions you provide regarding the Service shall be entirely voluntary and we shall be free to use such feedback, comments, or suggestions as we see fit without any obligation to you.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">6. User Content</h2>
                <p className="mb-3">Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
                <p className="mb-3">By posting User Content on or through the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such User Content on and through the Service. You retain any and all of your rights to any User Content you submit, post, or display on or through the Service and you are responsible for protecting those rights.</p>
                <p>You represent and warrant that: (i) the User Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your User Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">7. Termination</h2>
                <p className="mb-3">We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
                <p className="mb-3">If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.</p>
                <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
                <p className="mb-3">To the maximum extent permitted by applicable law, in no event shall Schedule-SPX, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li>Your access to or use of or inability to access or use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                <p>In no event shall our total liability to you for all claims exceed the amount paid by you, if any, for accessing or using our Service during the twelve (12) months prior to bringing the claim.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">9. Disclaimer</h2>
                <p className="mb-3">Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
                <p className="mb-3">Schedule-SPX does not warrant that: (a) the Service will function uninterrupted, secure, or available at any particular time or location; (b) any errors or defects will be corrected; (c) the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements.</p>
                <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for certain types of damages. Accordingly, some of the above limitations may not apply to you.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
                <p className="mb-3">These Terms shall be governed and construed in accordance with the laws of the State of Georgia, United States, without regard to its conflict of law provisions.</p>
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">11. Dispute Resolution</h2>
                <p className="mb-3">Any disputes arising out of or related to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in Atlanta, Georgia, and judgment on the arbitration award may be entered in any court having jurisdiction thereof.</p>
                <p className="mb-3">Any arbitration under these Terms will take place on an individual basis; class arbitrations and class actions are not permitted. YOU UNDERSTAND THAT BY AGREEING TO THESE TERMS, YOU AND SCHEDULE-SPX ARE EACH WAIVING THE RIGHT TO TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">12. Changes to Terms</h2>
                <p className="mb-3">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the updated terms on this page and updating the "Last Updated" date.</p>
                <p className="mb-3">Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. Please review these Terms periodically for changes. If you do not agree to any of this agreement or any changes to this agreement, do not use, access, or continue to access the Service.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-3">13. Contact Us</h2>
                <p className="mb-3">If you have any questions about these Terms, please contact us at:</p>
                <div className={`p-4 rounded ${currentTheme.accent} bg-opacity-10 mb-4`}>
                  <p><strong>Email:</strong> admin@schedulespx.com</p>
                  <p><strong>Mail:</strong> Schedule-SPX, 2674 Johnson Rd NE, Atlanta, GA 30345</p>
                </div>
                <p>By using our Service, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them.</p>
              </section>
            </div>
          </div>
          
          {/* Footer with shadow to indicate scrollable content */}
          <div className={`p-4 text-center text-sm border-t ${currentTheme.border} border-opacity-20`}>
            <p>© 2024 Schedule-SPX. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
