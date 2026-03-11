# MERN Stack Stock Trading Web Application

A complete full-stack MERN application for virtual stock trading.

## Prerequisites

- Node.js installed
- MongoDB Atlas cluster connection URI

## Local Development

1. Create a `.env` file in the root based on `.env.example`. Provide your MongoDB connection string and a random JWT Secret.
2. Open terminal in the root folder and run:
   ```bash
   npm install
   ```
3. Seed the database with sample stocks:
   ```bash
   npm run seed
   ```
4. Run the development server (runs both frontend and backend concurrently normally, but we have separate paths. For easiest dev, open two terminals):
   **Terminal 1 (Backend):** 
   ```bash
   npm run server
   ```
   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev
   ```

## Render Deployment Instructions

This project is already configured for easy deployment on Render as a single Web Service.

1. Create a new **Web Service** on Render and connect your GitHub repository.
2. Setup the configuration as follows:
   - **Environment:** Node
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
3. Add the following **Environment Variables**:
   - `MONGO_URI` (Your MongoDB Atlas connection string)
   - `JWT_SECRET` (A strong random secret key for authentication)
4. Click **Deploy**. Render will automatically:
   - Run `npm install` on the root (which installs backend dependencies)
   - Run the custom build script `npm run build` (which installs frontend dependencies and builds the React app inside `/client/dist`)
   - Run `npm start` (which spins up the Express server that serves the API and the React build files)

## Features Included

- User Authentication with JWT (Register & Login)
- Virtual $10,000 Wallet Balance for new users
- Market Dashboard to browse available stocks
- Buying stocks and dynamic wallet updates
- Portfolio Page showing owned assets and current valuation
- Selling stocks directly from the portfolio
- Beautiful, clean, modern UI.
