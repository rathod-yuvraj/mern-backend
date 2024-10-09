const mongoose = require('mongoose');

// Define the schema for a transaction
const transactionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },  // Unique identifier for each transaction
    title: { type: String, required: true },             // Product title
    price: { type: Number, required: true },             // Price of the product
    description: { type: String },                       // Product description (optional)
    category: { type: String },                          // Category of the product
    dateOfSale: { type: Date, required: true },          // Date the product was sold
    sold: { type: Boolean, required: true }              // Whether the product was sold or not
});

// Create the Transaction model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
