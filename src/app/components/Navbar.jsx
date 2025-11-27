"use client";
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* 🔹 Navbar */}
            <nav className="relative w-full flex items-center justify-between bg-transparent text-white z-10 px-10 py-6">

                <div>

                    {/* Hamburger Icon */}
                    <button onClick={() => setIsOpen(true)} className="focus:outline-none m-2 cursor-pointer">
                        <Menu size={24} />
                    </button>
                    {/* Search Icon */}
                    <button className="focus:outline-none m-2 cursor-pointer">
                        <Search size={24} />
                    </button>
                </div>

                {/* Logo */}
                <h1 className="text-4xl uppercase font-bold tracking-wide cursor-pointer">MyStore</h1>

                <div>
                <button className="focus:outline-none m-2 cursor-pointer">
                    <User size={24} />
                </button>
                    <button className="focus:outline-none m-2 cursor-pointer">
                        <ShoppingCart size={24} />
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
                className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${isOpen ? "translate-x-0" : "-translate-x-full"
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
                </ul>
            </div>
        </>
    );
}
