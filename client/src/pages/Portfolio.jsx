import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import StockCard from '../components/StockCard';
import TradeModal from '../components/TradeModal';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { updateUserBalance, user } = useContext(AuthContext);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await api.get('/trade/portfolio');
      setPortfolio(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSellClick = (item) => {
    // Format stock data for the modal
    const stockToSell = {
      _id: item.stockId._id,
      name: item.stockId.name,
      symbol: item.stockId.symbol,
      price: item.stockId.price,
      quantity: item.quantity
    };
    setSelectedStock(stockToSell);
    setIsModalOpen(true);
  };

  const handleTradeConfirm = async (stockId, quantity, action) => {
    if (action === 'Sell') {
      const res = await api.post('/trade/sell', { stockId, quantity });
      updateUserBalance(res.data.balance);
      fetchPortfolio(); // Refresh the portfolio view
      alert('Sale successful!');
    }
  };

  if (loading) return <div className="container">Loading portfolio...</div>;

  const totalPortfolioValue = portfolio.reduce((total, item) => {
    return total + (item.quantity * item.stockId.price);
  }, 0);

  const totalAssets = user ? user.walletBalance + totalPortfolioValue : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Your Portfolio</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your owned assets and track your performance.</p>
        </div>
        
        <div style={{ background: 'var(--primary)', color: 'white', padding: '1.5rem', borderRadius: '12px', minWidth: '250px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <p style={{ margin: '0 0 0.5rem 0', opacity: 0.9 }}>Total Assets</p>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>${totalAssets.toFixed(2)}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
            <span>Wallet: ${user?.walletBalance?.toFixed(2)}</span>
            <span>Stocks: ${totalPortfolioValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {portfolio.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--card-bg)', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Your portfolio is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Head over to the Dashboard to discover and buy some stocks!
          </p>
          <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto' }}>Browse Stocks</Link>
        </div>
      ) : (
        <div className="grid">
          {portfolio.map(item => {
            const displayStock = {
              _id: item.stockId._id,
              name: item.stockId.name,
              symbol: item.stockId.symbol,
              price: item.stockId.price,
              quantity: item.quantity,
              buyPrice: item.buyPrice
            };
            
            return (
              <StockCard 
                key={item._id} 
                stock={displayStock} 
                onAction={() => handleSellClick(item)} 
                actionLabel="Sell Stock"
                actionColor="danger"
              />
            );
          })}
        </div>
      )}

      <TradeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        stock={selectedStock} 
        action="Sell"
        onConfirm={handleTradeConfirm}
      />
    </div>
  );
};

export default Portfolio;
