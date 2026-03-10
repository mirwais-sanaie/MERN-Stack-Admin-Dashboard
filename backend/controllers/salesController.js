const { catchAsync } = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");
const Overall = require("../models/overallStatModel");

exports.getSales = catchAsync(async (req, res, next) => {
  const overallStats = await Overall.find();

  if (!overallStats || overallStats.length === 0) {
    return next(new ApiError("No sales stats found", 404));
  }

  res.status(200).json(overallStats[0]);
});

