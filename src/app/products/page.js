"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  // Fetch API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
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
      updated = updated.filter((p) => p.category === category);
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
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-6 pb-18 gap-6">
        {filtered.map((item) => (
         <a
              href={`/products/${item.id}`}
              key={item.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-contain mb-4"
            />

            <h2 className="font-semibold text-lg mb-2 line-clamp-2">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {item.description}
            </p>

            <p className="font-bold text-xl mb-4">₹{item.price}</p>

            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </a>
        ))}
      </div>
      <Footer />
    </div>
  );
}
