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

  // Remove `search` so ApiFeatures.filter() doesn't treat it as a DB field
  const queryParams = { ...req.query };
  delete queryParams.search;

  const features = new ApiFeatures(Transaction.find(searchFilter), queryParams)
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

exports.getGeography = catchAsync(async (req, res, next) => {
  const customers = await Customer.find().select("country");

  if (!customers) {
    return next(new ApiError("No customers found"));
  }

  const countryCounts = {};

  customers.forEach((customer) => {
    if (!customer.country) return;
    const code = customer.country.toUpperCase();
    countryCounts[code] = (countryCounts[code] || 0) + 1;
  });

  const formatted = Object.entries(countryCounts).map(([id, value]) => ({
    id,
    value,
  }));

  res.status(200).json(formatted);
});
