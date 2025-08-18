import mongoose from "mongoose";

const enquirySchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const enquiryModel =
  mongoose.models.order || mongoose.model("enquiry", enquirySchmea);

export default enquiryModel;
