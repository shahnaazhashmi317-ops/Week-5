import React, { useState } from 'react';

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Lucknow'];

const OrderModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    city: 'Mumbai',
    items: [{ name: '', quantity: 1 }],
    totalAmount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderId = 'ORD-' + Date.now().toString().slice(-4);
    onSubmit({
      ...formData,
      orderId,
      totalAmount: Number(formData.totalAmount),
      estimatedDelivery: '2-3 hours'
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { name: '', quantity: 1 }] });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: newItems });
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>✨ New Order</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Customer Name</label>
              <input required type="text" style={styles.input} value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} placeholder="John Doe" />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Phone</label>
              <input required type="tel" style={styles.input} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 9876543210" />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Pickup Address</label>
              <textarea required style={styles.textarea} value={formData.pickupAddress} onChange={e => setFormData({...formData, pickupAddress: e.target.value})} placeholder="Warehouse / Store address"></textarea>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Delivery Address</label>
              <textarea required style={styles.textarea} value={formData.deliveryAddress} onChange={e => setFormData({...formData, deliveryAddress: e.target.value})} placeholder="Customer address"></textarea>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>City</label>
              <select style={styles.input} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Total Amount (₹)</label>
              <input required type="number" style={styles.input} value={formData.totalAmount} onChange={e => setFormData({...formData, totalAmount: e.target.value})} placeholder="0.00" />
            </div>
          </div>

          <div style={styles.group}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
              <label style={{...styles.label, marginBottom: 0}}>Items</label>
              <button type="button" onClick={addItem} style={styles.addBtn}>+ Add Item</button>
            </div>
            {formData.items.map((item, i) => (
              <div key={i} style={styles.itemRow}>
                <input required type="text" style={{...styles.input, flex: 2}} placeholder="Item name" value={item.name} onChange={e => handleItemChange(i, 'name', e.target.value)} />
                <input required type="number" min="1" style={{...styles.input, width: '80px'}} value={item.quantity} onChange={e => handleItemChange(i, 'quantity', Number(e.target.value))} />
                <button type="button" onClick={() => removeItem(i)} style={styles.removeBtn}>✕</button>
              </div>
            ))}
          </div>

          <div style={styles.footer}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submitBtn}>Create Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    background: 'var(--bg-dark)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    animation: 'slideUp 0.3s ease',
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--border-light)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' },
  closeBtn: { background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.25rem', cursor: 'pointer' },
  form: { padding: '1.5rem' },
  row: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  group: { flex: 1, marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'var(--transition)',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    minHeight: '80px',
    resize: 'vertical',
  },
  itemRow: { display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' },
  addBtn: { background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '500' },
  removeBtn: { background: 'rgba(244, 63, 94, 0.1)', border: 'none', color: 'var(--danger)', width: '40px', borderRadius: 'var(--radius-sm)' },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border-light)',
  },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid var(--border-light)',
    color: 'var(--text-primary)',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-sm)',
    fontWeight: '500',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, var(--primary-start), var(--primary-end))',
    border: 'none',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-sm)',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
  }
};

export default OrderModal;
