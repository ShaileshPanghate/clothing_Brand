"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pt-30 px-4">
        <Navbar />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to <span className="font-semibold">Swadesi Drip</span>. By using our
          website, purchasing our products, or engaging with our services, you
          agree to the following Terms & Conditions. Please read them carefully.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          1. General Information
        </h2>
        <p className="text-gray-600 mb-4">
          Swadesi Drip is an Indian clothing brand offering premium-quality
          apparel. These terms apply to all users of our platform, including
          shoppers, visitors, and subscribers.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          2. Product Information
        </h2>
        <p className="text-gray-600 mb-4">
          We try our best to ensure all product details, colors, and sizes are
          represented accurately. However, variations may occur due to screen
          differences or fabric characteristics. Swadesi Drip reserves the right
          to modify or discontinue products at any time.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          3. Pricing & Payments
        </h2>
        <p className="text-gray-600 mb-4">
          All prices displayed are final and inclusive of applicable taxes unless
          stated otherwise. We accept multiple payment methods, and all
          transactions are processed securely. Swadesi Drip reserves the right to
          update pricing without prior notice.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Order Confirmation & Delivery
        </h2>
        <p className="text-gray-600 mb-4">
          Once your order is placed, you will receive a confirmation email.
          Delivery timelines depend on your location and shipping method. Any
          unexpected delays will be communicated promptly.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          5. Returns & Exchanges
        </h2>
        <p className="text-gray-600 mb-4">
          We offer returns and exchanges for unused, unwashed products in their
          original packaging within 7 days of delivery. Items purchased during
          sales or special promotions may not be eligible for return.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          6. Intellectual Property
        </h2>
        <p className="text-gray-600 mb-4">
          All branding, designs, logos, product images, and website content belong
          to Swadesi Drip. Unauthorized reproduction or distribution is strictly
          prohibited.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          7. Privacy & Data Protection
        </h2>
        <p className="text-gray-600 mb-4">
          We respect your privacy and handle your data securely. Personal
          information is used only to process orders, improve user experience, and
          provide updates with your consent.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          8. Limitation of Liability
        </h2>
        <p className="text-gray-600 mb-4">
          Swadesi Drip is not liable for any indirect damages such as lost
          profits, delays caused by carriers, or incorrect address information
          provided by customers.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          9. Updates to Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We may update these Terms & Conditions from time to time. Continued use
          of our website implies acceptance of the updated policies.
        </p>

       
      </div>
      <Footer />
    </div>
  );
}
