const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../config/db');
const orderRoutes = require('../routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

connectDB().catch(err => console.error('MongoDB connection error:', err));

app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Order Tracking API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
