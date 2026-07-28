import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  productPrice: {
    type: Number,
    required: true,
  },

  productDescription: {
    type: String,
    required: true,
  },

  productImage: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Products", productSchema);
