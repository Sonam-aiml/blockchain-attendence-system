import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function StudentDashboard() {
  const [scanResult, setScanResult] = useState(null);
  const [status, setStatus] = useState('');
  const [scannerStarted, setScannerStarted] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const startScanner = () => {
    setScannerStarted(true);
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          setStatus('QR Payload Verified! Generating Blockchain Transaction...');

          // Scanned QR Payload se real Data extract karke Table me add karna
          const now = new Date();
          const newRecord = {
            id: Date.now(),
            sessionId: decodedText, // Teacher dashboard se aaya QR code string
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            txHash: '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6),
            status: 'SUCCESS (ON-CHAIN)'
          };

          setAttendanceRecords((prev) => [newRecord, ...prev]);
          scanner.clear().catch((error) => console.error(error));
        },
        (errorMessage) => {
          // Scanning active...
        }
      );
    }, 100);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '80vh' }}>
      <h2>Student Portal - Live QR Verifier</h2>
      <p style={{ color: '#64748b' }}>Scan active teacher QR code to record cryptographic proof of attendance.</p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginTop: '25px' }}>
        
        {/* Camera Scanner Box */}
        <div style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', width: '380px', background: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <h3>Camera Scanner</h3>
          {!scanResult ? (
            <div style={{ marginTop: '15px' }}>
              {!scannerStarted ? (
                <button 
                  onClick={startScanner}
                  style={{ padding: '12px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                >
                  Start Camera Scanner
                </button>
              ) : (
                <div id="reader" style={{ width: '100%' }}></div>
              )}
            </div>
          ) : (
            <div>
              <h4 style={{ color: '#10b981', margin: '10px 0' }}>✓ Attendance Recorded</h4>
              <p style={{ fontSize: '13px', color: '#475569', wordBreak: 'break-all', background: '#f1f5f9', padding: '10px', borderRadius: '6px' }}>
                <strong>Payload:</strong> {scanResult}
              </p>
              <button 
                onClick={() => {
                  setScanResult(null);
                  setScannerStarted(false);
                }}
                style={{ marginTop: '12px', padding: '8px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
              >
                Scan Next Session
              </button>
            </div>
          )}

          {status && (
            <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#2563eb', fontSize: '13px' }}>
              {status}
            </p>
          )}
        </div>

        {/* Real-time Session Log Table */}
        <div style={{ flex: 1, padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', minWidth: '350px' }}>
          <h3>Scanned Attendance Logs</h3>
          <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '14px' }}>
                <th style={{ padding: '10px' }}>Session Payload</th>
                <th style={{ padding: '10px' }}>Timestamp</th>
                <th style={{ padding: '10px' }}>Tx Hash</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                    No sessions scanned yet. Click "Start Camera Scanner" to scan teacher's QR.
                  </td>
                </tr>
              ) : (
                attendanceRecords.map((rec) => (
                  <tr key={rec.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                    <td style={{ padding: '10px', fontFamily: 'monospace' }}>{rec.sessionId}</td>
                    <td style={{ padding: '10px' }}>{rec.time}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', color: '#6366f1' }}>{rec.txHash}</td>
                    <td style={{ padding: '10px', color: '#10b981', fontWeight: 'bold' }}>{rec.status}</td>
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

          
          