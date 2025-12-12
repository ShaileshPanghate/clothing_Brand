import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function CancellationRefund() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 ">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Cancellation & Refund Policy  
          <span className="block text-indigo-600 text-xl mt-1">Swadesi Drip</span>
        </h1>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Order Cancellation</h2>
          <p className="text-gray-600 leading-relaxed">
            At <strong>Swadesi Drip</strong>, we understand plans can change.  
            You may cancel your order **within 12 hours** of placing it,  
            as long as it has not been shipped.  
            To cancel, simply email us at  
            <span className="text-indigo-600 font-medium"> support@swadesidrip.com </span>  
            with your order ID.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Refunds</h2>
          <p className="text-gray-600 leading-relaxed">
            If your order is successfully cancelled, the refund will be issued  
            to your original payment method within **5–7 business days**.  
            Refund duration may vary depending on your bank or payment provider.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Return & Replacement</h2>
          <p className="text-gray-600 leading-relaxed">
            We accept returns only for damaged, defective, or incorrect items.
            If you received a damaged or wrong product, please reach out to us within  
            <strong>48 hours of delivery</strong> with images as proof.  
            We will arrange a replacement or issue store credit.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Non-Refundable Items</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Used or washed clothing items</li>
            <li>Items without original tags & packaging</li>
            <li>Customized or personalized products</li>
            <li>Items bought during sale / clearance</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">How to Request a Refund</h2>
          <p className="text-gray-600 leading-relaxed">
            To request a return or refund, contact our support team at  
            <span className="text-indigo-600 font-medium"> support@swadesidrip.com </span>  
            with your order ID and issue details.  
            Our team will guide you lovingly through the process.
          </p>
        </section>

        <p className="text-gray-500 text-sm text-center mt-10">
          Thank you for choosing <strong>Swadesi Drip</strong> — proudly desi, proudly stylish. 💙
        </p>
      </div>
      <Footer />
    </div>
  );
}
