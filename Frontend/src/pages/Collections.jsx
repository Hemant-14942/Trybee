"use client";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const categories = ["Oversized Tees", "Cargos", "T-Shirts", "Shirts", "Hoodies"];
const fabrics = ["All", "Cotton", "Linen", "Polyester", "Wool"];
const prices = ["Default", "Low to High", "High to Low"];

// Dummy data
const dummyProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Black Street Tee #${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 499,
  fabric: fabrics[Math.floor(Math.random() * fabrics.length)],
  category: categories[i % categories.length],
  image:"/model.png"
}));

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFabric, setSelectedFabric] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtering
  const filteredProducts = dummyProducts
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) =>
      selectedFabric === "All" ? true : p.fabric === selectedFabric
    )
    .sort((a, b) => {
      if (sortBy === "Low to High") return a.price - b.price;
      if (sortBy === "High to Low") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-8 text-black min-h-screen">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white transition ${
              selectedCategory === cat ? "bg-blue-500 text-white" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {/* Price Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-transparent border border-blue-400 text-blue-400 px-4 py-2 rounded-md"
        >
          {prices.map((price) => (
            <option
              key={price}
              value={price}
              className="text-black"
            >
              {price}
            </option>
          ))}
        </select>

        {/* Fabric Selection */}
        <select
          value={selectedFabric}
          onChange={(e) => setSelectedFabric(e.target.value)}
          className="bg-transparent border border-blue-400 text-blue-400 px-4 py-2 rounded-md"
        >
          {fabrics.map((fabric) => (
            <option
              key={fabric}
              value={fabric}
              className="text-black"
            >
              {fabric}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-blue-400 rounded-md text-blue-400 hover:bg-blue-500 hover:text-white transition disabled:opacity-30"
        >
          Left Arrow
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-blue-400 rounded-md text-blue-400 hover:bg-blue-500 hover:text-white transition disabled:opacity-30"
        >
          Right Arrow
        </button>
      </div>
    </div>
  );
}
