import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import StockCard from '../components/StockCard';
import TradeModal from '../components/TradeModal';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { updateUserBalance } = useContext(AuthContext);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await api.get('/stocks');
      setStocks(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleTradeConfirm = async (stockId, quantity, action) => {
    if (action === 'Buy') {
      const res = await api.post('/trade/buy', { stockId, quantity });
      updateUserBalance(res.data.balance);
      alert('Purchase successful!');
    }
  };

  if (loading) return <div className="container">Loading stocks...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>Market Dashboard</h1>
      <p style={{ color: 'var(--text-muted)' }}>Browse available stocks and purchase shares to build your portfolio.</p>
      
      <div className="grid">
        {stocks.map(stock => (
          <StockCard 
            key={stock._id} 
            stock={stock} 
            onAction={handleBuyClick} 
            actionLabel="Buy Stock"
            actionColor=""
          />
        ))}
      </div>

      <TradeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        stock={selectedStock} 
        action="Buy"
        onConfirm={handleTradeConfirm}
      />
    </div>
  );
};

export default Dashboard;
