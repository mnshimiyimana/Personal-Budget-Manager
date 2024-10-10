const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
