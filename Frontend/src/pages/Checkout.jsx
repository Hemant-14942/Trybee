import React, { useContext, useEffect, useState } from "react";
import { TrybeContext } from "../context/store";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, backendUrl, token } = useContext(TrybeContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (!cartItems || !Array.isArray(cartItems)) return;
    const updatedCartProducts = cartItems.map((item) => ({
      ...item.productId,
      size: item.size,
      quantity: item.quantity,
    }));
    setCartProducts(updatedCartProducts);
  }, [cartItems]);

  const calculateTotalAmount = () =>
    cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill all address fields.");
      return;
    }

    if (!cartProducts.length) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          token: token,
        },
        body: JSON.stringify({
          userId: token ? JSON.parse(atob(token.split(".")[1])).id : "",
          items: cartProducts.map((p) => ({
            productId: p._id,
            size: p.size,
            quantity: p.quantity,
            price: p.price,
          })),
          amount: calculateTotalAmount(),
          address: {
            street: address.street,
            city: address.city,
            state: "",
            zip: address.pincode,
            country: "India", 
          },
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Order placed successfully!");
        navigate("/orders");
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-2xl font-bold">Shipping Address</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border rounded-lg px-4 py-2"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Street Address"
            className="w-full border rounded-lg px-4 py-2"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded-lg px-4 py-2"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Pincode"
              className="w-full border rounded-lg px-4 py-2"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="ONLINE"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            {cartProducts.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="flex justify-between"
              >
                <span>
                  {item.name} ({item.size}) x {item.quantity}
                </span>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{calculateTotalAmount()}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
