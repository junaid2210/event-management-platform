# EventSphere 🎟️

> The End of Event Chaos. A full-stack platform built to seamlessly connect campus event organizers with students.

EventSphere eliminates the need for scattered WhatsApp links, manual spreadsheets, and lost tickets. It provides a professional command center for organizers to manage capacity and guest lists, while giving attendees a centralized hub to discover events and secure digital tickets.

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

## ✨ Key Features

**For Organizers:**
- 📊 **Smart Dashboard:** Track active, drafted, and past events.
- 🚦 **Capacity Management:** Automated caps on registrations to prevent overbooking.
- 👥 **Digital Guest Lists:** Real-time tracking of student RSVPs.
- 🔒 **Role-Based Access:** Secure routes that ensure only organizers can edit or delete their own events.

**For Students:**
- 🔍 **Event Discovery:** A clean, curated feed of upcoming campus events.
- ⚡ **1-Click RSVP:** Secure a spot instantly.
- 🎫 **Digital Ticket Wallet:** A dedicated dashboard to view upcoming registered events with date, time, and venue details.

## 🛠️ Installation & Setup

To run this project locally, you will need Node.js and MongoDB installed on your machine.

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/eventsphere.git
cd eventsphere
\`\`\`

**2. Setup the Backend**
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory and add your variables:
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

**3. Setup the Frontend**
Open a new terminal window/tab:
\`\`\`bash
cd frontend
npm install
\`\`\`
Create a `.env` file in the `frontend` directory:
\`\`\`env
VITE_API_URL=http://localhost:5000
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

## 📝 License
This project is open-source and available under the [MIT License](LICENSE). Built by [Junaid](https://github.com/yourusername).
