const Stock = require('../models/Stock');

exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
