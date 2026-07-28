import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  product: {
    type: Array,
    ref: "Product",
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);
