# 📦 TrackFlow — Real-Time Order Tracking Platform

A full-stack order tracking application for a multi-city delivery service across India. Built with **React (Vite)**, **Node.js/Express**, and **MongoDB Atlas**, deployed on **Vercel**.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Node](https://img.shields.io/badge/node-%3E%3D18-blue)
![React](https://img.shields.io/badge/react-18-61DAFB)
![MongoDB](https://img.shields.io/badge/database-MongoDB%20Atlas-47A248)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black)

---

## 🏗️ Architecture

```
┌─────────────────────┐       ┌──────────────────────┐       ┌─────────────────────┐
│                     │       │                      │       │                     │
│   React Frontend    │◄─────►│  Express Backend     │◄─────►│   MongoDB Atlas     │
│   (Vite + React)    │ REST  │  (Node.js + Express) │ ODM   │   (Cloud Database)  │
│                     │ APIs  │                      │       │                     │
│   Deployed on       │       │   Deployed on        │       │   Free Tier M0      │
│   Vercel            │       │   Vercel (Serverless) │       │   Cluster           │
│                     │       │                      │       │                     │
└─────────────────────┘       └──────────────────────┘       └─────────────────────┘
      Port 5173                     Port 5000                  mongodb+srv://...
   (dev) / Vercel URL          (dev) / Vercel URL
```

### Data Flow
1. **User** interacts with the React frontend (view orders, update status, create/delete orders)
2. **Frontend** sends REST API requests to the Express backend via `axios`
3. **Backend** processes the request, connects to **MongoDB Atlas** via Mongoose
4. **Database** stores/retrieves order data and returns it through the chain
5. **Frontend** displays updated data in real-time (auto-polls every 30 seconds)

---

## 📁 Project Structure

```
internexus_week5/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx           # App header with gradient branding
│   │   │   ├── StatsBar.jsx         # Dashboard statistics cards
│   │   │   ├── StatusBadge.jsx      # Animated status pill badges
│   │   │   ├── OrderCard.jsx        # Individual order display card
│   │   │   ├── OrderList.jsx        # Order grid with search & filters
│   │   │   ├── OrderModal.jsx       # Create new order modal form
│   │   │   └── Loader.jsx           # Skeleton loading animation
│   │   ├── services/
│   │   │   └── api.js               # Axios API client configuration
│   │   ├── App.jsx                  # Main app with state management
│   │   ├── App.css                  # App-level styles & toast animations
│   │   ├── index.css                # Design system & global styles
│   │   └── main.jsx                 # React entry point
│   ├── index.html                   # HTML template
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json                  # Vercel SPA rewrite config
│   └── .env.example
│
├── server/                          # Express Backend
│   ├── api/
│   │   └── index.js                 # Express app (Vercel serverless entry)
│   ├── config/
│   │   └── db.js                    # MongoDB connection with caching
│   ├── models/
│   │   └── Order.js                 # Mongoose Order schema
│   ├── routes/
│   │   └── orders.js                # CRUD routes for orders
│   ├── seed.js                      # Database seeder with Indian data
│   ├── package.json
│   ├── vercel.json                  # Vercel serverless config
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 Features

- **📊 Dashboard Stats** — Real-time counts of total, in-transit, delivered, and cancelled orders
- **🔍 Search & Filter** — Search by customer name or order ID, filter by status
- **📝 Create Orders** — Modal form with dynamic item rows and city selection
- **🔄 Status Updates** — Update order status through the delivery lifecycle
- **🗑️ Delete Orders** — Remove orders with confirmation
- **🔔 Toast Notifications** — Success/error feedback with auto-dismiss
- **⏱️ Auto-Refresh** — Orders poll every 30 seconds for real-time updates
- **🎨 Premium Dark UI** — Glassmorphism, gradients, animations, and micro-interactions

---

## 🗄️ Database Schema

### Order Model

| Field             | Type     | Description                          |
|-------------------|----------|--------------------------------------|
| `orderId`         | String   | Unique order ID (e.g., ORD-1001)     |
| `customerName`    | String   | Customer's full name                 |
| `phone`           | String   | 10-digit Indian phone number         |
| `pickupAddress`   | String   | Pickup location address              |
| `deliveryAddress` | String   | Delivery destination address         |
| `city`            | String   | One of 10 major Indian cities        |
| `status`          | String   | Order lifecycle status               |
| `items`           | Array    | List of items (name + quantity)      |
| `totalAmount`     | Number   | Amount in INR (₹)                    |
| `estimatedDelivery`| String  | Estimated delivery time              |
| `createdAt`       | Date     | Order creation timestamp             |
| `updatedAt`       | Date     | Last update timestamp                |

### Status Lifecycle
```
Placed → Confirmed → Picked Up → In Transit → Out for Delivery → Delivered
                                                                 ↘ Cancelled
```

### Supported Cities
Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Jaipur, Ahmedabad, Lucknow

---

## 🔌 API Endpoints

| Method   | Endpoint           | Description              |
|----------|--------------------|--------------------------|
| `GET`    | `/api/health`      | Health check             |
| `GET`    | `/api/orders`      | List all orders          |
| `GET`    | `/api/orders/:id`  | Get order by ID          |
| `POST`   | `/api/orders`      | Create a new order       |
| `PUT`    | `/api/orders/:id`  | Update an order          |
| `DELETE` | `/api/orders/:id`  | Delete an order          |

> **Note:** The `:id` parameter accepts both MongoDB `_id` and custom `orderId` values.

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB Atlas** account (free tier works)
- **Vercel** account (for deployment)
- **Git** installed

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/internexus_week5.git
cd internexus_week5
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new **Free Tier (M0)** cluster
3. Create a database user with username and password
4. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere
5. Click **Connect** → **Connect your application** → Copy the connection string
6. Replace `<password>` with your database user's password

### 3. Configure the Backend

```bash
cd server
npm install

# Create .env file from template
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/order-tracking?retryWrites=true&w=majority
```

### 4. Seed the Database

```bash
cd server
node seed.js
# Output: "12 sample orders inserted successfully!"
```

### 5. Start the Backend Server

```bash
cd server
npm start
# Server running on port 5000
```

### 6. Configure the Frontend

```bash
cd client
npm install

# Create .env file from template
cp .env.example .env
# For local development, set:
# VITE_API_URL=http://localhost:5000
```

### 7. Start the Frontend Dev Server

```bash
cd client
npm run dev
# Frontend running on http://localhost:5173
```

---

## 🌐 Deployment

### Deploy Backend to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the server:
   ```bash
   cd server
   vercel
   ```

3. Set environment variables on Vercel:
   ```bash
   vercel env add MONGODB_URI
   # Paste your MongoDB Atlas connection string
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

5. Note the production URL (e.g., `https://order-tracking-server-xxx.vercel.app`)

### Deploy Frontend to Vercel

1. Deploy the client:
   ```bash
   cd client
   vercel
   ```

2. Set the backend URL environment variable:
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend production URL (e.g., https://order-tracking-server-xxx.vercel.app)
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

4. Note the production URL — this is your live app!

---

## 🧪 Testing the Live App

### 1. Verify Backend Health
```bash
curl https://<your-backend-url>/api/health
# Expected: {"status":"OK","message":"Server is healthy"}
```

### 2. Fetch All Orders
```bash
curl https://<your-backend-url>/api/orders
# Expected: Array of 12 seeded orders with Indian data
```

### 3. Update an Order Status
```bash
curl -X PUT https://<your-backend-url>/api/orders/ORD-1001 \
  -H "Content-Type: application/json" \
  -d '{"status": "Delivered"}'
# Expected: Updated order object with status "Delivered"
```

### 4. Create a New Order
```bash
curl -X POST https://<your-backend-url>/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-2001",
    "customerName": "Amit Patel",
    "phone": "9876543210",
    "pickupAddress": "MG Road, Mumbai",
    "deliveryAddress": "Andheri West, Mumbai",
    "city": "Mumbai",
    "items": [{"name": "Laptop Stand", "quantity": 1}],
    "totalAmount": 1500,
    "estimatedDelivery": "1-2 hours"
  }'
```

### 5. Test from Frontend
1. Open the frontend URL in your browser
2. View the dashboard with order statistics
3. Use the search bar to find orders by name or ID
4. Click status filter pills to filter by order status
5. Select a new status from the dropdown on any order card and click "Update Status"
6. Click "+ Create Order" to add a new order via the modal form
7. Verify the status change reflects immediately in the UI and persists after page refresh

---

## 🛠️ Tech Stack

| Layer      | Technology          | Purpose                              |
|------------|---------------------|--------------------------------------|
| Frontend   | React 18 + Vite 5   | UI framework + build tool            |
| Styling    | Vanilla CSS         | Custom dark theme + glassmorphism    |
| HTTP       | Axios               | API communication                    |
| Backend    | Node.js + Express 4 | REST API server                      |
| ODM        | Mongoose 8          | MongoDB object modeling              |
| Database   | MongoDB Atlas (M0)  | Cloud NoSQL database                 |
| Hosting    | Vercel              | Serverless deployment platform       |

---

## 🔒 Environment Variables

### Server (`server/.env`)
| Variable       | Description                          | Example                                        |
|----------------|--------------------------------------|-------------------------------------------------|
| `MONGODB_URI`  | MongoDB Atlas connection string      | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT`         | Server port (local dev only)         | `5000`                                          |

### Client (`client/.env`)
| Variable       | Description                          | Example                                        |
|----------------|--------------------------------------|-------------------------------------------------|
| `VITE_API_URL` | Backend API base URL                 | `https://your-backend.vercel.app`               |

---

## 👥 Sample Data

The seed script populates 12 orders with realistic Indian data including:
- **Customers**: Rajesh Kumar, Priya Sharma, Anand Mehta, Sneha Reddy, and more
- **Cities**: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Jaipur, Ahmedabad, Lucknow
- **Items**: Electronics, groceries, clothing, books, home appliances
- **Amounts**: ₹500 to ₹25,000
- **Statuses**: Mix of all 7 lifecycle states

---

## 📝 License

This project is built for the InteRNexus Week 5 assignment.