import React from 'react'
import Image from "next/image";

export const Newcollection = () => {
  return (
   <>
    <div className="flex justify-center items-center h-[1000px] bg-gray-100 ">
      {/* Outer container */}
      <div className="flex w-full  gap-6 mx-14 mt-0 border-2">
        {/* LEFT (4 images: 2x2 grid) */}
        <div className="grid grid-cols-2 grid-rows-2  flex-1 mt-0 ">
          <div className="relative overflow-hidden  group border-2 w-[300px] h-[340px] ">
            <Image
              src="/images/Hero_ex.jpg"
              alt="Image 1"
              fill
              className=" object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          <div className="relative overflow-hidden  group border-2 w-[300px] h-[340px]">
            <Image
              src="/images/Hero_ex.jpg"
              alt="Image 2"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          <div className="relative overflow-hidden  group border-2 w-[300px] h-[340px]">
            <Image
              src="/images/Hero_ex.jpg"
              alt="Image 3"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          <div className="relative overflow-hidden  group border-2 w-[300px] h-[340px]">
            <Image
              src="/images/Hero_ex.jpg"
              alt="Image 4"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* RIGHT (1 large image) */}
        <div className="relative flex-1 overflow-hidden  group border-2 w-[150px] h-[960px]">
          <Image
            src="/images/Hero_ex.jpg"
            alt="Main Image"
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>
      </div>
    </div>
   </>
  )
}
