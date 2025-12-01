import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopCarousel from "./components/ShopCarousel";
import ScrollStack from "./components/ScrollStack";
import HeroSlider from "./components/HeroSlider";
import ClickSpark from "./components/ClickSpark";
import BestSellerss from "./components/BestSellerss";
import Silk from "./components/Silk";
import ScrollStackk, { ScrollStackItemm } from "./components/ScrollStackk";
import { DesignDetails_Head } from "./components/DesignDetails_Head";


export default function Home() {
  return (
    <ClickSpark sparkColor='#752F2F'
      sparkSize={12}
      sparkRadius={18}
      sparkCount={8}
      duration={600}>
      <div>

        <main className="">
          {/* <Header /> */}
          <Navbar />
          {/* 🔹 Hero Section */}
          <section
            className="relative w-full  md:h-screen mt-0  z-0"
          >
            <HeroSlider />
          </section>


          <section className=" ">
            <ShopCarousel />
          </section>

          <section className="">
            <video src="/videos/Hero_v1.mp4" autoPlay muted loop playsInline className="w-full h-auto"></video>
          </section>

          {/* Banner */}
          <section className="my-10 bg-[#dac4b5]">
            {/* <img
              src="images/banner2.jpg"
              alt="banner"
              className="w-full h-full object-cover"
            /> */}
          </section>

          {/* choose your fit */}
         

          <section className="relative h-[530px] overflow-hidden">

            {/* Background Layer */}
            <div className="absolute inset-0 -z-10 opacity-40">
              <Silk
                speed={5}
                scale={1}
                color="#dac4b5"
                noiseIntensity={1.5}
                rotation={0}
              />
            </div>

            {/* SCROLL STACK CONTENT */}
            <ScrollStack />

          </section>


          {/* New Collection */}
          <section className="bg-[#dac4b5]">
            {/* <Newcollection /> */}
            <BestSellerss />
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
    </ClickSpark>
  );
}
