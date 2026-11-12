import React, { useState, useEffect } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';

export default function TeacherDashboard() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [qrValue, setQrValue] = useState(`attendance-session-${Date.now()}`);
  
  // Shuru me table bilkul blank rahegi
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  // 60-second timer to regenerate QR
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setQrValue(`attendance-session-${Date.now()}`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegenerate = () => {
    setQrValue(`attendance-session-${Date.now()}`);
    setTimeLeft(60);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '80vh' }}>
      <h2>Teacher Dashboard - Dynamic QR Attendance</h2>
      <p style={{ color: '#64748b' }}>Generate a time-sensitive QR code to prevent proxy attendance in class.</p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '25px' }}>
        {/* QR Generator Box */}
        <div style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <h3>Active Class QR Code</h3>
          <div style={{ margin: '20px 0', padding: '15px', background: '#f1f5f9', display: 'inline-block', borderRadius: '8px' }}>
            <QRCode value={qrValue} size={200} />
          </div>
          <p style={{ fontWeight: 'bold', color: '#ef4444' }}>QR Code expires in: {timeLeft} seconds</p>
          <button 
            onClick={handleRegenerate}
            style={{ marginTop: '10px', padding: '10px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Regenerate QR Now
          </button>
        </div>

        {/* Live Attendance Table */}
        <div style={{ flex: 1, padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', minWidth: '350px' }}>
          <h3>Live Class Attendance Log</h3>
          <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '10px' }}>Roll No</th>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Time</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                    No students scanned yet. Waiting for attendance...
                  </td>
                </tr>
              ) : (
                attendanceLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px' }}>{log.roll}</td>
                    <td style={{ padding: '10px' }}>{log.name}</td>
                    <td style={{ padding: '10px' }}>{log.time}</td>
                    <td style={{ padding: '10px', color: '#10b981', fontWeight: 'bold' }}>{log.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}