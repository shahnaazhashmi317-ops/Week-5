import React from 'react';

const Loader = () => {
  return (
    <div style={styles.grid}>
      {[1, 2, 3].map(i => (
        <div key={i} style={styles.skeleton}>
          <div style={{...styles.line, width: '40%', height: '24px', marginBottom: '1.5rem'}}></div>
          <div style={{...styles.line, width: '70%', marginBottom: '0.75rem'}}></div>
          <div style={{...styles.line, width: '50%', marginBottom: '2rem'}}></div>
          
          <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
            <div style={{...styles.box, flex: 1}}></div>
            <div style={{...styles.box, flex: 1}}></div>
          </div>
          
          <div style={{...styles.line, width: '100%', height: '40px', borderRadius: '8px'}}></div>
        </div>
      ))}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
  },
  skeleton: {
    background: 'var(--card-bg)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    height: '100%',
  },
  line: {
    height: '16px',
    borderRadius: '4px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite',
  },
  box: {
    height: '60px',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite',
  }
};

export default Loader;
