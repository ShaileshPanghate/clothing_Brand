"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pt-30 ">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Last updated: 19-12-2025
          Welcome to <span className="font-semibold">Swadesi Drip</span>. By using our
          website, purchasing our products, or engaging with our services, you
          agree to the following Terms & Conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Business Information
        </h2>
        <p className="text-gray-600 mb-4">Website Name: swadesidrip.com

          Business Name: swadesidrip
          <br />
          Email: swadesidrip.marketing@gmail.com

          Phone:  +919595831277
          <br />

          Address:  Plot No. 389, Azamshah Layout,
          Ganesh Nagar, Hanuman Nagar,
          Nagpur – 440024, Maharashtra, India</p>


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
          <br />
          Products sold by Swadesi Drip are intended for personal use only. We are not responsible for any misuse, allergic reactions, or damage resulting from improper handling or care of the products.
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
          All prices are listed in INR (₹) unless stated otherwise.

          Payments are securely processed through Razorpay.
          By making a payment, you authorize Razorpay to process the transaction on your behalf.
          <br />
          Payment Failures & Duplicate Transactions
          <br />
          In case of a failed transaction where the amount is debited but the order is not confirmed, the deducted amount will be refunded to the customer’s original payment method within 5–7 business days, subject to Razorpay and bank processing timelines.
        <br />
        By completing a transaction, you agree to comply with Razorpay’s terms and policies in addition to Swadesi Drip’s Terms & Conditions.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          4. Order Confirmation & Delivery
        </h2>
        <p className="text-gray-600 mb-4">
          Once your order is placed, you will receive a confirmation email.
          Delivery timelines depend on your location and shipping method. Any
          unexpected delays will be communicated promptly.
          <br />
          Delivery timelines are estimates and may vary due to logistics, weather conditions, or other unforeseen circumstances. Swadesi Drip is not responsible for delays caused by courier partners after dispatch.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          5.  Returns & Refunds
        </h2>
        <p className="text-gray-600 mb-4">

          Customers may request a return or exchange within 7 days of delivery for unused, unwashed items in original packaging.

          Once the returned product is received and inspected, refunds will be processed within 5–7 business days to the original payment method.

          Items purchased during sale or promotional offers are not eligible for return or refund unless received in damaged condition.

          <br />
          Order Cancellation

          <br />
          Orders can be cancelled only before they are shipped. Once dispatched, cancellation requests will not be accepted. To cancel an order, customers must contact us immediately via email or phone.
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

        {/* Section 10 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          10. Third-Party Services
        </h2>

        <p className="text-gray-600 mb-4">
          We use third-party services such as Razorpay for payment processing. We are not responsible for their internal policies, downtime, or technical issues.
        </p>

        {/* Section 11 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          11. Governing Law & Jurisdiction
        </h2>

        <p className="text-gray-600 mb-4">
          These Terms & Conditions shall be governed by the laws of India.
          Any disputes shall be subject to the jurisdiction of courts located in Nagpur, Maharashtra. </p>

        {/* Section 12 */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          12. Changes to Terms
        </h2>

        <p className="text-gray-600 mb-4">
          We reserve the right to modify these Terms & Conditions at any time. Updates will be posted on this page, and continued use of the website constitutes acceptance of the changes.</p>

        <h2> Contact Us</h2>
        <p>
          If you have questions or requests about this policy, contact us at:
        </p>
        <address>

          <br />
          Email: <a href="swadesidrip.marketing@gmail.com" className="text-pink-600">swadesidrip.marketing@gmail.com</a>
          <br />
          Phone no. : +919595831277
          <br />
          Address:
          Plot No. 389, Azamshah Layout,
          Ganesh Nagar, Hanuman Nagar,
          Nagpur – 440024, Maharashtra, India

        </address>

      </div>
      <Footer />
    </div>
  );
}
