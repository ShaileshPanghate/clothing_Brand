import Image from "next/image";
import Navbar from "./components/Navbar";
import { Header } from "./components/Header";
import { Newcollection } from "./components/Newcollection";
import Footer from "./components/Footer";
import ShopCarousel from "./components/ShopCarousel";
import ChooseYourFit from "./components/ChooseYourFit";
import ScrollStack from "./components/ScrollStack";

export default function Home() {
  return (
    <div className=" ">
      <main className="">
        <Header />
        <Navbar />
        {/* 🔹 Hero Section */}
        <section className="relative w-full h-screen -mt-22 z-0">
          {/* Hero Image */}
          <img
            // src="/images/Hero_ex.jpg"
            src="/images/on_rocks.jpg"
            alt="Hero"
            className="w-full h-full object-cover z-0 brightness-50"
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

        <section>

          <ShopCarousel />
        </section>

        {/* Banner */}
        <section className="my-10">
          <img
            src="images/banner2.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </section>

        {/* choose your fit */}
        <section>
          <ChooseYourFit />
        </section>

        {/* ScrollStack */}
        <section className="bg-gray-300 h-[530px] p-0 ">
          <ScrollStack />
        </section>

        {/* New Collection */}
        <section >
          <div><h2 className="flex justify-center items-center mt-9 mb-3 text-4xl">BEST SELLERS</h2></div>
          <Newcollection />
        </section>

        {/* Our Bests Sellers */}
        {/* <section >
          <div><h2 className="flex justify-center items-center my-9  text-4xl">OUR BEST SELLERS</h2></div>
          <Bestsellers />
        </section> */}



        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
