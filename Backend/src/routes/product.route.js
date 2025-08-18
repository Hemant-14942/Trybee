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

productRouter.post(
  "/add-product",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list-product", listProducts);
productRouter.post(
  "/edit-product/:productId",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  editProduct
);
productRouter.delete("/remove/:productId", adminAuth, removeProduct);
productRouter.get("/products/:productId", singleProduct);

export default productRouter;
