# Event Management Platform – Backend (MVP)

This repository contains the backend for a **college-focused event management platform**. It is designed to be a lightweight, secure, and scalable API.

---

## 🚀 Tech Stack
* Node.js & Express.js - Server framework
* MongoDB & Mongoose - Database and ODM
* JWT - Stateless Authentication
* bcrypt - Secure Password Hashing

---

## 🗂️ Project Structure
Use this as a map to navigate the logic:

src/
├── config/             # Database connection (db.js)
├── controllers/        # Logic for handling requests (auth, events)
├── middleware/         # Auth & Role verification (auth.js, role.js)
├── models/             # Mongoose schemas (User.js, Event.js)
├── routes/             # API route definitions
├── utils/              # Helpers (generateToken.js)
├── app.js              # Express app setup
└── server.js           # Entry point (port listener)

---

## 👥 User Roles & Permissions

| Role | Permissions | Restrictions |
| :--- | :--- | :--- |
| Student | View events, (Upcoming) Register | Cannot create/edit events |
| Organizer | Create/Manage events, View attendees | Cannot register for own events |

---

## 🔐 Authentication & Security
* JWT-based: Token must be sent in the header: Authorization: Bearer <token>
* Payload: Contains userId and role.
* Security: Passwords hashed with bcrypt; Role-based middleware enforcement.

---

## 📌 API Endpoints

### 🔑 Authentication
* POST /auth/register - Register Student/Organizer
* POST /auth/login - Returns JWT and user details

Registration Body Example:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "student",
  "collegeId": "JECRC"
}

### 📅 Events
* POST /events - (Organizer Only) Create a new event
* GET /events - Get upcoming events
* GET /events?past=true - View archive of past events

---

## 🧠 Data Models

### User Model
* name, email (unique), passwordHash, role (student/organizer), collegeId.

### Event Model
* title, description, date, time, venue, capacity.
* createdBy (Ref to User), collegeId, isPublished.

---

## ⚠️ MVP Limitations & Roadmap
* Current: Auth and Event CRUD are stable.
* Next: Event registration logic (Student <-> Event).
* Future: Payments, QR check-in, and Admin Dashboard.

---

