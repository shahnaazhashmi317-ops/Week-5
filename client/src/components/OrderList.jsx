import React, { useState } from 'react';
import OrderCard from './OrderCard';
import Loader from './Loader';

const OrderList = ({ orders, loading, onStatusUpdate, onDelete }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const statuses = ['All', 'Placed', 'Confirmed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'All' || order.status === filter;
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      (order.customerName && order.customerName.toLowerCase().includes(searchLower)) ||
      (order._id && String(order._id).toLowerCase().includes(searchLower)) ||
      (order.id && String(order.id).toLowerCase().includes(searchLower));
    return matchesFilter && matchesSearch;
  });

  if (loading) return <Loader />;

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            style={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div style={styles.filters}>
          {statuses.map(s => (
            <button 
              key={s} 
              style={{
                ...styles.filterBtn,
                background: filter === s ? 'var(--primary-start)' : 'rgba(255,255,255,0.03)',
                borderColor: filter === s ? 'var(--primary-start)' : 'var(--border-light)',
                color: filter === s ? '#fff' : 'var(--text-secondary)',
              }}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No orders found</h3>
          <p>Try adjusting your filters or create a new order.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredOrders.map(order => (
            <OrderCard 
              key={order._id || order.id} 
              order={order} 
              onStatusUpdate={onStatusUpdate} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  searchBox: {
    position: 'relative',
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-secondary)',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'var(--transition)',
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.4rem 1rem',
    borderRadius: '999px',
    border: '1px solid',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'var(--transition)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'var(--card-bg)',
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed var(--border-light)',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
};

export default OrderList;
