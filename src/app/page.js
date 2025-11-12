import Image from "next/image";
import Navbar from "./components/Navbar";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className=" ">
      <main className="">
        <Header />
        <Navbar />
        {/* 🔹 Hero Section */}
        <section className="relative w-full h-screen">
          {/* Hero Image */}
          <img
            src="/images/Hero_ex.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />

          {/* Optional Overlay + Centered Text */}

          <div className="absolute inset-0 flex flex-col items-center  text-center space-y-4 mt-106">
            <h6 className="text-white text-lg uppercase tracking-widest">Introducing</h6>
            <h2 className="text-3xl md:text-5xl uppercase font-medium text-white drop-shadow-lg">
              Welcome to MyStore
            </h2>
            <button className="mt-4 cursor-pointer bg-black hover:bg-gray-800 text-white px-6 py-2  font-semibold transition">
              SHOP NOW
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}
