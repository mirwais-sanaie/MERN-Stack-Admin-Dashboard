const mongoose = require("mongoose");

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
    // image: {
    //   type: String,
    //   required: true,
    // },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    supply: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual field to populate product statistics
productSchema.virtual("stat", {
  ref: "ProductStat",
  localField: "_id",
  foreignField: "productId",
  justOne: true,
});

module.exports = mongoose.model("Product", productSchema);
