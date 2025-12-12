"use client";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const images = [
        // "/images/logo/logo.jpg",
        "/images/logo/1.png", // second image
        "/images/logo/2.png" // Third image
    ];

    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev === 0 ? 1 : 0)); // toggle image
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            {/* 🔹 Navbar */}
            <nav className="fixed top-0 left-0 w-full flex items-center justify-between
        px-8  sm:px-2 md:px-8 border-b border-white/20  backdrop-blur-lg  bg-black/40 text-white z-20">

                {/* Logo */}
                <div>
                    <Link href="/" className="cursor-pointer">
                        <motion.img
                            key={index}
                            src={images[index]}
                            alt="Logo"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="object-contain w-32 h-14 sm:w-36 sm:h-14 md:w-52 md:h-10 lg:w-64 lg:h-20"
                        />
                    </Link>
                </div>
                {/* Icons */}
                <div className="flex gap-3 sm:gap-6 md:gap-10 lg:gap-14 items-center">

                    <button className="cursor-pointer">
                        <Search size={20} className="sm:size-22 md:size-8 hover:scale-125 transition" />
                    </button>

                    <button className="cursor-pointer">
                        <User size={20} className="sm:size-22 md:size-8 hover:scale-125 transition" />
                    </button>

                    <button className="cursor-pointer animate-shake">
                        <ShoppingCart size={20} className="sm:size-22 md:size-8 hover:scale-125 transition" />
                    </button>

                    <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                        <Menu size={20} className="sm:size-22 md:size-8 hover:scale-125 transition" />
                    </button>
                </div>
            </nav>

            {/* 🔹 Overlay (with blur effect) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20  z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 🔹 Sidebar (slides in from left) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 ">
                    <h2 className="text-lg font-semibold"></h2>
                    <button onClick={() => setIsOpen(false)} className="transition-transform duration-300 hover:scale-115 cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Sidebar Links */}
                <ul className="flex flex-col p-4 space-y-6 text-lg">
                    <li><a href="#" className="hover:text-blue-600">Home</a></li>
                    <li><a href="#" className="hover:text-blue-600">Shop</a></li>
                    <li><a href="/about" className="hover:text-blue-600">About</a></li>
                    <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                    <li><a href="/PrivacyPolicy" className="hover:text-blue-600">PrivacyPolicy</a></li>
                </ul>
            </div>
        </>
    );
}
