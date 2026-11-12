import React, { useState } from 'react';

export default function AdminDashboard() {
  // Real dynamic state for users instead of hardcoded numbers
  const [users, setUsers] = useState([
    { id: 1, name: 'Sonam', role: 'Student', wallet: '0x1A2b...3c4D', status: 'Active' },
    { id: 2, name: 'Prof. Sharma', role: 'Teacher', wallet: '0x9F8e...1a2B', status: 'Active' },
    { id: 3, name: 'Aarav', role: 'Student', wallet: '0x5C4d...7e8F', status: 'Active' }
  ]);

  const [newName, setNewName] = useState('');
  const [newWallet, setNewWallet] = useState('');
  const [newRole, setNewRole] = useState('Student');

  // Function to add a real user to the system state
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newWallet) return;

    const userEntry = {
      id: Date.now(),
      name: newName,
      role: newRole,
      wallet: newWallet,
      status: 'Active'
    };

    setUsers([userEntry, ...users]);
    setNewName('');
    setNewWallet('');
  };

  // Function to toggle user status (Real interaction)
  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  const totalStudents = users.filter(u => u.role === 'Student').length;
  const totalTeachers = users.filter(u => u.role === 'Teacher').length;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '80vh' }}>
      <h2>Admin Dashboard - Blockchain Management</h2>
      <p style={{ color: '#64748b' }}>Manage authorized users, monitor smart contract status, and control system access.</p>

      {/* Metrics Overview Cards */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', minWidth: '200px', boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)' }}>
          <h4 style={{ margin: 0, color: '#64748b' }}>Registered Students</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#3b82f6' }}>{totalStudents}</p>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', minWidth: '200px', boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)' }}>
          <h4 style={{ margin: 0, color: '#64748b' }}>Active Teachers</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#10b981' }}>{totalTeachers}</p>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', minWidth: '200px', boxShadow: '0 2px 4px rgb(0 0 0 / 0.05)' }}>
          <h4 style={{ margin: 0, color: '#64748b' }}>Smart Contract Status</h4>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#10b981' }}>Connected / Active</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
        
        {/* Add User Form */}
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '350px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <h3>Register New User</h3>
          <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Full Name</label>
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                placeholder="Enter name..."
                required
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Wallet Address</label>
              <input 
                type="text" 
                value={newWallet} 
                onChange={(e) => setNewWallet(e.target.value)} 
                placeholder="0x..."
                required
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Role</label>
              <select 
                value={newRole} 
                onChange={(e) => setNewRole(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
            <button 
              type="submit"
              style={{ padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
            >
              Add User to Blockchain Registry
            </button>
          </form>
        </div>

        {/* User Management Table */}
        <div style={{ flex: 1, background: '#fff', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', minWidth: '400px' }}>
          <h3>Authorized User Directory</h3>
          <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '14px' }}>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Role</th>
                <th style={{ padding: '10px' }}>Wallet Address</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.role}</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: '#6366f1' }}>{user.wallet}</td>
                  <td style={{ padding: '10px', color: user.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                    {user.status}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      style={{ 
                        padding: '5px 10px', 
                        background: user.status === 'Active' ? '#fee2e2' : '#d1fae5', 
                        color: user.status === 'Active' ? '#991b1b' : '#065f46', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '11px'
                      }}
                    >
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
