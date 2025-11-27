"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { products } from "../data/products";

export default function ShopCarousel() {
  return (
    <section className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="flex justify-center items-center m-8 text-4xl"> SHOP COLLECTION</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 2000 }}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative bg-white shadow hover:shadow-lg transition overflow-hidden cursor-pointer">

                {/* Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-110 object-cover"
                />

                {/* Overlay & Centered Text */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/44">
                  <h3 className="text-white text-xl font-semibold tracking-wide">
                    {item.category}
                  </h3>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
