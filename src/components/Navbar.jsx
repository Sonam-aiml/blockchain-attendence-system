import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ account, connectWallet }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 30px', 
      background: '#1e293b', 
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
        <h2 style={{ margin: 0 }}>Smart Attendance</h2>
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/teacher" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 'bold' }}>Teacher</Link>
        <Link to="/student" style={{ color: '#6ee7b7', textDecoration: 'none', fontWeight: 'bold' }}>Student</Link>
        <Link to="/admin" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 'bold' }}>Admin</Link>
        
        <button 
          onClick={connectWallet} 
          style={{ 
            padding: '8px 16px', 
            background: '#3b82f6', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {account ? `${account.substring(0, 6)}...${account.substring(38)}` : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
}