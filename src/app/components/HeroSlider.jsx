"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

export default function HeroSlider() {
  return (
    <section
      className="
        relative w-full
        h-[40vh]        /* mobile */
        sm:h-[50vh]     /* small tablets */
        md:h-[70vh]     /* tablets and small laptops */
        lg:h-screen     /* desktop full screen */
      "
    >
      <video
        src="/videos/Hero_v1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          w-full h-full
          object-cover      /* ensures perfect responsive scaling */
          transition-all duration-700
        "
      ></video>

      {/* Optional Overlay (remove if not needed) */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
    </section>
  );
}
