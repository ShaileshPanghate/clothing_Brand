import Image from "next/image";
import Navbar from "./components/Navbar";
import { Header } from "./components/Header";
import { Newcollection } from "./components/Newcollection";

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

        <div className="flex justify-center  h-screen bg-gray-100">
          {/* Container for both images */}
          <div className="flex w-[1540px] h-[700px] ">

            {/* Image 1 */}
            <div className="relative flex-1 overflow-hidden  group">
              <Image
                src="/images/relwen.webp"
                alt="Menswear"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay button */}
              <div className="absolute inset-0 flex justify-center items-center mt-100">
                <button className="bg-black text-white px-20 py-3 text-xs font-normal tracking-wide transition-all duration-300 hover:bg-white hover:text-black">
                  MENSWEAR
                </button>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative flex-1 overflow-hidden  group">
              <Image
                src="/images/Withnellwomens.jpg"
                alt="Womenswear"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay button */}
              <div className="absolute inset-0 flex justify-center items-center mt-100">
                <button className="bg-black text-white px-20 py-3 text-xs font-normal tracking-wide transition-all duration-300 hover:bg-white hover:text-black">
                  WOMENSWEAR
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* New Collection */}
        {/* <section >
          <div><h2 className="flex justify-center items-center my-8 text-4xl">NEW COLLECTION</h2></div>
          <Newcollection />
        </section> */}
      </main>
    </div>
  );
}
