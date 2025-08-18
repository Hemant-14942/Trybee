import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
      required: true,
      default:""
    },
    category: {
      type: String,
      required: true,
    },
    sizes:{
      type:Array,
      required:true
    }
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
