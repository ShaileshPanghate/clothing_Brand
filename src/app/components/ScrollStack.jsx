"use client";
import { useEffect, useRef, useState } from "react";


export default function ScrollStackClient() {
  const sections = [
    {
      img: "/images/boomber_j.jpg",
      title: "Premium Fabrics",
      desc: "Crafted using high-quality materials ensuring durability, comfort and style.",
    },
    {
      img: "/images/hoodie.jpg",
      title: "Modern Fit",
      desc: "Designed to match contemporary fashion aesthetics with a perfect fit.",
    },
    {
      img: "/images/print-shirt.jpg",
      title: "Timeless Elegance",
      desc: "Classic designs that remain stylish year after year.",
    },
  ];

  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const autoSlideRef = useRef(null);

  // Auto slide every 2 sec
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % sections.length);
    }, 2000);

    return () => clearInterval(autoSlideRef.current);
  }, []);

  // Scroll only the right-side content (not full page)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const itemHeight = container.scrollHeight / sections.length;

    container.scrollTo({
      top: itemHeight * active,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <section className="max-w-7xl mx-auto px-6">

     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start h-[530px]">

        {/* IMAGE SECTION */}
        <div className="relative">
          <div className="sticky top-28 h-[530px] w-full overflow-hidden">
            {sections.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.title}
                className={`absolute inset-0 w-full h-[530px] object-cover transition-all duration-700 ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* TEXT SECTION */}
        <div
          ref={scrollRef}
          className="space-y-20 h-[400px] overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s, i) => (
            <div
              key={i}
              className={`min-h-[50vh] flex flex-col justify-center transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-50"
                }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{s.desc}</p>
              <button className="px-6 py-2 border border-black rounded-md hover:bg-black hover:text-white transition">
                Learn More
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
