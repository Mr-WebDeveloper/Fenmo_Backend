# 🚀 Expense Tracker API (Backend)

A production-ready backend API for managing personal expenses.
Designed to handle real-world conditions like retries, network failures, and scalability.

---

## 📌 Tech Stack

* Node.js
* Express.js
* MongoDB 
* Mongoose 
---

## 📁 Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=8000

# OPTION 1: MongoDB Atlas (Cloud)
MONGO_USER=
MONGO_PASSWORD=
MONGO_CLUSTER=
MONGO_DB=

```

---

## 🧠 MongoDB Configuration (Important)


---

### ✅ MongoDB Atlas (Cloud - Recommended)

Fill `.env` like this:

```env
MONGO_USER=yourUsername
MONGO_PASSWORD=yourPassword
MONGO_CLUSTER=cluster0.xxxxx.mongodb.net
MONGO_DB=expense_tracker
```
---

---

## ▶️ Running the Server

### Production mode

```bash
npm start
```

Server runs at:

```
http://localhost:8000
```

---

## 📌 Notes

This project is designed to be **extendable and production-ready**, not a basic demo.
Structure and patterns are chosen to support scaling and long-term maintenance.
