const { catchAsync } = require("../utils/catchAsync");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
const Customer = require("../models/customerModel");
const Transaction = require("../models/transactionModel");
const ApiFeatures = require("../utils/ApiFeatures");
require("../models/productStatesModel");

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

exports.getTransactions = catchAsync(async (req, res, next) => {
  const { search = "" } = req.query;

  const searchFilter =
    search.trim().length > 0
      ? {
          $or: [
            { cost: { $regex: search, $options: "i" } },
            { userId: { $regex: search, $options: "i" } },
          ],
        }
      : {};

  const features = new ApiFeatures(Transaction.find(searchFilter), req.query)
    .filter()
    .sort()
    .fields()
    .pagination();

  const transactions = await features.query;
  const total = await Transaction.countDocuments(searchFilter);

  if (!transactions) {
    return next(new ApiError("No transactions found"));
  }

  res.status(200).json({
    total,
    count: transactions.length,
    transactions,
  });
});
