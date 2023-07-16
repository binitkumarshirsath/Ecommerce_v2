import mongoose from "mongoose";
import User from "./userModel.js";
import Product from "./productModel.js";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: Product.modelName,
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: User.modelName,
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);