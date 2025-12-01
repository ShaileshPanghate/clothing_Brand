"use client"
import React from 'react'
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Newcollection = () => {
    return (
        <>
         <motion.h2
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="uppercase flex justify-center items-center m-8 text-4xl  font-light tracking-[0.25em]"
            >
              best sellers
            </motion.h2>
            <div className="flex justify-center items-center h-[1000px]  ">
                {/* Outer container */}
                <div className="flex w-full  gap-6 mx-14 mt-0 ">
                    {/* LEFT (4 images: 2x2 grid) */}
                    <div className="grid grid-cols-2 grid-rows-2  flex-1 mt-0 ">
                        {/* Product 1 */}
                        <div className="flex flex-col items-center">
                            <div className="relative overflow-hidden group  w-[300px] h-[340px] ">
                                <Image
                                    src="/images/jeans-jaket.avif"
                                    alt="Product 1"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                            </div>

                            {/* Product details */}
                            <div className="text-center mt-4 space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900 uppercase">Classic Denim Jacket</h3>
                                <p className="text-sm text-gray-500 uppercase">Menswear</p>
                                <p className="text-base font-semibold text-gray-800">₹2,499</p>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="flex flex-col items-center">
                            <div className="relative overflow-hidden group  w-[300px] h-[340px] ">
                                <Image
                                    src="/images/blue-shirt.png"
                                    alt="Product 2"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                            </div>

                            <div className="text-center mt-4 space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900 uppercase">Casual Linen Shirt</h3>
                                <p className="text-sm text-gray-500 uppercase">Menswear</p>
                                <p className="text-base font-semibold text-gray-800">₹1,299</p>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div className="flex flex-col items-center">
                            <div className="relative overflow-hidden group  w-[300px] h-[340px] ">
                                <Image
                                    src="/images/print-shirt.jpg"
                                    alt="Product 3"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                            </div>

                            <div className="text-center mt-4 space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900 uppercase">Printed Shirt</h3>
                                <p className="text-sm text-gray-500 uppercase">Womenswear</p>
                                <p className="text-base font-semibold text-gray-800">₹1,799</p>
                            </div>
                        </div>

                        {/* Product 4 */}
                        <div className="flex flex-col items-center">
                            <div className="relative overflow-hidden group  w-[300px] h-[340px] ">
                                <Image
                                    src="/images/bagg.jpg"
                                    alt="Product 4"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                            </div>

                            <div className="text-center mt-4 space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900 uppercase">Leather Handbag</h3>
                                <p className="text-sm text-gray-500 uppercase">Accessories</p>
                                <p className="text-base font-semibold text-gray-800">₹3,999</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT (1 large image) */}
                    <div className="relative flex-1 overflow-hidden   w-[150px] h-[960px]">
                        <Image
                            src="/images/full_img.webp"
                            alt="Main Image"
                            fill
                            className="object-cover brightness-75"
                        />
                        {/* Centered Text + Button */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-4">
                            <p className="text-white text-lg font-medium">Celebrating the festival of lights</p>
                            <button className="relative overflow-hidden flex items-center justify-center bg-black text-white px-6 py-2 text-xs font-normal tracking-wide transition-all duration-300 group">
                                {/* Text + Icon */}
                                <span className="mr-3 px-2 z-10 transition-colors duration-300 group-hover:text-black">
                                    SHOP NOW
                                </span>
                                <ArrowRight className="w-4 h-4 z-10 transition-colors duration-300 group-hover:text-black" />

                                {/* Bottom-to-top overlay (works now!) */}
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
