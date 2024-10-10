const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  limit: { type: Number, default: 2000 },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
