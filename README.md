Auction Platform – Backend (Node.js + Express)

A RESTful API backend for managing auctions, users, bids, and authentication.

🚀 Features

🔐 Authentication

User registration & login
JWT-based authentication
Protected routes

🛍️ Auction Management

Create auctions
Update/Delete auctions
Fetch all auctions
Filter & search support

💰 Bidding System

Place bids
Track highest bid
View user bids

📊 Dashboard APIs

Auction statistics
Active vs closed auctions

🛠️ Tech Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB (Mongoose)
Authentication: JWT

📁 Folder Structure

server/
│
├── controllers/   # Business logic
├── models/        # Mongoose schemas
├── routes/        # API routes
├── middleware/    # Auth & error handling
├── config/        # DB & environment config
└── server.js

⚙️ Installation & Setup

cd server
npm install
Create .env file
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

▶️ Run Server

npm run dev

🔗 API Base URL

http://localhost:5000/api

Security

Password hashing
JWT authentication
Protected routes middleware
