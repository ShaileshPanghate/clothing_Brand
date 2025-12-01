"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, EffectCube,EffectCards , EffectCreative  } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

export default function HeroSlider() {
 

  return (
    <section className="relative w-full h-screen">
     <video
  src="/videos/Hero_v1.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-auto"
></video>

    </section>
  );
}