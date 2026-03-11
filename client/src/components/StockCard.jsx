import React from 'react';

const StockCard = ({ stock, onAction, actionLabel, actionColor }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{stock.name}</h3>
        <span className="stock-symbol">{stock.symbol}</span>
      </div>
      
      {stock.quantity !== undefined && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>
            Shares Owned: <strong style={{ color: 'var(--text-main)' }}>{stock.quantity}</strong>
          </p>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            Avg Buy Price: <strong style={{ color: 'var(--text-main)' }}>${stock.buyPrice?.toFixed(2)}</strong>
          </p>
        </div>
      )}

      <div style={{ marginTop: 'auto' }}>
        <p className="stock-price">${stock.price?.toFixed(2)}</p>
        <button 
          className={`btn ${actionColor ? `btn-${actionColor}` : ''}`} 
          onClick={() => onAction(stock)}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default StockCard;
