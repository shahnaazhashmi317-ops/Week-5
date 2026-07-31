import React from 'react';

const StatusBadge = ({ status }) => {
  const config = {
    'Placed': { bg: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', dot: '#94a3b8' },
    'Confirmed': { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', dot: '#3b82f6' },
    'Picked Up': { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', dot: '#6366f1' },
    'In Transit': { bg: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', dot: '#f59e0b', pulse: true },
    'Out for Delivery': { bg: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee', dot: '#06b6d4', pulse: true },
    'Delivered': { bg: 'rgba(16, 185, 129, 0.1)', color: '#34d399', dot: '#10b981' },
    'Cancelled': { bg: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', dot: '#f43f5e' },
  };

  const style = config[status] || config['Placed'];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: style.bg,
      color: style.color,
      padding: '0.35rem 0.85rem',
      borderRadius: '999px',
      fontSize: '0.85rem',
      fontWeight: '600',
      border: `1px solid ${style.bg}`,
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: style.dot,
        boxShadow: style.pulse ? `0 0 8px ${style.dot}` : 'none',
        animation: style.pulse ? 'pulse 1.5s infinite' : 'none'
      }}></span>
      {status}
      {style.pulse && (
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(0.95); opacity: 0.8; }
              50% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(0.95); opacity: 0.8; }
            }
          `}
        </style>
      )}
    </div>
  );
};

export default StatusBadge;
