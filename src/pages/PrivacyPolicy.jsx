import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 overflow-auto max-h-screen">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: August 26, 2024</p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p>Welcome to Schedule-SPX. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
        <p>We collect information that you provide directly to us, such as when you create an account or use our services. This may include:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Personal information (e.g., name, email address)</li>
          <li>Schedule and event information</li>
          <li>Usage data and preferences</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Personalize your experience</li>
          <li>Communicate with you about our services</li>
          <li>Protect against, investigate, and prevent potentially unlawful or abusive activities</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
        <p>We may use third-party services that collect, monitor and analyze this type of information in order to increase our Service's functionality. These third-party service providers have their own privacy policies addressing how they use such information.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
        <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at admin@schedulespx.com.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
