"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Bestproducts } from "../data/products";

export default function ShopCarousel() {

  return (
    <section className="py-4 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center items-center m-8 text-3xl md:text-4xl  font-light tracking-[0.25em]"
        >
          COLLECTION
        </motion.h2>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        // viewport={{ once: true }} ensures animation happens only once
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 2500 }}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {Bestproducts.map((item) => (

              <SwiperSlide key={item.id}>
                <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500">

                  {/* Product Image */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition duration-500">

                    <h3 className="text-white text-xl font-medium tracking-wide">
                      {item.name}
                    </h3>

                    <button className="px-6 py-2 bg-white text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white border transition rounded">
                      View Product
                    </button>

                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-3 text-center">
                  <p className="uppercase text-lg font-bold">{item.category}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
