import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TrybeContext } from "../context/store";

const Orders = () => {
  const { token, backendUrl } = useContext(TrybeContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/order/my-order`, {
          headers: { token },
        });
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl, token]);

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!orders.length)
    return <div className="p-6 text-center">You have no orders yet.</div>;

  return (
    <div className="p-6 space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-xl shadow-lg p-6 bg-white hover:shadow-2xl transition duration-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="text-gray-700">
              <span className="font-semibold">Order Date:</span>{" "}
              {new Date(order.date).toLocaleString()}
            </div>
            <div className="text-lg font-semibold text-green-700 mt-2 md:mt-0">
              Total: ₹{order.amount.toFixed(2)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Items:</h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => {
                const product = item.productId;
                const imgSrc = item.designImage || product?.image;

                return (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row justify-between items-center border-b py-3 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={product?.name || "custom design"}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      )}
                      <div className="text-gray-700">
                        {product && (
                          <div className="font-medium">{product.name}</div>
                        )}
                        <div>
                          <span className="font-medium">Size:</span> {item.size}
                        </div>
                        {item.color && (
                          <div>
                            <span className="font-medium">Color:</span> {item.color}
                          </div>
                        )}
                        {item.fabric && (
                          <div>
                            <span className="font-medium">Fabric:</span> {item.fabric}
                          </div>
                        )}
                        {item.side && (
                          <div>
                            <span className="font-medium">Side:</span> {item.side}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-900 font-semibold mt-2 md:mt-0">
                      ₹{item.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">Shipping Address:</h4>
            <div className="text-gray-700">
              {order.address.street}, {order.address.city},{" "}
               {order.address.zip},{" "}
              {order.address.country}
            </div>
          </div>

          <div className="text-gray-700">
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.paymentMethod}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
