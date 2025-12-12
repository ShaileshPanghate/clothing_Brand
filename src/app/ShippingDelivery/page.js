"use client";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ShippingDelivery() {
  return (
    <div className="bg-white pt-28  text-gray-800 font-[Poppins]">
      <Navbar />
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-semibold text-center mb-10 text-gray-900"
      >
        Shipping & Delivery – <span className="text-blue-600">Swadesi Drip</span>
      </motion.h1>

      {/* Info Container */}
      <div className="grid md:grid-cols-2 px-12 gap-8">

        {/* Shipping Policy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
          <p className="leading-relaxed mb-3">
            At <strong>Swadesi Drip</strong>, we aim to ship all orders within <strong>1–2 business days</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Standard Delivery: 4–7 business days</li>
            <li>Express Delivery: 2–3 business days</li>
            <li>Tracking details shared via email & SMS</li>
            <li>Free shipping on prepaid orders*</li>
          </ul>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
          <p className="leading-relaxed mb-3">
            Our products are shipped from trusted logistics partners to ensure safe and timely delivery.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>COD available across major locations</li>
            <li>Delayed deliveries may occur in remote areas</li>
            <li>Damaged package? Contact support immediately</li>
            <li>Delivery attempts: 3 before returning to origin</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 text-gray-600 max-w-2xl mx-auto"
      >
        For any shipping or delivery concerns, reach out to our team at  
        <span className="text-blue-600 font-medium"> support@swadesidrip.com</span>
      </motion.p>
      <Footer />
    </div>
  );
}
