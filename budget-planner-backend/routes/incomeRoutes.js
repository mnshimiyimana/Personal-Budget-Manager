const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

// Define routes for incomes
router.get('/', incomeController.getIncomes);
router.post('/', incomeController.addIncome); 
router.delete('/:id', incomeController.deleteIncome); 
router.put('/:id', incomeController.updateIncome);

module.exports = router;