const { catchAsync } = require("../utils/catchAsync");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("stat");

  if (!products) {
    return next(new ApiError("No products found"));
  }

  res.status(200).json({
    status: "success",
    legnth: products.length,
    data: {
      products,
    },
  });
});
