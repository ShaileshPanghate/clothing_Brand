"use client";
import { useState , useEffect} from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const images = [
        // "/images/logo/logo.jpg",
        "/images/logo/Eng_logo.png", // second image
        "/images/logo/Marathi_logo.png" // Third image
    ];

    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev === 0 ? 1 : 0)); // toggle image
        }, 2000); // 2 seconds

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            {/* 🔹 Navbar */}
            <nav className="relative w-full flex items-center justify-between bg-transparent text-white z-10 px-16 ">

                <div className=" ">
                    {/* Logo */} 
                    <img
                        key={index} // ensures smooth transition
                        src={images[index]}
                        alt="Logo"
                        width={200}
                        className="w-80 h-40 object-contain transition-all duration-700 ease-in-out"
                    />
                </div>



                <div className="flex gap-14 ">

                    {/* Search Icon */}
                    <button className="focus:outline-none  cursor-pointer ">
                        <Search size={28} className="hover:scale-125 hover:opacity-90 transition-all duration-500 ease-in-out cursor-pointer" />
                    </button>
                    <button className="focus:outline-none cursor-pointer">
                        <User size={28} className="hover:scale-125 hover:opacity-90 transition-all duration-300 ease-in-out cursor-pointer" />
                    </button>
                    <button className="focus:outline-none cursor-pointer animate-shake">
                        <ShoppingCart size={28} className="hover:scale-125 hover:opacity-90 transition-all duration-300 ease-in-out cursor-pointer" />
                    </button>
                    {/* Hamburger Icon */}
                    <button onClick={() => setIsOpen(true)} className="focus:outline-none  cursor-pointer">
                        <Menu size={28} className="hover:scale-125 hover:opacity-90 transition-all duration-300 ease-in-out cursor-pointer" />
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
                </ul>
            </div>
        </>
    );
}
