import React, { useContext } from "react";
import { TrybeContext } from "../context/store";
import { Link } from "react-router-dom";

export default function Collection() {
  const { products } = useContext(TrybeContext);

  const tshirts = products.filter((p) => p.category === "T Shirts").slice(0, 2);
  const shirts = products.filter((p) => p.category === "Shirts").slice(0, 2);
  const lowers = products.filter((p) => p.category === "Lowers").slice(0, 2);

  return (
    <section className="px-6 md:px-0 md:max-w-6xl md:mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col gap-10">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">2025</h2>
            <p className="text-gray-700 mt-2 max-w-sm">
              Discover timeless elegance with our curated collection of stylish
              apparel, perfect for every occasion.
            </p>
          </div>
          {lowers[1] && (
            <Link to={`/product/${lowers[1]._id}`}>
              <img
                src={lowers[1].image}
                alt={lowers[1].name}
                className="rounded-lg w-full object-cover bg-gray-200"
              />
            </Link>
          )}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {tshirts.map((item) => (
              <Link to={`/product/${item._id}`}>
                <div key={item._id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-cover rounded bg-gray-200"
                  />
                  <h3 className="text-sm font-medium mt-2">{item.name}</h3>
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{item.price}{" "}
                    <span className="text-gray-500">| {item.category}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-5xl font-semibold text-gray-900">
          Elegant Trendy Collection
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {shirts.map((item) => (
            <Link to={`/product/${item._id}`}>
              <div key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto object-cover rounded bg-gray-200"
                />
                <h3 className="text-sm font-medium mt-2">{item.name}</h3>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{item.price}{" "}
                  <span className="text-gray-500">| {item.category}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-6">
          {lowers[0] && (
            <Link to={`/product/${lowers[0]._id}`}>
              <img
                src={lowers[0].image}
                alt={lowers[0].name}
                className="rounded-lg w-full object-cover bg-gray-200"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
