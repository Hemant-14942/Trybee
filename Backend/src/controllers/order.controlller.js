const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
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
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    log(error);
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
