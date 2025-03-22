import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>
            <p className="text-center text-sm">Last Updated: August 26, 2024</p>
          </div>
          
          {/* Scrollable content area */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <div className="space-y-6">
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-3">Welcome to Schedule-SPX ("we," "our," or "us"). We are committed to protecting your privacy and providing you with a secure experience when using our application.</p>
                <p>This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service"). Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
                <p className="mb-3">We may collect the following types of personal information:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li>Account information (name, email address, profile picture)</li>
                  <li>School or institution affiliation</li>
                  <li>Schedule and event information</li>
                  <li>User preferences and settings</li>
                  <li>Authentication information when you log in with third-party services</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2">2.2 Usage Information</h3>
                <p className="mb-3">We automatically collect certain information about your device and how you interact with our Service, including:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li>Device information (hardware model, operating system, unique device identifiers)</li>
                  <li>Log information (IP address, browser type, pages visited, time spent)</li>
                  <li>Location information (general location based on IP address)</li>
                  <li>Usage patterns and feature interaction</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2">2.3 Cookies and Similar Technologies</h3>
                <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to understand how you use our Service. You can control cookies through your browser settings and other tools, but this may impact the functionality of our Service.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect for various purposes, including:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li>Providing, maintaining, and improving our Service</li>
                  <li>Processing and completing transactions</li>
                  <li>Personalizing your experience and content</li>
                  <li>Communicating with you about service-related announcements</li>
                  <li>Responding to your requests, comments, or questions</li>
                  <li>Monitoring and analyzing usage patterns and trends</li>
                  <li>Protecting the security and integrity of our Service</li>
                  <li>Complying with legal obligations</li>
                  <li>Enforcing our terms, conditions, and policies</li>
                </ul>
                <p>We will only process your personal information when we have a lawful basis to do so, such as your consent, to fulfill a contract with you, to comply with a legal obligation, or when we have a legitimate interest.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="mb-3">We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                  <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it's necessary to comply with a legal obligation, protect and defend our rights or property, prevent fraud, or protect the safety of our users or the public.</li>
                  <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                </ul>
                <p>We do not sell your personal information to third parties for monetary or other valuable consideration.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="mb-3">We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
                <p>While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. You are responsible for maintaining the confidentiality of your account credentials and for restricting access to your devices.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">6. Your Data Protection Rights</h2>
                <p className="mb-3">Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li><strong>Access:</strong> You can request copies of your personal information that we hold.</li>
                  <li><strong>Rectification:</strong> You can ask us to correct inaccurate information or complete incomplete information.</li>
                  <li><strong>Erasure:</strong> You can ask us to erase your personal information in certain circumstances.</li>
                  <li><strong>Restriction:</strong> You can ask us to restrict the processing of your information in certain circumstances.</li>
                  <li><strong>Data Portability:</strong> You can ask us to transfer the information you gave us to another organization or to you.</li>
                  <li><strong>Objection:</strong> You can object to the processing of your personal data in certain circumstances.</li>
                </ul>
                <p className="mb-3">If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including:</p>
                <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                  <li>The right to know about the personal information we collect, use, disclose, and sell</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to opt-out of the sale of your personal information</li>
                  <li>The right to non-discrimination for exercising your CCPA rights</li>
                </ul>
                <p>To exercise any of these rights, please contact us using the contact information provided at the end of this Privacy Policy.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
                <p className="mb-3">Our Service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected the personal information of a child under 13 without parental consent, we will take steps to delete such information as soon as possible.</p>
                <p>If you believe we might have any information from or about a child under 13, please contact us.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
                <p className="mb-3">Your information may be transferred to, and maintained on, computers located outside your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.</p>
                <p>If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including personal information, to the United States and process it there. Your submission of such information represents your agreement to that transfer.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">9. Data Retention</h2>
                <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
                <p className="mb-3">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
              </section>
              
              <section className="mb-8">
                <div className={`w-16 h-1 ${currentTheme.accent} mb-4 mx-auto rounded`}></div>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p className="mb-3">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                <div className={`p-4 rounded ${currentTheme.accent} bg-opacity-10 mb-4`}>
                  <p><strong>Email:</strong> admin@schedulespx.com</p>
                  <p><strong>Mail:</strong> Schedule-SPX, 2674 Johnson Rd NE, Atlanta, GA 30345</p>
                </div>
                <p>We will respond to your request within a reasonable timeframe.</p>
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

export default PrivacyPolicy;
