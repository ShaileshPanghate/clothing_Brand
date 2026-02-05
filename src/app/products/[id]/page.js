"use client"
import { useEffect, useState, use } from "react";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Loader from "@/app/components/Loader";
import { motion } from "framer-motion";

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const p = data.data;
          setProduct({
            ...p,
            title: p.name,
            image: p.images[0] || '/placeholder.jpg'
          });
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!product) return <div className="text-center p-10 pt-34">Product not found</div>;

  return (
    <div className="">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto p-6 pt-34 "
      >
        <div className="overflow-hidden rounded-xl">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain hover:scale-110 duration-500"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold mb-4">₹ {product.price}</p>

          <span className="px-4 py-2 bg-black text-white inline-block rounded uppercase tracking-wider text-sm">
            {product.category}
          </span>

          <button className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors uppercase tracking-widest cursor-pointer">
            Add to Cart
          </button>
        </div>

      </motion.div>
      <Footer />
    </div>
  );
}
