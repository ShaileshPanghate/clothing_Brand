"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  // Fetch API
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const mapped = data.data.map(p => ({
            ...p,
            title: p.name,
            image: p.images[0] || '/placeholder.jpg'
          }));
          setProducts(mapped);
          setFiltered(mapped);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter + Search + Sort
  useEffect(() => {
    let updated = [...products];

    // Search
    if (search.trim() !== "") {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (category !== "All") {
      updated = updated.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Sort
    if (sort === "low-high") updated.sort((a, b) => a.price - b.price);
    if (sort === "high-low") updated.sort((a, b) => b.price - a.price);
    if (sort === "az") updated.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") updated.sort((a, b) => b.title.localeCompare(a.title));

    setFiltered(updated);
  }, [search, category, sort, products]);

  return (
    <div className=" md:pt-30  bg-gray-50 min-h-screen font-[Poppins]">
      <Navbar />
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
        Product Store
      </h1>

      {/* Filters */}
      <div className="flex flex-col px-6 md:flex-row gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

        {/* Category Filter */}
        <select
          className="w-full md:w-1/4 border p-3 rounded-lg focus:ring-2 focus:ring-black"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Men">Men's Clothing</option>
          <option value="Women">Women's Clothing</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Electronics">Electronics</option>
        </select>

        {/* Sort */}
        <select
          className="w-full md:w-1/4 border p-3 rounded-lg focus:ring-2 focus:ring-black"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="az">Name: A → Z</option>
          <option value="za">Name: Z → A</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 pb-18 gap-8">
          {filtered.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="bg-white border p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <Link href={`/products/${item._id}`}>
                <div className="h-64 w-full overflow-hidden rounded-lg mb-4 bg-gray-50 border border-gray-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h2 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-black transition-colors">
                  {item.title}
                </h2>

                <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider font-medium">
                  {item.category}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <p className="font-bold text-xl">₹{item.price}</p>
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                    Details
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
      <Footer />
    </div>
  );
}
