const Income = require("../models/Income");

const incomeController = {
  getIncomes: async (req, res) => {
    try {
      const incomes = await Income.find();
      res.status(200).json(incomes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  addIncome: async (req, res) => {
    try {
      const newIncome = new Income(req.body);
      const savedIncome = await newIncome.save();
      res.status(201).json(savedIncome);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateIncome: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const income = await Income.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!income) {
        return res.status(404).json({ message: "Income entry not found" });
      }

      res.status(200).json(income);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteIncome: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedIncome = await Income.findByIdAndDelete(id);

      if (!deletedIncome) {
        return res.status(404).json({ message: "Income entry not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = incomeController;
