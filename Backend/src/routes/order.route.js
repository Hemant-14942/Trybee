import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  allOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
} from "../controllers/order.controlller.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

orderRouter.post("/place", authUser, placeOrder);
// orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

orderRouter.post("/my-order", authUser, userOrders);

// orderRouter.post('/verify-razorpay',authUser,verifyRazorpay);

export default orderRouter;
