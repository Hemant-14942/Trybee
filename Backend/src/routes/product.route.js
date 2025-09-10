import express from "express";
import {
  addProduct,
  editProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add-product",adminAuth,upload.single("image"), addProduct);
productRouter.get("/list-product", listProducts);
productRouter.post("/edit-product/:productId",adminAuth,upload.single("image"),editProduct);
productRouter.delete("/remove/:productId", adminAuth, removeProduct);
productRouter.get("/products/:productId", singleProduct);

export default productRouter;
