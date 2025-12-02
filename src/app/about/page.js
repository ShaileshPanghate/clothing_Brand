import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const about = () => {
  return (
     <section className="font-[Poppins] text-gray-800">
      <Navbar />
      {/* HERO SECTION */}
      <div className="relative h-[60vh] w-full">
        <img
          src="/images/banner.png"
          alt="Fashion Models"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Redefining Everyday Comfort & Style
          </h1>
        </div>
      </div>

      {/* ABOUT STORY */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Our Journey</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Founded with the belief that fashion should feel as good as it looks,
          we blend timeless aesthetics with premium comfort.  
          Every stitch, pattern, and design reflects our commitment to quality
          and authenticity — for people who don’t just wear clothes, they live in them.
        </p>
      </div>

      {/* IMAGE + TEXT SECTION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-10">
        
        <img
          src="/images/about-fabric.jpg"
          alt="Premium Fabric"
          className="rounded-xl shadow-md object-cover w-full h-[400px]"
        />

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Premium Fabrics</h3>
          <p className="text-gray-600">
            We select high-quality, breathable, and skin-friendly fabrics designed
            for long-lasting comfort without compromising style.
          </p>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          
          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Sustainability</h4>
            <p className="text-gray-600 text-sm">
              Ethical sourcing and eco-conscious processes are at the heart of every collection.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Quality</h4>
            <p className="text-gray-600 text-sm">
              Designed to last — because true style isn’t disposable.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-semibold">Comfort First</h4>
            <p className="text-gray-600 text-sm">
              Fashion is nothing without comfort. We make clothing that feels lived-in from day one.
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center py-16 px-6">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Wear Confidence. Wear Comfort.
        </h3>
        <p className="text-gray-600 mb-8">
          Join our growing community and experience a new standard in everyday clothing.
        </p>

        <a
          href="/shop"
          className="px-8 py-3 border border-black rounded-md hover:bg-black hover:text-white transition text-lg"
        >
          Explore Collection
        </a>
      </div>
      <Footer />
    </section>
  )
}

export default about;