"use client";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { collectionHeader } from "../../public/data";
import { ArrowLeft, ArrowRight } from "lucide-react";

const fabrics = ["Fabric", "Cotton", "Linen", "Polyester", "Wool"];
const prices = ["Sort By Price", "Low to High", "High to Low"];

const dummyProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Black Street Tee #${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 499,
  fabric: fabrics[Math.floor(Math.random() * fabrics.length)],
  category: collectionHeader[i % collectionHeader.length],
  image: "/model.png",
}));

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFabric, setSelectedFabric] = useState("Fabric");
  const [sortBy, setSortBy] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProducts = dummyProducts
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) =>
      selectedFabric === "Fabric" ? true : p.fabric === selectedFabric
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
    <div className="p-4 md:py-8 md:px-0 text-black min-h-screen md:max-w-6xl md:mx-auto">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
        {collectionHeader.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer flex flex-col justify-center items-center border rounded-xl px-6 py-2 transition hover:shadow-md ${
              selectedCategory === cat ? "bg-gray-200 scale-105" : ""
            }`}
          >
            <img
              className="h-16 w-16 md:h-20 md:w-20 object-cover"
              src={cat.logo}
              alt={cat.name}
            />
            <p className="text-sm font-medium mt-2">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        {/* Price Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white border border-black text-black px-4 py-3 rounded-md w-full md:w-1/2"
        >
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>

        {/* Fabric Selection */}
        <select
          value={selectedFabric}
          onChange={(e) => setSelectedFabric(e.target.value)}
          className="bg-white border border-black text-black px-4 py-3 rounded-md w-full md:w-1/2"
        >
          {fabrics.map((fabric) => (
            <option key={fabric} value={fabric}>
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
      <div className="flex justify-end items-center gap-6 mt-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xl font-semibold">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border border-black rounded-full text-black hover:bg-black hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
