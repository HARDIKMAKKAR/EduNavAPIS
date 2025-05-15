# 🎓 EduNavigator – Backend APIs

This repository contains the backend **Node.js APIs** for a college community web application. It includes:

- 🔐 **Authentication APIs** for user registration, login, token handling, etc.
- 🔌 **Socket.IO APIs** for real-time features like chat or notifications.

---

## 📁 Project Structure
/auth → Routes and logic for user authentication (sign-up, login, JWT, etc.)
/socket → Socket.IO event handlers and real-time communication logic
/controllers → Business logic for API routes
/models → Mongoose or schema models
/utils → Utility functions (e.g., token validation, middleware)
server.js → Entry point for the app


## 🚀 Features

- User registration and login using secure password hashing (bcrypt)
- JWT-based authentication and route protection
- Socket.IO integration for real-time updates
- Scalable and modular code structure
