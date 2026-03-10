const { catchAsync } = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");
const Customer = require("../models/customerModel");
const Transaction = require("../models/transactionModel");

exports.getAdmins = catchAsync(async (req, res, next) => {
  const admins = await Customer.find({ role: "admin" }).select("-password");

  if (!admins) {
    return next(new ApiError("No admins found", 404));
  }

  res.status(200).json(admins);
});

exports.getUserPerformance = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Customer.findById(id).select("-password");
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const sales = await Transaction.find({ userId: id });

  res.status(200).json({ user, sales });
});

