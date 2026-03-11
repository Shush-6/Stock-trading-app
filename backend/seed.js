const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stock = require('./models/Stock');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const stocks = [
  { name: 'Apple Inc.', symbol: 'AAPL', price: 150.00 },
  { name: 'Tesla Inc.', symbol: 'TSLA', price: 200.50 },
  { name: 'Amazon.com, Inc.', symbol: 'AMZN', price: 105.30 },
  { name: 'Alphabet Inc.', symbol: 'GOOGL', price: 130.45 },
  { name: 'Microsoft Corporation', symbol: 'MSFT', price: 310.20 }
];

const seedStocks = async () => {
  try {
    await connectDB();
    await Stock.deleteMany();
    await Stock.insertMany(stocks);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

seedStocks();
