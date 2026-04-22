import {Router} from 'express';
import * as ExpenseController from '../controllers/expenseController.js';

const router = Router();

router.get('/', ExpenseController.getExpenses);
router.get('/categories', ExpenseController.getCategories);
router.post('/add', ExpenseController.createExpense);

export default router;
