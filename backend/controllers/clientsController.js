const { catchAsync } = require("../utils/catchAsync");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
const Customer = require("../models/customerModel");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("stat");

  if (!products) {
    return next(new ApiError("No products found"));
  }

  res.status(200).json(products);
});

exports.getCustomers = catchAsync(async (req, res, next) => {
  const customers = await Customer.find({ role: "user" }).select("-password");

  if (!customers) {
    return next(new ApiError("No customers found"));
  }

  res.status(200).json(customers);
});
