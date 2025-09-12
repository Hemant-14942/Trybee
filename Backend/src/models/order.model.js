import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, 
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        color: { type: String, default: null },
        fabric: { type: String, default: null },
        side: { type: String, enum: ["Front", "Back"], default: null },
        designImage: { type: String, default: null },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    date: { type: Date, required: true },
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], required: true },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
