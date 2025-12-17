"use client"
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";


export default async function ProductDetails({ params }) {
  const { id } = await params;

  const product = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json());

  return (
    <div className="">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto p-6 pt-34 ">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain  hover:scale-110 duration-300"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold mb-4">$ {product.price}</p>

          <span className="px-4 py-2 bg-black text-white inline-block rounded">
            Category: {product.category}
          </span>
        </div>

      </div>
      <Footer />
    </div>
  );
}
