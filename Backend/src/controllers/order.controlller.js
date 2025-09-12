import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    if (!userId || !items || !amount || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["COD", "ONLINE"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Map items to store both normal and custom designs
    const orderItems = items.map((item) => ({
      productId: item.productId || null,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      // Optional fields only for custom designs
      color: item.color || null,
      fabric: item.fabric || null,
      side: item.side || null,
      designImage: item.designImage || null,
    }));

    const orderData = {
      userId,
      items: orderItems,
      amount,
      address: {
        street: address.street,
        city: address.city,
        state: address.state || "",
        zip: address.zip || "",
        country: address.country || "India",
      },
      paymentMethod,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log("PlaceOrder Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {}
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel
      .find({ userId })
      .populate("items.productId");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
};

export { placeOrder, allOrders, userOrders, updateOrderStatus };
