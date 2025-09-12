import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import { TrybeContext } from "../context/store";

const Cart = () => {
  const { cartItems, deleteCartItem, updateCart, getUserCart } = useContext(TrybeContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    if (!cartItems || !Array.isArray(cartItems)) return;

    const updatedCartProducts = cartItems.map((item) => {
      if (item.productId) {
        return { ...item.productId, size: item.size, quantity: item.quantity };
      } else {
        return {
          _id: `custom-${item.size}-${item.color}-${item.side}`,
          name: "Custom Design",
          price: 1000,
          image: item.designImage,
          category: "Custom",
          size: item.size,
          quantity: item.quantity,
          color: item.color,
          fabric: item.fabric,
          side: item.side,
          designImage: item.designImage,
        };
      }
    });

    setCartProducts(updatedCartProducts);
  }, [cartItems]);

  const handleUpdateQty = (item, newQty) => {
    if (newQty <= 0) return;

    updateCart({
      itemId: item._id?.startsWith("custom-") ? null : item._id,
      size: item.size,
      quantity: newQty,
      color: item.color,
      fabric: item.fabric,
      side: item.side,
      designImage: item.designImage,
    }).then(() => getUserCart());
  };

  const handleDelete = (item) => {
    deleteCartItem({
      itemId: item._id?.startsWith("custom-") ? null : item._id,
      size: item.size,
      color: item.color,
      fabric: item.fabric,
      side: item.side,
      designImage: item.designImage,
    }).then(() => getUserCart());
  };

  const calculateTotalAmount = () =>
    cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cartProducts.length) {
    return (
      <div className="w-full h-screen py-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <img src="/EmptyCart.png" alt="Empty Cart" className="w-4/5 sm:w-2/5 md:w-1/4" />
        <h2 className="text-3xl sm:text-4xl font-bold">Your Cart is Empty</h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-md">
          Start adding some items to your cart and make your loved ones happy!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            onClick={() => scrollTo(0, 0)}
            to="/collections"
            className="bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-gray-800 transition"
          >
            Explore Collections
          </Link>
          <Link
            to="/customize"
            className="bg-gray-300 text-black px-6 py-3 rounded-full text-sm sm:text-base hover:bg-red-600 hover:text-white transition"
          >
            Customize Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartProducts.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6 hover:shadow-2xl transition-all hover:scale-[1.01]"
            >
              <img src={item.image} alt={item.name} className="w-full md:w-32 h-32 rounded-xl object-cover border" />
              <div className="flex-1 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex justify-start items-center">
                      <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full uppercase tracking-widest">
                        {item.category} • {item.size}
                      </div>
                      {item.color && (
                        <div
                          className="inline-block w-10 h-5 ml-5 mt-1 rounded border border-gray-300"
                          style={{ backgroundColor: `#${item.color}` }}
                          title={item.color}
                        ></div>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-2">{item.name}</h2>
                  </div>
                  <button onClick={() => handleDelete(item)} className="text-gray-400 hover:text-red-500 transition">
                    <Trash2 size={22} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-1 rounded-full shadow">
                    ₹{item.price}
                  </span>
                  <div className="flex items-center bg-gray-100 rounded-full shadow-inner overflow-hidden">
                    <button
                      className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition"
                      onClick={() => handleUpdateQty(item, item.quantity - 1)}
                    >
                      <MinusCircle size={20} />
                    </button>
                    <span className="px-5 font-semibold text-lg">{item.quantity}</span>
                    <button
                      className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition"
                      onClick={() => handleUpdateQty(item, item.quantity + 1)}
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-2xl p-8 sticky top-8 h-fit space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Cart Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            {cartProducts.map((item) => (
              <div key={`${item._id}-${item.size}`} className="flex justify-between">
                <span>
                  {item.name} ({item.size}) x {item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between font-extrabold text-gray-900 text-xl">
            <span>Total</span>
            <span>₹{calculateTotalAmount()}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-gradient-to-r from-black to-gray-800 text-white text-center py-3 rounded-full font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
