import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

const OrderCard = ({ order, onStatusUpdate, onDelete }) => {
  const [newStatus, setNewStatus] = useState(order.status || 'Placed');

  const statuses = ['Placed', 'Confirmed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const handleUpdate = () => {
    if (newStatus !== order.status) {
      onStatusUpdate(order._id || order.id, newStatus);
    }
  };

  const getBorderColor = (status) => {
    const colors = {
      'Delivered': 'var(--success)',
      'Cancelled': 'var(--danger)',
      'In Transit': 'var(--warning)',
      'Out for Delivery': 'var(--accent-cyan)',
    };
    return colors[status] || 'var(--primary-start)';
  };

  return (
    <div style={{...styles.card, borderLeftColor: getBorderColor(order.status)}}>
      <div style={styles.header}>
        <div>
          <span style={styles.orderId}>{order.orderId || '#' + String(order._id || '').slice(-6).toUpperCase()}</span>
          <h3 style={styles.customerName}>{order.customerName}</h3>
          <p style={styles.phone}>📞 {order.phone}</p>
        </div>
        <button onClick={() => onDelete(order._id || order.id)} style={styles.deleteBtn} title="Delete Order">✕</button>
      </div>

      <div style={styles.addressBlock}>
        <div style={styles.addressNode}>
          <div style={styles.dot}></div>
          <div style={styles.addressText}>{order.pickupAddress}</div>
        </div>
        <div style={styles.addressLine}></div>
        <div style={styles.addressNode}>
          <div style={{...styles.dot, borderColor: 'var(--primary-start)'}}></div>
          <div style={styles.addressText}>{order.deliveryAddress}</div>
        </div>
        <div style={styles.cityBadge}>📍 {order.city}</div>
      </div>

      <div style={styles.itemsBlock}>
        {order.items && order.items.map((item, i) => (
          <span key={i} style={styles.itemPill}>{item.name} × {item.quantity}</span>
        ))}
      </div>

      <div style={styles.metaRow}>
        <div style={styles.amount}>₹{order.totalAmount?.toLocaleString('en-IN')}</div>
        <StatusBadge status={order.status} />
      </div>

      <div style={styles.footer}>
        <select 
          style={styles.select} 
          value={newStatus} 
          onChange={(e) => setNewStatus(e.target.value)}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button style={styles.updateBtn} onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'var(--card-bg)',
    border: '1px solid var(--border-light)',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderRadius: 'var(--radius-md)',
    padding: '1.5rem',
    position: 'relative',
    transition: 'var(--transition)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    fontFamily: 'monospace',
    color: 'var(--accent-cyan)',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '1px',
    background: 'rgba(6, 182, 212, 0.1)',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
  },
  customerName: {
    margin: '0.5rem 0 0.25rem 0',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  phone: {
    margin: 0,
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '1.2rem',
    padding: '0.25rem',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'var(--transition)',
  },
  addressBlock: {
    position: 'relative',
    padding: '0.5rem 0',
  },
  addressNode: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '1rem',
    position: 'relative',
    zIndex: 2,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid var(--text-secondary)',
    background: 'var(--bg-dark)',
    marginTop: '4px',
  },
  addressLine: {
    position: 'absolute',
    left: '5px',
    top: '20px',
    bottom: '30px',
    width: '2px',
    background: 'var(--border-light)',
    zIndex: 1,
  },
  addressText: {
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    lineHeight: '1.4',
  },
  cityBadge: {
    display: 'inline-block',
    fontSize: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    marginTop: '-0.5rem',
    marginLeft: '1.5rem',
  },
  itemsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  itemPill: {
    fontSize: '0.75rem',
    background: 'rgba(255,255,255,0.08)',
    padding: '0.25rem 0.6rem',
    borderRadius: '999px',
    color: 'var(--text-primary)',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.5rem',
    borderTop: '1px dashed var(--border-light)',
  },
  amount: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  footer: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: 'auto',
  },
  select: {
    flex: 1,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-light)',
    color: 'var(--text-primary)',
    padding: '0.5rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9rem',
    outline: 'none',
  },
  updateBtn: {
    background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-sm)',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
};

export default OrderCard;
