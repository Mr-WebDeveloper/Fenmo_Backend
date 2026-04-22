import { Expense } from '../models/Expense.js';


export const getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const sortOrder = sort === 'date_asc' ? 1 : -1;

    const result = await Expense.find(filter).sort({ date: sortOrder, createdAt: sortOrder });

    if(!result){
      return res.status(200).json({status:false, data:[], message:"No expenses found"});
    }


    return res.status(200).json({status:true, data:result, message:"Expenses fetched successfully"});


  } catch (err) {
    console.error('getExpenses error:', err);
    return res.status(500).json({ status: false, error: 'Internal server error.' });
  }
};

export const getCategories = async (req, res) => {
  try {

    const categories = await Expense.distinct('category');

    if(!categories.length){
      return res.status(200).json({status:false, data:[], message:"No categories found"});
    }

    return res.status(200).json({status:true, data:categories.sort(), message:"Categories fetched successfully"});
  } catch (err) {
    console.error('getCategories error:', err);
    return res.status(500).json({ status: false, error: 'Internal server error.' });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !description || !date) {
      return res.status(400).json({ error: 'amount, category, description, and date are all required.' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number.' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format.' });
    }

    const uniqueID = req.headers['uniqueID'];

    if (uniqueID) {
      const existing = await Expense.findOne({ uniqueID });

      if (existing) {
        return res.status(200).json({status:true, data:existing, message:"Expense already exists"});
      }

    }

    // --- Create ---
    const expense = await Expense.create({
      amount: parsedAmount,
      category: category.trim(),
      description: description.trim(),
      date: parsedDate,
      ...(uniqueID && { uniqueID }),
    });

    return res.status(201).json(expense.toJSON());

  } catch (err) {
    console.error('createExpense error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

