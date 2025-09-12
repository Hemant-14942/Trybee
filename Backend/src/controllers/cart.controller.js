import userModel from "../models/user.model.js";
import mongoose from "mongoose";
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity, color, fabric, side, designImage } =
      req.body;

    const qty = Number(quantity) || 1;
    if (!userId || !size || qty <= 0) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // find user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let existingItem;

    if (itemId) {
      // 🔹 Case 1: Normal product
      existingItem = userData.cartData.find(
        (item) =>
          item.productId &&
          item.productId.toString() === itemId &&
          item.size === size
      );
    } else {
      // 🔹 Case 2: Playground custom design
      existingItem = userData.cartData.find(
        (item) =>
          !item.productId && // productId missing = playground item
          item.size === size &&
          item.color === color &&
          item.fabric === fabric &&
          item.side === side &&
          item.designImage === designImage
      );
    }

    if (existingItem) {
      // update quantity
      existingItem.quantity = qty;
    } else {
      // add new cart item
      userData.cartData.push({
        productId: itemId ? new mongoose.Types.ObjectId(itemId) : undefined, // optional
        size,
        quantity: qty,
        color: color || null,
        fabric: fabric || null,
        side: side || null,
        designImage: designImage || null,
      });
    }

    await userData.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("AddToCart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity, color, fabric, side, designImage } =
      req.body;

    const qty = Number(quantity);
    if (!userId || !size || !Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    let item;

    if (itemId) {
      item = userData.cartData.find(
        (i) =>
          i.productId &&
          i.productId.toString() === itemId.toString() &&
          i.size === size
      );
    } else {
      item = userData.cartData.find(
        (i) =>
          !i.productId &&
          i.size === size &&
          i.color === color &&
          i.fabric === fabric &&
          i.side === side &&
          i.designImage === designImage
      );
    }

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = qty;
    await userData.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("UpdateCart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId, size, color, fabric, side, designImage } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (itemId) {
      userData.cartData = userData.cartData.filter(
        (i) =>
          !(
            i.productId &&
            i.productId.toString() === itemId.toString() &&
            i.size === size
          )
      );
    } else {
      userData.cartData = userData.cartData.filter(
        (i) =>
          !(
            !i.productId &&
            i.size === size &&
            i.color === color &&
            i.fabric === fabric &&
            i.side === side &&
            i.designImage === designImage
          )
      );
    }

    await userData.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("DeleteFromCart error:", error);
    res.status(500).json({ success: false, message: error.message });
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

export { addToCart, updateCart, getCart, deleteFromCart };
