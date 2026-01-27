"use client";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        localStorage.removeItem('user');
        window.location.href = '/';
    };

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
                        <Search size={20} className="sm:size-22 md:size-8 hover:scale-105 transition" />
                    </button>

                    <button className="cursor-pointer">
                        <Link href={isLoggedIn ? "/profile" : "/login"}>
                            <User size={20} className={`sm:size-22 md:size-8 hover:scale-105 transition ${isLoggedIn ? 'text-green-400' : ''}`} />
                        </Link>
                    </button>

                    <button className="cursor-pointer">
                        <Link href="/cart" className="cursor-pointer"> <ShoppingCart size={20} className="sm:size-22 md:size-8 hover:scale-105 transition" /></Link>
                    </button>

                    <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                        <Menu size={20} className="sm:size-22 md:size-8 hover:scale-105 transition" />
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
                    <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                    <li><Link href="/products" className="hover:text-blue-600">Shop</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><Link href="/profile" className="hover:text-blue-600">My Profile</Link></li>
                            <li><button onClick={handleLogout} className="text-left w-full hover:text-red-600 text-red-500 font-medium">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/login" className="hover:text-blue-600">Login</Link></li>
                            <li><Link href="/signup" className="hover:text-blue-600">Create Account</Link></li>
                        </>
                    )}
                    <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
                    <li><Link href="/PrivacyPolicy" className="hover:text-blue-600">Privacy Policy</Link></li>
                </ul>
            </div>
        </>
    );
}
