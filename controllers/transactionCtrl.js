const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userId } = req.body;

    const query = { userId };

    // Apply frequency filter
    if (frequency !== 'custom') {
      query.date = {
        $gt: moment().subtract(Number(frequency), 'd').toDate(),
      };
    } else if (selectedDate && selectedDate.length === 2) {
      query.date = {
        $gte: moment(selectedDate[0]).startOf('day').toDate(),
        $lte: moment(selectedDate[1]).endOf('day').toDate(),
      };
    }

    // Apply type filter
    if (type && type !== 'all') {
      query.type = type;
    }

    const transactions = await transactionModel.find(query).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json({ message: 'Transaction created successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating transaction' });
  }
};

const editTransaction = async (req, res) => {
  try {
   
    await transactionModel.findOneAndUpdate({ _id: req.body. transactionId }, req.body.payload);
    res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating transaction' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
   
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};