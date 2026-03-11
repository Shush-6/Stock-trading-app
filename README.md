# 📈 MERN Stack Stock Trading Web Application

A complete **full-stack MERN application** for **virtual stock trading**.

💻 Built using the **MERN Stack**:

* MongoDB
* Express.js
* React.js
* Node.js

Users can simulate stock trading with a **virtual wallet** and manage their portfolio in a modern web interface.

---

# ⚙️ Prerequisites

Before running the project, make sure you have:

* 🟢 Node.js installed
* 🗄 MongoDB Atlas Cluster connection URI

---

# 🧑‍💻 Local Development Setup

Follow these steps to run the project locally.

## 1️⃣ Create Environment Variables

Create a `.env` file in the **root folder** based on `.env.example`.

Add the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key

---

## 2️⃣ Install Dependencies

Open terminal in the **root folder** and run:

```bash
npm install
```

---

## 3️⃣ Seed Sample Stock Data

Populate the database with sample stock data.

```bash
npm run seed
```

---

## 4️⃣ Run Development Servers

Run **backend and frontend separately** using two terminals.

### 🖥 Terminal 1 – Backend Server

```bash
npm run server
```

### 🎨 Terminal 2 – Frontend (React App)

```bash
cd client
npm run dev
```

Now open the frontend in your browser.

---

# ☁️ Render Deployment Instructions

This project is already configured for **easy deployment on Render** as a **single Web Service**.

## 1️⃣ Create Web Service

Go to **Render Dashboard** and:

* Create a **New Web Service**
* Connect your **GitHub Repository**

---

## 2️⃣ Configure Deployment Settings

Use the following configuration:

Environment: Node
Build Command: `npm run build`
Start Command: `npm start`

---

## 3️⃣ Add Environment Variables

Add the following variables in **Render Environment Settings**:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key

---

## 4️⃣ Deploy 🚀

Click **Deploy**.

Render will automatically:

1️⃣ Run `npm install`
2️⃣ Run `npm run build` to build the React app
3️⃣ Run `npm start` to launch the Express server

The **Express server serves both API and frontend build files**.

---

# ✨ Features Included

🔐 **User Authentication**

* Register & Login system
* Secure JWT authentication

💰 **Virtual Wallet**

* New users start with **$10,000 virtual balance**

📊 **Market Dashboard**

* Browse available stocks
* View stock prices

🛒 **Buy Stocks**

* Purchase stocks directly from the market
* Wallet updates dynamically

📁 **Portfolio Page**

* View owned stocks
* See total investment value

💸 **Sell Stocks**

* Sell stocks anytime from the portfolio
* Wallet balance updates instantly

🎨 **Modern UI**

* Clean and responsive design
* Smooth user experience

---

✅ **Perfect for learning:**

* MERN Stack Development
* Full-Stack Architecture
* REST APIs
* Authentication with JWT
* MongoDB Database Integration
