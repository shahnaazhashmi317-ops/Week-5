import React from 'react';

const Header = ({ onCreateClick }) => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div>
          <h1 style={styles.title}>
            📦 <span style={styles.gradientText}>TrackFlow</span>
          </h1>
          <p style={styles.subtitle}>Real-time Order Tracking Platform</p>
        </div>
        <button style={styles.btn} onClick={onCreateClick}>
          + Create Order
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10, 10, 15, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border-light)',
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    fontWeight: '500',
  },
  btn: {
    background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-sm)',
    fontWeight: '600',
    fontSize: '0.95rem',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
    transition: 'var(--transition)',
  },
};

export default Header;
