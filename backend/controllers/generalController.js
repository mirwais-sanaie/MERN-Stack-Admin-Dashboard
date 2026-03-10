const { catchAsync } = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");
const Customer = require("../models/customerModel");
const Transaction = require("../models/transactionModel");
const Overall = require("../models/overallStatModel");

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Customer.findById(id).select("-password");

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json(user);
});

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // hardcoded time window to match seeded stats (adjust as needed)
  const currentMonth = "November";
  const currentYear = 2021;
  const currentDay = "2021-11-15";

  const [overallStat] = await Overall.find({ year: currentYear });
  if (!overallStat) {
    return next(new ApiError("No overall stats found", 404));
  }

  // recent transactions
  const transactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(50);

  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    dailyData,
    salesByCategory,
  } = overallStat;

  const thisMonthStats = monthlyData.find(({ month }) => month === currentMonth);
  const todayStats = dailyData.find(({ date }) => date === currentDay);

  res.status(200).json({
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
    thisMonthStats,
    todayStats,
    transactions,
  });
});

