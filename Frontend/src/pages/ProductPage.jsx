import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Check,
  BadgePercent,
  Crown,
  Shirt,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import { TrybeContext } from "../context/store";
import ProductCard from "../components/ProductCard";

const features = [
  { name: "Limited Edition", icon: Crown },
  { name: "Premium Fabrics", icon: Shirt },
  { name: "Street Style", icon: Zap },
  { name: "Luxury Finish", icon: Sparkles },
  { name: "Top Rated", icon: Star },
];
const ProductPage = () => {
  const { products, token, isAuthVisible, setIsAuthVisible, addToCart } =
    useContext(TrybeContext);

  const [isAdded, setIsAdded] = useState(false);
  const [currQty, setCurrQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { productId } = useParams();

  const handleMinusQty = () => {
    if (currQty > 1) setCurrQty(currQty - 1);
  };

  const handlePlusQty = () => {
    setCurrQty(currQty + 1);
  };

const handleAddToCart = () => {
  try {
    if (!token) {
      setIsAuthVisible(true);
      return;
    }

    if (product?.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      itemId: product._id,
      size: selectedSize || "default",
      quantity: currQty
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    const productData = products.find((prod) => prod._id === productId);
    if (productData) {
      setProduct(productData);

      const related = products
        .filter(
          (p) =>
            p.category === productData.category && p._id !== productData._id
        )
        .slice(0, 3);

      setRelatedProducts(related);
    } else {
      setProduct(null);
    }
  }, [products, productId]);

  if (!product) {
    return <div className="text-center mt-20">Product not found!</div>;
  }

  return (
    <div className="main_ctr w-full my-10 px-6 md:px-0 flex flex-col gap-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Product Image */}
        <div className="w-full md:w-6/12">
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
            <img
              src={product?.image}
              alt={product.name}
              className="w-full md:h-[400px] object-contain"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-6/12 flex flex-col gap-8">
          {/* Title + Description */}
          <div>
            <h2 className="text-4xl font-extrabold">{product.name}</h2>
            <p className="text-gray-600 mt-2 leading-relaxed line-clamp-2">
              {product.description ||
                "Thoughtfully crafted premium clothing from Trybe, designed to bring comfort and street flair."}
            </p>
          </div>

          {/* Price + Qty + Cart */}
          <div className="border-y py-6 flex flex-col gap-6">
            {/* Price */}
            <div className="flex justify-between items-center w-full">
              <div className="text-3xl font-bold text-black">
                ₹{product.price}
              </div>
              <div>
                {product?.sizes?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition 
          ${
            selectedSize === size
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-300 hover:border-black"
          }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={handleMinusQty}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus />
                </button>
                <span className="px-5 font-medium">{currQty}</span>
                <button
                  onClick={handlePlusQty}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full sm:flex-1 flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-full transition-all ${
                  isAdded ? "bg-green-600" : "bg-black hover:bg-gray-800"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
              {features.map(({ name, icon: Icon }, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="border-t border-b py-10">
        <h3 className="text-2xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700 leading-relaxed">
          {product.description || "No description available."}
        </p>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-6">
          <h3 className="text-3xl font-semibold mb-6">Customers Also Buy 🔥</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <Link
                onClick={() => scrollTo(0, 0)}
                key={prod._id}
                to={`/product/${prod._id}`}
              >
                <ProductCard
                  id={prod._id}
                  image={prod?.image}
                  title={prod?.name}
                  price={prod?.price}
                  category={prod?.category}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
