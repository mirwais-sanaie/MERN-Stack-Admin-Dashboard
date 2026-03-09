const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");

dotenv.config({ path: "./.env" });

const connectDB = async function () {
  // make sure to change the password and prepare db link
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD,
  );

  try {
    // connect to database
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8"),
);

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/customers.json`, "utf-8"),
);
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/transactions.json`, "utf-8"),
);

const productStats = JSON.parse(
  fs.readFileSync(`${__dirname}/productStats.json`, "utf-8"),
);

const overallStats = JSON.parse(
  fs.readFileSync(`${__dirname}/overallStats.json`, "utf-8"),
);

const Affiliate = JSON.parse(
  fs.readFileSync(`${__dirname}/Affiliate.json`, "utf-8"),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    // await Customer.create(customers);
    // await Product.create(products);
    // await Transaction.create(transactions);
    await Affiliate.create(Affiliate);
    await productStats.create(productStats);
    await overallStats.create(overallStats);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Customer.deleteMany();
    await Product.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  connectDB().then(() => {
    importData();
  });
} else if (process.argv[2] === "--delete") {
  connectDB().then(() => {
    deleteData();
  });
}

module.exports = connectDB;
