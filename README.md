# Campus Connect — Fullstack Event & Registration System

## Overview

**Campus Connect** is a fullstack web application designed to manage campus events and registrations seamlessly. It includes:

- A **Node.js backend** powered by Express, SQLite, JWT authentication, and bcrypt for password hashing.
- A **Frontend** with static HTML, CSS, and JavaScript pages for user login, registration, and student dashboard.
- Secure user registration and login APIs.
- Event handling with role-based access (planned for future enhancements).

This project aims to provide a clean, simple, and extensible system for managing student events and interactions within a campus environment.

---

## Features

- **User Registration & Login:** Secure signup and authentication using JWT tokens.
- **SQLite Database:** Lightweight, file-based database to store user data.
- **Password Security:** Passwords hashed with bcrypt before storage.
- **CORS Enabled:** Allows frontend and backend communication across different origins.
- **Static Frontend Serving:** Express serves HTML pages like login, register, and student dashboard.
- **Error Handling:** Informative error responses on registration/login failures.
- **Modular Code:** Easily extensible and maintainable structure.

---

## Tech Stack

| Layer          | Technology/Library        |
|----------------|--------------------------|
| Backend        | Node.js, Express.js      |
| Database       | SQLite                   |
| Authentication | JWT (jsonwebtoken), bcrypt |
| Frontend       | HTML, CSS, JavaScript    |
| Middleware     | CORS, express.json       |

---

## Folder Structure

CAMPUS_CONNECT_FC/
├── BACKEND/
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
│ └── mediaData.db (auto-generated)
└── FRONTEND/
├── login.html
├── register.html
├── studentdashboard.html
└── (other static assets)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git (for cloning repository)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/manikantakolapalli/campus-connect-fullstack.git
cd campus-connect-fullstack/BACKEND
```
Install backend dependencies

```bash
npm install
```

Run the backend server

```bash
node server.js
```
```bash
http://localhost:5000/
```

Future Improvements
Implement event CRUD operations.

Role-based access control (admin vs student).

Store events, attendance, and results.

Responsive frontend with React or similar.

Dockerize app for easy deployment.

Contributing
Contributions are welcome! Please fork the repository and submit pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
Lakshmi Manikanta Kolapalli

GitHub: https://github.com/manikantakolapalli

Email: [your-email@example.com] (replace with your email)

Thank you for checking out Campus Connect! Feel free to reach out for questions or collaboration.

yaml
Copy
Edit

