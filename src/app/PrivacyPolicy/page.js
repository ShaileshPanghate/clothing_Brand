"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  const brand = "swadesi drip";
  const effectiveDate = "December 12, 2025";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 md:pt-20">
      <Navbar />
      <div className="mx-auto max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <header className="px-6 py-8 sm:px-10 sm:py-10 bg-linear-to-r from-pink-500 via-red-500 to-yellow-400 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{brand} Privacy Policy</h1>
              <p className="mt-2 text-sm opacity-90">Effective date: {effectiveDate}</p>
            </div>
            <div className="hidden sm:block">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Print / Save
              </button>
            </div>
          </div>
        </header>

        <article className="px-6 py-8 sm:px-10 sm:py-10">
          <section className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              {brand} ("we", "us", or "our") cares about your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or purchase our clothing and
              apparel. By using our services, you agree to the collection and use of information in accordance with this
              policy.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>
                <strong>Personal Information:</strong> name, email address, billing and shipping addresses, phone number,
                and payment details (processed by a third-party payment provider).
              </li>
              <li>
                <strong>Order Information:</strong> items purchased, sizes, colors, order history and returns.
              </li>
              <li>
                <strong>Usage & Device Data:</strong> IP address, browser type, device identifiers, pages visited, and
                interaction data collected through cookies and similar technologies.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill orders, handle returns and exchanges.</li>
              <li>Communicate with you about orders, promotions, and account updates.</li>
              <li>Improve our website and personalize your shopping experience.</li>
              <li>Prevent fraud and comply with legal obligations.</li>
            </ul>

            <h2>4. Cookies & Tracking</h2>
            <p>
              We use cookies, web beacons, and similar technologies to collect usage data and remember your
              preferences. You can manage cookie preferences through your browser settings or our cookie consent tool
              (if available on the site). Disabling some cookies may affect your experience.
            </p>

            <h2>5. Third-Party Services & Sharing</h2>
            <p>
              We may share data with service providers who help us operate the site (payment processors, shipping
              partners, analytics providers, and advertising partners). We require these providers to protect your
              information and use it only for the purposes we specify.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your information only for as long as necessary to fulfill the purposes outlined in this Policy,
              comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2>7. Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your personal data.
              However, no method of transmission or storage is 100% secure — if you suspect any unauthorized access,
              contact us immediately using the details below.
            </p>

            <h2>8. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict
              processing of your personal data. To exercise these rights, contact us at the address below. We will
              respond in accordance with applicable laws.
            </p>

            <h2>9. Children</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly collect personal information from
              children. If you believe we collected data from a child, please contact us so we can promptly delete it.
            </p>

            <h2>10. International Transfers</h2>
            <p>
              Your information may be processed in countries other than your own. We take steps to ensure appropriate
              safeguards are in place when transferring data internationally.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the updated policy on our website and
              update the "Effective date" above. Continuing to use the site after changes means you accept the updated
              policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions or requests about this policy, contact us at:
            </p>
            <address>
              <strong>{brand} Privacy Team</strong>
              <br />
              Email: <a href="swadesidrip.marketing@gmail.com" className="text-pink-600">swadesidrip.marketing@gmail.com</a>
              <br />
              Address: Address:- PLOT NO 389 AZAMSHAH LAYOUT GANESH NAGAR HANUMAN
              NAGAR NAGPUR
              Nagpur
              27-440024
              India
            </address>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Replace the sample contact details, effective date, and any brand references
                with your real data before publishing.
              </p>
            </div>
          </section>
        </article>

        <footer className="px-6 py-6 sm:px-10 sm:py-8 bg-gray-100 text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
            <nav className="flex gap-4">
              <a href="/terms" className="hover:underline">Terms</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <a href="/cookies" className="hover:underline">Cookie Settings</a>
            </nav>
          </div>
        </footer>
      </div>
      <Footer />
    </main>
  );
}
