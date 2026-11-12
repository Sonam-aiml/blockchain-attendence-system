import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Blockchain Attendance System</h1>
      <p>Select your portal to proceed</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Link to="/teacher"><button style={{ padding: '12px 24px', cursor: 'pointer', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Teacher Portal</button></Link>
        <Link to="/student"><button style={{ padding: '12px 24px', cursor: 'pointer', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Student Portal</button></Link>
        <Link to="/admin"><button style={{ padding: '12px 24px', cursor: 'pointer', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Admin Portal</button></Link>
      </div>
    </div>
  );
}