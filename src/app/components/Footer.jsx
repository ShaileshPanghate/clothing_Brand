"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
    const images = [
        // "/images/logo/logo.jpg",
        "/images/logo/3.png", // second image
        "/images/logo/4.png" // Third image
    ];

    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev === 0 ? 1 : 0)); // toggle image
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, []);
  return (
    <footer className="bg-[#fffee7] text-gray-800 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 ">
        {/* ===== Logo + Newsletter ===== */}
        <div>
         {/* Logo */}
                <div>
                    <motion.img
                        key={index} // IMPORTANT for animation trigger
                        src={images[index]}
                        alt="Logo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="object-contain w-32 h-14 sm:w-36 sm:h-14 md:w-52 md:h-10 lg:w-64 lg:h-20 z-20"
                    />

                </div>
          <p className="text-sm mb-2">
            Browsing late? Treat yourself to insider access!  
            Subscribe to our newsletter for discounts, early sale alerts, and the freshest looks to elevate your style.
          </p>

          {/* Newsletter */}
          <div className="flex items-center border-b border-gray-400 py-2 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent flex-1 outline-none text-sm placeholder-gray-500"
            />
            <button className="flex items-center gap-1 text-sm hover:underline">
              JOIN →
            </button>
          </div>
        </div>

        {/* ===== Quick Links ===== */}
        <div>
          <h3 className="font-semibold mb-4 text-base">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Exchange Portal</a></li>
            <li><a href="/ShippingDelivery" className="hover:underline">Shipping & Delivery</a></li>
            <li><a href="/CancellationRefund" className="hover:underline">Cancellation & Refund</a></li>
            <li><a href="/PrivacyPolicy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/Terms&Condition" className="hover:underline">Terms & Condition</a></li>
          </ul>
        </div>

        {/* ===== Resources ===== */}
        <div>
          <h3 className="font-semibold mb-4 text-base">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li>swadesidrip.marketing@gmail.com</li>
            <li>+919595831277</li>
            <li> Address:
Plot No. 389, Azamshah Layout,
Ganesh Nagar, Hanuman Nagar,
Nagpur – 440024, Maharashtra, India</li>
          </ul>
        </div>

        {/* ===== Social ===== */}
        <div>
          <h3 className="font-semibold mb-4 text-base">SOCIAL</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-black"><Instagram size={18} /></a>
            <a href="#" className="hover:text-black"><Facebook size={18} /></a>
            <a href="#" className="hover:text-black"><Twitter size={18} /></a>
          </div>
        </div>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className=" text-xs text-gray-600 py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-3">
       

        {/* Payment icons (example only) */}
        {/* <div className="flex gap-3 items-center">
          <Image src="/images/pay/amex.png" alt="Amex" width={30} height={20} />
          <Image src="/images/pay/applepay.png" alt="Apple Pay" width={30} height={20} />
          <Image src="/images/pay/visa.png" alt="Visa" width={30} height={20} />
          <Image src="/images/pay/mastercard.png" alt="Mastercard" width={30} height={20} />
        </div> */}
      </div>
    </footer>
  );
}
