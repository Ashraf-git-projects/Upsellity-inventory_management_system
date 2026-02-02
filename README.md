# Inventory Management System

# 1. Project Overview
A simple full-stack Inventory Management Dashboard built for merchants to manage products, track stock levels, and view inventory analytics.

This project was developed as part of a technical assignment to demonstrate full-stack development, clean code structure, and product thinking.

---

## 🚀 Live Demo

- **Frontend:** https://upsellity-inventory-management-syst.vercel.app/
- **Backend API:** https://upsellity-inventory-management-system.onrender.com

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Plain CSS / inline styles

### Backend
- Node.js
- Express.js
- In-memory data storage (no database)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ✨ Features

### Product Management
- Create, view, edit, and delete products
- Fields: name, SKU, price, stock quantity, minimum stock
- SKU uniqueness enforced

### Inventory Status
- In Stock
- Low Stock
- Out of Stock
- Color-coded indicators

### Dashboard Analytics
- Total products
- Total inventory value
- Low stock count
- Out-of-stock count
- Low stock alerts list

### Search & Usability
- Clean and intuitive UI
- CSV export of inventory
- Confirmation before delete actions

---

## 📦 API Endpoints (Backend)

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/analytics`

---

## ⚠️ Important Notes

- The backend uses **in-memory storage**
- Data resets on server restart or cold start
- This behavior is intentional and aligns with assignment requirements

---

## 🧑‍💻 Local Setup (Optional)

### Backend

cd server
npm install
node server.js

### Frontend

Copy code
cd client
npm install
npm run dev
✅ Assignment Checklist
 CRUD Product Management

 Inventory Dashboard

 Analytics API

 CSV Export

 Clean UI/UX

 Deployed Frontend & Backend

## 2. Architecture Overview

### Frontend
- Built using React with Vite
- Component-based structure
- Pages: Dashboard, Products, Add/Edit Product
- Centralized API service for backend communication

### Backend
- Node.js + Express
- RESTful APIs
- In-memory data storage
- Clear separation of routes and controllers

---

## 3. Data Model

Each product contains:
- id
- name
- sku (unique)
- price
- stock
- minStock
- createdAt
- updatedAt

Stock status is **derived dynamically**:
- IN_STOCK
- LOW_STOCK
- OUT_OF_STOCK

---

## 4. Key Design Decisions

### In-Memory Storage
Chosen intentionally to:
- Keep the system simple
- Match assignment requirements
- Focus on logic and API design

### Single Add/Edit Form
- Reused for both creating and updating products
- Route-based behavior (`/new` vs `/edit/:id`)
- Reduces duplication and improves maintainability

### Frontend CSV Export
- Avoided unnecessary backend complexity
- Allows instant inventory download
- Simple and effective for merchants

---

## 5. Analytics Calculation

The backend calculates:
- Total inventory value = sum(price × stock)
- Low stock and out-of-stock counts
- Low stock product list

All analytics are computed dynamically on request.

---

## 6. Error Handling & Validation

- Required fields validated on backend
- Negative values prevented
- User-friendly error messages shown in UI
- Delete actions require confirmation

---

## 7. Deployment Notes

- Backend deployed on Render (free tier)
- Frontend deployed on Vercel
- Cold starts may cause a short delay
- Data resets are expected due to in-memory storage

---

## 8. Future Improvements

- Persistent database (PostgreSQL / MongoDB)
- Authentication & user roles
- Pagination and advanced filters
- Charts for analytics visualization
- Stock history tracking

---

## 9. Conclusion

This project demonstrates a complete full-stack workflow, from API design to UI polish and deployment, with a strong focus on product usability and clean implementation.

👤 Author
Ashraf Hussain Siddiqui
ashrafhussain2265@gmail.com
