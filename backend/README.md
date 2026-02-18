# Event Management Platform – Backend (MVP)

This repository contains the backend for a college-focused event management platform. It is designed as a secure, role-based, and scalable REST API that supports the full event lifecycle from creation to registration.

---

## 🚀 Tech Stack

- Node.js + Express.js — Backend framework
- MongoDB + Mongoose — Database & ODM
- JWT — Stateless authentication
- bcrypt — Secure password hashing

---

## 🗂️ Project Structure

```text
src/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── auth.controller.js     # Register & login logic
│   ├── event.controller.js    # Event creation & listing
│   └── registration.controller.js # Register / cancel logic
├── middleware/
│   ├── auth.js               # JWT verification
│   └── role.js               # Role-based access control
├── models/
│   ├── User.js               # User schema
│   ├── Event.js              # Event schema
│   └── Registration.js       # User–Event relationship
├── routes/
│   ├── auth.routes.js
│   ├── event.routes.js
│   └── registration.routes.js
├── utils/
│   └── generateToken.js      # JWT helper
├── app.js                    # Express app configuration
└── server.js                 # Entry point
```

## 👥 User Roles & Permissions

- Student: View events, Register, Cancel registration. (Cannot create or manage events).
- Organizer: Create events, View registrations for own events. (Cannot register for any event).

---

## 🔐 Authentication & Security

- JWT-based authentication: Token must be sent in headers: Authorization: Bearer token
- Hashed Passwords: Passwords are secured using bcrypt before saving to MongoDB.
- Strict Middleware: Role-based Access Control (RBAC) ensures users can only perform actions assigned to their role.
- Payload Data: JWT includes User ID and Role for stateless authorization.

---

## 📌 API Endpoints

### Authentication
- POST /auth/register - Registers a student or organizer.
- POST /auth/login - Returns JWT token and user details.

### Events
- POST /events - (Organizer only) Create a new event.
- GET /events - Returns all upcoming/published events.
- GET /events?past=true - Returns past events for archival viewing.

### Registration (Student Only)
- POST /events/:id/register - Register for an event (checks capacity, date, and duplicates).
- DELETE /events/:id/register - Cancel a registration before the event date.
- GET /users/me/registrations - View all events the logged-in student has joined.

### Organizer Dashboard
- GET /events/:id/registrations - (Owner only) View list of students (name/email) registered for a specific event.

---

## 🧠 Core Business Rules

1. One-Time Registration: A unique index on (userId, eventId) prevents a student from joining the same event twice.
2. Capacity Enforcement: Registration fails automatically once the event capacity is reached.
3. Date Validation: Users cannot register for or cancel events that have already passed.
4. Ownership Security: Organizers can only see registration data for events they created.
5. Role Enforcement: Authentication middleware stops unauthorized roles from accessing restricted routes.

---

## 🧪 Testing & Validation

- Postman: All routes verified for success and error states (400, 401, 403, 404, 409).
- Environment: Developed and tested on macOS using Node.js v18+.
- Database: MongoDB Atlas / Local MongoDB Compass.