import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { TrybeContext } from "../context/store";

export default function ProductList({ title }) {
  const { products } = useContext(TrybeContext);

  const uniqueCategoryProducts = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = product;
      }
      return acc;
    }, {})
  );

  return (
    <section className="my-20 px-6 md:px-0 md:max-w-6xl md:mx-auto text-black">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 ">
        {uniqueCategoryProducts.slice(0, 4).map((product, index) => (
          <ProductCard
            key={index}
            id={product._id}
            image={product.image}
            title={product.name}
            category={product.category}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}
