# Event Management Platform – Backend (MVP)

This repository contains the backend for a **college-focused event management platform**.

The backend is designed with:
- role-based access control
- JWT authentication
- clean data modeling
- strict business rules

The goal is **clarity, correctness, and scalability**, not feature overload.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

---

## 👥 User Roles

### 1. Student
- View events
- Register for events (later step)
- Cannot create events

### 2. Organizer
- Create and manage events
- View registrations for their events
- Cannot register for their own events

---

## 🗂️ Project Structure

src/
├── controllers/
│ ├── auth.controller.js
│ └── event.controller.js
├── middleware/
│ ├── auth.js
│ └── role.js
├── models/
│ ├── User.js
│ └── Event.js
├── routes/
│ ├── auth.routes.js
│ └── event.routes.js
├── utils/
│ └── generateToken.js
├── config/
│ └── db.js
├── app.js
└── server.js


---

## 🔐 Authentication

Authentication is **JWT-based**.

- Token is sent in header:

Authorization: Bearer <token>

- Token payload contains:
  - user ID
  - user role

---

## 📌 API Endpoints

### 🔑 Auth Routes

#### Register User

POST /auth/register


**Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "student",
  "collegeId": "JECRC"
}
Behavior

Validates input

Hashes password

Prevents duplicate users

Login User
POST /auth/login


Body

{
  "email": "john@example.com",
  "password": "secret123"
}


Response

JWT token

User details (without password)

📅 Event Routes
Create Event (Organizer only)
POST /events


Headers

Authorization: Bearer <organizer-token>


Body

{
  "title": "Tech Fest 2026",
  "description": "Annual technical event",
  "date": "2026-02-10",
  "time": "10:00 AM",
  "venue": "Main Auditorium",
  "capacity": 200
}


Rules

Only organizers can create events

createdBy and collegeId are derived from token

Students are blocked at middleware level

Get Events (Public / Optional Auth)
GET /events


Behavior

Returns upcoming events by default

Filters by collegeId if user is authenticated

Only published events are returned

Get Past Events
GET /events?past=true
