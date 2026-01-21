# Event Management Platform – Backend (MVP)

This repository contains the backend for a **college-focused event management platform**.

The backend is designed with:
- Role-based access control
- JWT authentication
- Clean data modeling
- Strict business rules

The focus is **correctness, security, and scalability**, not feature overload.

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
- (Upcoming) Register for events
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

yaml
Copy code

---

## 🔐 Authentication

Authentication is **JWT-based**.

- Token must be sent in headers:
Authorization: Bearer <token>

yaml
Copy code

- Token payload contains:
  - user ID
  - user role

---

## 📌 API Endpoints

---

### 🔑 Auth Routes

#### Register User
POST /auth/register

css
Copy code

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "student",
  "collegeId": "JECRC"
}
Behavior

Validates all fields

Hashes password before storing

Prevents duplicate email registration

Login User
bash
Copy code
POST /auth/login
Request Body

json
Copy code
{
  "email": "john@example.com",
  "password": "secret123"
}
Response

Returns JWT token

Returns user details (password never included)

📅 Event Routes
Create Event (Organizer only)
bash
Copy code
POST /events
Headers

makefile
Copy code
Authorization: Bearer <organizer-token>
Request Body

json
Copy code
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

createdBy is taken from logged-in user

collegeId is taken from logged-in user

Students are blocked at middleware level

Get Events (Public / Optional Auth)
bash
Copy code
GET /events
Behavior

Returns upcoming events by default

Returns only published events

If user is logged in, results are filtered by collegeId

Get Past Events
bash
Copy code
GET /events?past=true
🧠 Data Models
User
name

email (unique)

passwordHash

role (student | organizer)

collegeId

Event
title

description

date

time

venue

capacity

createdBy (organizer reference)

collegeId

isPublished

🔒 Security Rules
Passwords are never stored or returned in plain text

JWT is verified on protected routes

Role-based middleware enforces permissions

Middleware always stops execution on failure

Event ownership is enforced at backend level

⚠️ MVP Limitations
Not implemented yet:

Event registration (student ↔ event)

Payments

QR check-in

Admin dashboard

Notifications

These will be added after core flows are stable.

🧪 Testing
APIs tested using Postman

Verified scenarios:

Successful registration & login

Invalid credentials

Missing required fields

Unauthorized role access

Event creation security

🏁 Current Status
Backend MVP is stable and functional.


---









