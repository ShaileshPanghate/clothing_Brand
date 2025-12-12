"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    const phoneNumber = "919595831277"; // WhatsApp number (with country code)

    const whatsappMessage = `Full Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(url, "_blank");

    setSubmitted(true);
  };

  return (
    <section className="font-[Poppins] text-gray-800">
      <Navbar />
      {/* HERO */}
      <div className="relative h-[45vh] w-full">
        <img
          src="/images/contact-hero.jpg"
          alt="Fashion Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Get In Touch
          </h1>
        </div>
      </div>


      {/* CONTACT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* LEFT INFO */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">We’d Love to Hear From You</h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you have a question about sizing, materials, orders, or collaborations —
            our team is here to help.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700">
              📍 <strong>Address:</strong> Address:- PLOT NO 389 AZAMSHAH LAYOUT GANESH NAGAR HANUMAN
              NAGAR NAGPUR
              Nagpur
              27-440024
              India
            </p>
            <p className="text-gray-700">
              📧 <strong>Email:</strong> swadesidrip.marketing@gmail.com
            </p>
            <p className="text-gray-700">
              📞 <strong>Phone:</strong> +919595831277
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 pt-4">
            <a className="hover:text-black text-gray-600 transition">Instagram</a>
            <a className="hover:text-black text-gray-600 transition">Facebook</a>
            <a className="hover:text-black text-gray-600 transition">Twitter</a>
          </div>
        </div>


        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border rounded-xl p-6 md:p-8 shadow-md bg-white"
        >
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              required
              type="text"
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              required
              type="email"
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              required
              rows="5"
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm text-center animate-fadeIn">
              ✔ Message sent! Our team will get back to you soon.
            </p>
          )}
        </form>
      </div>


      {/* MAP SECTION (OPTIONAL) */}
      <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-600">
        Map or Store Locator Coming Soon
      </div>
      <Footer />
    </section>
  );
}
