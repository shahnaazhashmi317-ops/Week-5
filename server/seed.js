const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/Order');

const sampleOrders = [
  {
    orderId: 'ORD-1001',
    customerName: 'Rajesh Kumar',
    phone: '9876543210',
    pickupAddress: 'Andheri East',
    deliveryAddress: 'Bandra West',
    city: 'Mumbai',
    status: 'Delivered',
    items: [
      { name: 'Smartphone', quantity: 1 },
      { name: 'Phone Case', quantity: 2 }
    ],
    totalAmount: 15500,
    estimatedDelivery: '1 hour',
  },
  {
    orderId: 'ORD-1002',
    customerName: 'Priya Sharma',
    phone: '8765432109',
    pickupAddress: 'Connaught Place',
    deliveryAddress: 'Saket',
    city: 'Delhi',
    status: 'In Transit',
    items: [
      { name: 'Laptop Backpack', quantity: 1 }
    ],
    totalAmount: 2500,
    estimatedDelivery: '2-3 hours',
  },
  {
    orderId: 'ORD-1003',
    customerName: 'Anand Mehta',
    phone: '7654321098',
    pickupAddress: 'Koramangala',
    deliveryAddress: 'Indiranagar',
    city: 'Bangalore',
    status: 'Picked Up',
    items: [
      { name: 'Bluetooth Earbuds', quantity: 1 },
      { name: 'Smart Watch', quantity: 1 }
    ],
    totalAmount: 8000,
    estimatedDelivery: '1.5 hours',
  },
  {
    orderId: 'ORD-1004',
    customerName: 'Sneha Reddy',
    phone: '9988776655',
    pickupAddress: 'Banjara Hills',
    deliveryAddress: 'Jubilee Hills',
    city: 'Hyderabad',
    status: 'Confirmed',
    items: [
      { name: 'Designer Dress', quantity: 1 }
    ],
    totalAmount: 4500,
    estimatedDelivery: 'Tomorrow',
  },
  {
    orderId: 'ORD-1005',
    customerName: 'Amit Patel',
    phone: '8877665544',
    pickupAddress: 'Vastrapur',
    deliveryAddress: 'Navrangpura',
    city: 'Ahmedabad',
    status: 'Placed',
    items: [
      { name: 'Groceries - Weekly Pack', quantity: 1 }
    ],
    totalAmount: 3200,
    estimatedDelivery: 'Today by 8 PM',
  },
  {
    orderId: 'ORD-1006',
    customerName: 'Kavita Singh',
    phone: '7766554433',
    pickupAddress: 'Gomti Nagar',
    deliveryAddress: 'Hazratganj',
    city: 'Lucknow',
    status: 'Out for Delivery',
    items: [
      { name: 'Microwave Oven', quantity: 1 }
    ],
    totalAmount: 12000,
    estimatedDelivery: '30 mins',
  },
  {
    orderId: 'ORD-1007',
    customerName: 'Suresh Menon',
    phone: '6655443322',
    pickupAddress: 'T Nagar',
    deliveryAddress: 'Adyar',
    city: 'Chennai',
    status: 'Cancelled',
    items: [
      { name: 'Running Shoes', quantity: 1 }
    ],
    totalAmount: 5500,
    estimatedDelivery: 'N/A',
  },
  {
    orderId: 'ORD-1008',
    customerName: 'Neha Gupta',
    phone: '9898989898',
    pickupAddress: 'Kothrud',
    deliveryAddress: 'Viman Nagar',
    city: 'Pune',
    status: 'Delivered',
    items: [
      { name: 'Books - Sci-Fi Collection', quantity: 3 }
    ],
    totalAmount: 1200,
    estimatedDelivery: 'Delivered',
  },
  {
    orderId: 'ORD-1009',
    customerName: 'Vikram Das',
    phone: '8787878787',
    pickupAddress: 'Salt Lake',
    deliveryAddress: 'Park Street',
    city: 'Kolkata',
    status: 'In Transit',
    items: [
      { name: 'Digital Camera', quantity: 1 },
      { name: 'SD Card 128GB', quantity: 1 }
    ],
    totalAmount: 25000,
    estimatedDelivery: '4 hours',
  },
  {
    orderId: 'ORD-1010',
    customerName: 'Pooja Joshi',
    phone: '7676767676',
    pickupAddress: 'Malviya Nagar',
    deliveryAddress: 'Vaishali Nagar',
    city: 'Jaipur',
    status: 'Picked Up',
    items: [
      { name: 'Handicraft Showpiece', quantity: 2 }
    ],
    totalAmount: 3800,
    estimatedDelivery: '2 hours',
  },
  {
    orderId: 'ORD-1011',
    customerName: 'Ravi Verma',
    phone: '9595959595',
    pickupAddress: 'Borivali West',
    deliveryAddress: 'Goregaon East',
    city: 'Mumbai',
    status: 'Confirmed',
    items: [
      { name: 'Office Chair', quantity: 1 }
    ],
    totalAmount: 8500,
    estimatedDelivery: 'Tomorrow',
  },
  {
    orderId: 'ORD-1012',
    customerName: 'Anjali Desai',
    phone: '8484848484',
    pickupAddress: 'Def Col',
    deliveryAddress: 'Vasant Kunj',
    city: 'Delhi',
    status: 'Placed',
    items: [
      { name: 'Skincare Kit', quantity: 1 },
      { name: 'Perfume', quantity: 1 }
    ],
    totalAmount: 4200,
    estimatedDelivery: 'Today by 9 PM',
  }
];

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');

    console.log('Clearing existing orders...');
    await Order.deleteMany({});
    console.log('Existing orders cleared.');

    console.log('Inserting sample orders...');
    await Order.insertMany(sampleOrders);
    console.log('Sample orders inserted successfully.');

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    console.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('Disconnected.');
    process.exit(0);
  }
};

seedData();
