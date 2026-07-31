import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import OrderList from './components/OrderList';
import OrderModal from './components/OrderModal';
import { getOrders, createOrder, updateOrder, deleteOrder } from './services/api';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (error) {
      showNotification('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleCreateOrder = async (data) => {
    try {
      await createOrder(data);
      showNotification('Order created successfully! 🎉');
      setModalOpen(false);
      fetchOrders();
    } catch (error) {
      showNotification('Failed to create order', 'error');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrder(id, { status });
      showNotification('Order status updated!');
      fetchOrders();
    } catch (error) {
      showNotification('Failed to update status', 'error');
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      showNotification('Order deleted');
      fetchOrders();
    } catch (error) {
      showNotification('Failed to delete order', 'error');
    }
  };

  return (
    <>
      <Header onCreateClick={() => setModalOpen(true)} />
      
      <main className="app-container">
        <StatsBar orders={orders} />
        <OrderList 
          orders={orders} 
          loading={loading} 
          onStatusUpdate={handleUpdateStatus}
          onDelete={handleDeleteOrder}
        />
      </main>

      {modalOpen && (
        <OrderModal 
          onClose={() => setModalOpen(false)} 
          onSubmit={handleCreateOrder} 
        />
      )}

      <div className="toast-container">
        {notifications.map(n => (
          <div key={n.id} className={`toast ${n.type}`}>
            {n.type === 'success' ? '✅' : '❌'} {n.message}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
