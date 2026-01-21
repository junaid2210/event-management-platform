# Event Management Platform – Backend (MVP)

This repository contains the backend for a **college-focused event management platform**. It is designed to be a lightweight, secure, and scalable API for managing campus events.

---

## 🚀 Tech Stack
* **Node.js & Express.js** - Server framework
* **MongoDB & Mongoose** - Database and ODM
* **JWT** - Stateless Authentication
* **bcrypt** - Secure Password Hashing

---

## 🗂️ Project Structure
This high-level overview helps navigate the logic without digging into the code:

```text
src/
├── config/             # Database connection (db.js)
├── controllers/        # Logic for handling requests (auth, events)
├── middleware/         # Auth & Role verification (auth.js, role.js)
├── models/             # Mongoose schemas (User.js, Event.js)
├── routes/             # API route definitions
├── utils/              # Helpers (generateToken.js)
├── app.js              # Express app setup
└── server.js           # Entry point (port listener)

Role,Permissions,Restrictions
Student,"View events, (Upcoming) Register",Cannot create/edit events
Organizer,"Create/Manage events, View attendees",Cannot register for own events

🔐 Authentication & Security
JWT-based: Token must be sent in the header: Authorization: Bearer <token>

Payload: Contains userId and role.

Security: Passwords are never stored in plain text; Role-based middleware enforces strict access.

📌 API Endpoints
🔑 Authentication
Method,Endpoint,Description
POST,/auth/register,Register Student/Organizer
POST,/auth/login,Returns JWT and user details

Registration Body Example:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "student",
  "collegeId": "JECRC"
}

📅 Events
Method,Endpoint,Auth Required,Description
POST,/events,Organizer,Create a new event
GET,/events,Public/Optional,Get upcoming events
GET,/events?past=true,Public/Optional,View archive of past events

Create Event Body Example:
{
  "title": "Tech Fest 2026",
  "description": "Annual technical event",
  "date": "2026-02-10",
  "time": "10:00 AM",
  "venue": "Main Auditorium",
  "capacity": 200
}

🧠 Data Models
User
name, email (unique), passwordHash, role (student/organizer), collegeId.

Event
title, description, date, time, venue, capacity.

createdBy (Reference to User), collegeId, isPublished.

⚠️ MVP Limitations & Roadmap
Current: Auth and Event CRUD are stable.

Next: Event registration logic (Student ↔ Event).

Future: Payments, QR check-in, and Admin Dashboard.

🧪 Testing
All routes have been verified using Postman for:

Successful registration and login.

Prevention of duplicate emails.

Unauthorized role access (Students blocked from creating events).

Automated token verification.

