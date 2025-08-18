import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes } = req.body;

    const image = req.file;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required to add a product.",
      });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      sizes: JSON.parse(sizes || "[]"),
      images: result.secure_url,
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, sizes } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let imageUrl = product.images;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    const updatedProductData = {
      name,
      description,
      price: Number(price),
      category,
      sizes: sizes ? JSON.parse(sizes) : product.sizes,
      images: imageUrl,
    };

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productModel.findByIdAndDelete(productId);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, editProduct, removeProduct, singleProduct };
