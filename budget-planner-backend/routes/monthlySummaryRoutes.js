const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const Expense = require("../models/Expense");

router.get("/monthly-summary", async (req, res) => {
  try {
    const monthlyIncome = await Income.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const monthlyExpense = await Expense.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const monthlyData = { income: monthlyIncome, expenses: monthlyExpense };
    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve monthly summary data." });
  }
});

module.exports = router;
