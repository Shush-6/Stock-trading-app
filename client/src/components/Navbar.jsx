import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">StockApp</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="wallet-badge">
              Wallet: ${user.walletBalance?.toFixed(2)}
            </span>
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            <button onClick={handleLogout} className="btn btn-danger" style={{padding: '0.4rem 1rem', width: 'auto'}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
