# 🖥️ Auction System Backend

This is the backend server for the Auction System project. It handles authentication, user management, auctions, admin dashboard, and file uploads.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication
* Cloudinary (for image upload)

---

## 📁 Project Setup

### 1. Clone the repository

```bash
git clone <https://github.com/Romildajayaraj/AP-backend>

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
ORIGIN=http://localhost:5173

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auctionDB?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RESEND_API_KEY=your_resend_api_key
```

---

### 4. Run the server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

| Feature | Endpoint       |
| ------- | -------------- |
| Auth    | `/api/auth`    |
| User    | `/api/user`    |
| Auction | `/api/auction` |
| Contact | `/api/contact` |
| Admin   | `/api/admin`   |
| Upload  | `/api/upload`  |

---

## 🔐 Demo Credentials

```json
{
  "email": "testuser@gmail.com",
  "password": "12345678"
}
```
## 🌐 Live Demo

- Frontend: https://biddingnest.netlify.app
- Backend API: https://ap-backend-l7u7.onrender.com

--------

## 🧑‍💻 Author

Romi ❤️
