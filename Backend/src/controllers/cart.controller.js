import userModel from "../models/user.model.js";
import mongoose from "mongoose";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const qty = Number(quantity) || 1;
    if (!userId || !itemId || !size || qty <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItem = userData.cartData.find(
      (item) => item.productId.toString() === itemId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity = qty;
    } else {
      userData.cartData.push({
        productId: new mongoose.Types.ObjectId(String(itemId)),
        size,
        quantity: qty,
      });
    }

    await userData.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Item added to cart",
        cartData: userData.cartData,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const qty = Number(quantity);
    if (!userId || !itemId || !size || !Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = userData.cartData.find(
      (i) => i.productId.toString() === itemId && i.size === size
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = qty;

    await userData.save();

    res
      .status(200)
      .json({ message: "Cart updated", cartData: userData.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel
      .findById(userId)
      .populate("cartData.productId");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cartData: userData.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    userData.cartData = userData.cartData.filter(
      (item) => !(item.productId.toString() === itemId && item.size === size)
    );

    await userData.save();

    res
      .status(200)
      .json({ message: "Item removed from cart", cartData: userData.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { addToCart, updateCart, getCart, deleteFromCart };
