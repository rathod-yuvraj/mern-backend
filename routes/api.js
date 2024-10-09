const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// const Transaction = require('../models/Transaction');
const axios = require('axios');

// Initialize the database
router.get('/initialize', async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(data);
        res.status(200).json({ message: "Database initialized successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// List transactions with pagination and search
router.get('/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = "", month } = req.query;
    const regex = new RegExp(search, 'i');

    const transactions = await Transaction.find({
        $and: [
            { dateOfSale: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) } },
            { $or: [{ title: regex }, { description: regex }, { price: regex }] }
        ]
    })
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));

    res.json(transactions);
});

module.exports = router;
