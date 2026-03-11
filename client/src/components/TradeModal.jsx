import React, { useState } from 'react';

const TradeModal = ({ isOpen, onClose, stock, action, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  if (!isOpen || !stock) return null;

  const total = (stock.price * quantity).toFixed(2);
  const isBuy = action === 'Buy';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    if (!isBuy && quantity > stock.quantity) {
      setError(`You only have ${stock.quantity} shares to sell`);
      return;
    }

    try {
      setError('');
      await onConfirm(stock._id || stock.stockId?._id, quantity, action);
      onClose();
      setQuantity(1);
    } catch (err) {
      setError(err.response?.data?.message || `${action} failed`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>{action} {stock.symbol}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          Current Price: <strong style={{ color: 'var(--text-main)' }}>${stock.price?.toFixed(2)}</strong>
        </p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Quantity</label>
            <input 
              type="number" 
              className="form-control"
              min="1"
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              required 
            />
          </div>
          
          <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'var(--bg-color)', borderRadius: '6px' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
              <span>Total {isBuy ? 'Cost' : 'Revenue'}:</span>
              <strong style={{ fontSize: '1.2rem', color: isBuy ? 'var(--danger)' : 'var(--success)' }}>
                ${total}
              </strong>
            </p>
          </div>
          
          <button type="submit" className={`btn ${isBuy ? 'btn-danger' : 'btn-success'}`}>
            Confirm {action}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;
