import React from 'react';

const StatsBar = ({ orders }) => {
  const stats = [
    { label: 'Total Orders', count: orders.length, icon: '📊', color: 'var(--primary-start)' },
    { label: 'In Transit', count: orders.filter(o => o.status === 'In Transit' || o.status === 'Out for Delivery').length, icon: '🚚', color: 'var(--warning)' },
    { label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, icon: '✅', color: 'var(--success)' },
    { label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length, icon: '❌', color: 'var(--danger)' },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} style={{ ...styles.card, borderTopColor: stat.color }}>
          <div style={styles.header}>
            <span style={styles.icon}>{stat.icon}</span>
            <span style={styles.label}>{stat.label}</span>
          </div>
          <div style={styles.count}>{stat.count}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    margin: '2rem 0',
  },
  card: {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--border-light)',
    borderTop: '3px solid',
    borderRadius: 'var(--radius-md)',
    padding: '1.5rem',
    transition: 'var(--transition)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '1.25rem',
  },
  label: {
    color: 'var(--text-secondary)',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  count: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    lineHeight: '1',
  },
};

export default StatsBar;
