const Expense = require("../models/Expense");

const expenseController = {
  getExpenses: async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getCategorySummary: async (req, res) => {
    try {
      const categorySummary = await Expense.aggregate([
        {
          $group: {
            _id: "$category",
            totalSpent: { $sum: "$amount" },
            limit: { $first: { $ifNull: ["$limit", 2000] } },
          },
        },
      ]);

      res.status(200).json(categorySummary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateCategoryLimit: async (req, res) => {
    try {
      const { category, limit } = req.body;

      const result = await Expense.updateMany(
        { category },
        { $set: { limit } }
      );

      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "No expenses found for this category" });
      }

      res.status(200).json({ message: "Category limit updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  addExpense: async (req, res) => {
    try {
      const newExpense = new Expense(req.body);
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const expense = await Expense.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!expense) {
        return res.status(404).json({ message: "Expense entry not found" });
      }

      res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedExpense = await Expense.findByIdAndDelete(id);

      if (!deletedExpense) {
        return res.status(404).json({ message: "Expense entry not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = expenseController;
