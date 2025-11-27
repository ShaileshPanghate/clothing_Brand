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
  const sectionRefs = useRef([]);

  // Ensure array length matches sections
  sectionRefs.current = [];

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.6, // when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          setActive(idx);
        }
      });
    }, options);

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const bindRef = (el, i) => {
    sectionRefs.current[i] = el;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 ">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start  h-[530px] ">
        {/* LEFT: Sticky Image */}
        <div className="relative">
          <div className="sticky top-28 h-[530px] w-full overflow-hidden ">
            {/* show active image with smooth fade */}
            {sections.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.title}
                className={`absolute inset-0 w-full h-[530px] object-cover transition-opacity duration-600 ${
                  i === active ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{ transitionProperty: "opacity", transitionDuration: "500ms" }}
              />
            ))}

            {/* Optional translucent overlay for readability */}
            <div className="absolute inset-0 pointer-events-none bg-black/10"></div>
          </div>
        </div>

        {/* RIGHT: Content (normal page scroll) */}
        <div className="space-y-20  h-[400px]  overflow-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {sections.map((s, i) => (
            <article
              key={i}
              data-index={i}
              ref={(el) => bindRef(el, i)}
              className="min-h-[50vh] flex flex-col justify-center"
            >
              <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{s.desc}</p>
              <div>
                <button className="px-6 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition">
                  Learn More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
