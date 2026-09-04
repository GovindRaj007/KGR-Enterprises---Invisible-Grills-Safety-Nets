import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Terms of Service | KGR Enterprises',
  description: 'Terms of Service for KGR Enterprises - Read our terms and conditions for using our services.',
  alternates: {
    canonical: 'https://invisiblegrillsandsafetynets.in/terms-of-service/',
  },
  robots: 'index, follow',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
            <p className="text-gray-300 text-lg">Last updated: April 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-200">
            {/* Agreement */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
              <p>
                By accessing and using this website and services provided by KGR Enterprises, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Use License */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on KGR Enterprises website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. Disclaimer</h2>
              <p>
                The materials on KGR Enterprises website are provided on an 'as is' basis. KGR Enterprises makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            {/* Limitations */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Limitations</h2>
              <p>
                In no event shall KGR Enterprises or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on KGR Enterprises website, even if KGR Enterprises or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            {/* Accuracy of Materials */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on KGR Enterprises website could include technical, typographical, or photographic errors. KGR Enterprises does not warrant that any of the materials on its website are accurate, complete, or current. KGR Enterprises may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            {/* Materials License */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Materials License</h2>
              <p>
                The materials contained on KGR Enterprises website are protected by applicable copyright and trademark law. Unauthorized use of these materials may violate copyright, trademark, and other laws.
              </p>
            </section>

            {/* Service Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Service Terms</h2>
              <div className="space-y-4 ml-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">Service Agreement:</h3>
                  <p>
                    Upon requesting our services, you agree to provide accurate information and accept our quote and terms. All services are subject to site inspection and confirmation of requirements.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">Payment Terms:</h3>
                  <p>
                    Payment terms will be as agreed upon in the service agreement. Advance payment may be required for some services. All prices are subject to applicable taxes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-100 mb-2">Cancellation Policy:</h3>
                  <p>
                    Cancellation requests must be made in writing. Cancellation fees may apply depending on the timing of the request and services rendered.
                  </p>
                </div>
              </div>
            </section>

            {/* Warranties */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Warranties and Installation</h2>
              <p>
                All products installed by KGR Enterprises come with manufacturer warranties. Installation workmanship is guaranteed for a period of one year from the date of installation, subject to proper maintenance and use as directed.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. Limitation of Liability</h2>
              <p>
                Except as may be expressly set forth in writing by KGR Enterprises, KGR Enterprises shall not be liable to you for any consequential or indirect damages, including lost profits, business interruption, or loss of use arising from the use of or inability to use this website or the services offered.
              </p>
            </section>

            {/* Revision of Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">10. Revision of Terms</h2>
              <p>
                KGR Enterprises may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms of service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">11. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            {/* User Conduct */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">12. User Conduct</h2>
              <p>
                You agree not to use this website or services in any way that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Is unlawful or violates any applicable law or regulation</li>
                <li>Infringes upon intellectual property rights</li>
                <li>Contains viruses or malicious code</li>
                <li>Attempts to gain unauthorized access to systems</li>
                <li>Harasses, defames, or abuses others</li>
                <li>Disrupts the normal flow of communication</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="space-y-4 bg-slate-700/50 p-6 rounded-lg border border-slate-600">
              <h2 className="text-2xl font-semibold text-white">13. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
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
