const User = require('../models/User');
const Stock = require('../models/Stock');
const Portfolio = require('../models/Portfolio');

exports.buyStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;
    const userId = req.user.id;
    const qty = Number(quantity);

    if (qty <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const stock = await Stock.findById(stockId);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    const totalCost = stock.price * qty;

    const user = await User.findById(userId);
    if (user.walletBalance < totalCost) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    user.walletBalance -= totalCost;
    await user.save();

    let portfolioItem = await Portfolio.findOne({ userId, stockId });
    if (portfolioItem) {
      const totalOldValue = portfolioItem.quantity * portfolioItem.buyPrice;
      const totalNewValue = totalOldValue + totalCost;
      const newTotalQty = portfolioItem.quantity + qty;
      const newAvgPrice = totalNewValue / newTotalQty;
      
      portfolioItem.quantity = newTotalQty;
      portfolioItem.buyPrice = newAvgPrice;
      await portfolioItem.save();
    } else {
      portfolioItem = new Portfolio({
        userId,
        stockId,
        quantity: qty,
        buyPrice: stock.price
      });
      await portfolioItem.save();
    }

    res.json({ message: 'Purchase successful', balance: user.walletBalance });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;
    const userId = req.user.id;
    const qty = Number(quantity);

    if (qty <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const portfolioItem = await Portfolio.findOne({ userId, stockId });
    if (!portfolioItem || portfolioItem.quantity < qty) {
      return res.status(400).json({ message: 'Insufficient shares to sell' });
    }

    const stock = await Stock.findById(stockId);
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    const totalRevenue = stock.price * qty;

    const user = await User.findById(userId);
    user.walletBalance += totalRevenue;
    await user.save();

    if (portfolioItem.quantity === qty) {
      await Portfolio.findByIdAndDelete(portfolioItem._id);
    } else {
      portfolioItem.quantity -= qty;
      await portfolioItem.save();
    }

    res.json({ message: 'Sale successful', balance: user.walletBalance });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id }).populate('stockId', ['name', 'symbol', 'price']);
    res.json(portfolio);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
