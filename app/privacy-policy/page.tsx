import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy | KGR Enterprises',
  description: 'Privacy Policy for KGR Enterprises - Learn how we protect your personal information and data.',
  robots: 'index, follow',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
            <p className="text-gray-300 text-lg">Last updated: April 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-200">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
              <p>
                KGR Enterprises ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your personal information when you visit our website, use our services, or interact with us.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
              <div className="space-y-4 ml-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">Personal Information You Provide:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Service preferences and requirements</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Communication preferences</li>
                    <li>Information provided through contact forms or inquiries</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">Automatically Collected Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>IP address and browsing behavior</li>
                    <li>Device type, operating system, and browser information</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referral sources and exit pages</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>To provide and improve our services</li>
                <li>To respond to your inquiries and customer support requests</li>
                <li>To send service-related announcements and updates</li>
                <li>To process transactions and send related information</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure security</li>
                <li>To personalize and improve your experience</li>
                <li>To conduct marketing and promotional activities (with your consent)</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Service providers who assist us in operating our website and conducting business</li>
                <li>Legal authorities when required by law</li>
                <li>Third parties with your explicit consent</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings. Disabling cookies may affect website functionality.
              </p>
            </section>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Your Privacy Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability requests</li>
              </ul>
              <p>
                To exercise these rights, please contact us at the email address provided below.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13 years old. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information promptly.
              </p>
            </section>

            {/* Policy Updates */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting. Your continued use of our website constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-4 bg-slate-700/50 p-6 rounded-lg border border-slate-600">
              <h2 className="text-2xl font-semibold text-white">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> kgr@invisiblegrillsandsafetynets.in</p>
                <p><strong>Phone:</strong> +91-96185 68669</p>
                <p><strong>Address:</strong> Main Branch - 15-21-150/17, JK Heights, Balaji Nagar, Kukatpally, Hyderabad, Telangana 500072, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
