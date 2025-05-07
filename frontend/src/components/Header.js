import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🤖</span>
          </div>
          <div className="header-text">
            <h1>AI Chat App</h1>
            <p className="subtitle">Yapay Zeka Asistanı</p>
          </div>
        </div>
        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">Çevrimiçi</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 