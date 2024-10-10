const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.get("/", expenseController.getExpenses);
router.post("/", expenseController.addExpense);
router.delete("/:id", expenseController.deleteExpense);
router.put("/:id", expenseController.updateExpense);
router.get("/categories/summary", expenseController.getCategorySummary);
router.put("/categories/limit", expenseController.updateCategoryLimit);

module.exports = router;
