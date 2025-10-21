# 📚 CanLib - Library Management System

CanLib is a full-stack library management web application built with **Vue 3**, **Express.js**, and **PostgreSQL**.  
It allows users to browse books, borrow and return them, bookmark favorites, and for admins to manage books, users, and borrows from an admin panel.

---

## 🚀 Features

### 👥 Users
- Register, log in, and log out securely.
- Browse all available books.
- Borrow or return books.
- Bookmark and view favorite books.

### 🛠️ Admins
- Manage books: add, update, delete, feature/unfeature.
- Manage users: change roles, update or delete users.
- View and manage borrows.

---

## 🗂️ Project Structure

```
project-root/
│
├── client/             # Vue 3 frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Sidebar, etc.)
│   │   ├── views/      # Page views (Admin, Books, Users, etc.)
│   │   ├── stores/     # Pinia stores for auth and state
│   │   ├── router/     # Vue Router routes
│   │   └── main.js     # Vue app entry point
│   └── package.json
│
├── server/             # Express backend
│   ├── controllers/    # Business logic (books, users, auth, etc.)
│   ├── routes/         # API route definitions
│   ├── db.js           # PostgreSQL connection
│   ├── server.js       # App entry point
│   └── package.json
│
└── database/           # SQL files (schema, seed data)
    └── init.sql
```

---

## 💾 Database Setup (PostgreSQL)

Create a PostgreSQL database and run your schema:

```sql
CREATE DATABASE canlib;

\c canlib

-- Example schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  borrower_id INT REFERENCES users(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false
);

CREATE TABLE borrows (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  book_id INT REFERENCES books(id),
  borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  returned_at TIMESTAMP
);
```

You can also import your own data or extend the schema for images and more fields.

---

## 🧠 Backend Setup (Express.js)

### 1. Go to the server folder:
```bash
cd server
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create a `.env` file:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/canlib
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Start the server:
```bash
npm run server
```
This will run Express on **http://localhost:5000**

---

## 💻 Frontend Setup (Vue 3)

### 1. Go to the client folder:
```bash
cd client
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the client:
```bash
npm run dev
```

The frontend runs on **http://localhost:5173** (by default).

---

## 🔐 Authentication & Authorization

- Users are authenticated via JWT tokens (stored in Pinia store).
- Admin routes and pages are protected — only accessible for users with `role = 'admin'`.
- Middleware checks token validity on protected endpoints.

---

## 🧩 API Routes Overview

### **Auth**
| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/auth/signup`     | Register user        |
| POST   | `/auth/login`      | Log in user          |
| POST   | `/auth/logout`     | Log out user         |

### **Books**
| Method | Endpoint                       | Description                |
|--------|----------------------------------|----------------------------|
| GET    | `/books`                        | Get all books              |
| GET    | `/books/with-borrows`           | Get books with borrower info |
| GET    | `/books/with-featured`          | Get featured books         |
| PUT    | `/admin/switch-featured/:id`    | Toggle featured state      |
| DELETE | `/admin/books/:id`              | Delete a book              |

### **Users**
| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| GET    | `/admin/users`         | Get all users             |
| GET    | `/admin/users/:id`     | Get single user details   |
| PUT    | `/admin/users/:id`     | Update user info/role     |
| DELETE | `/admin/users/:id`     | Delete user               |

---

## 🧰 Tech Stack

### Frontend
- Vue 3 (Composition API)
- TailwindCSS
- Vue Router
- Pinia
- Axios
- Vue Toastification

### Backend
- Node.js + Express
- PostgreSQL + `pg` library
- JWT for authentication
- bcrypt for password hashing

---

## 🧑‍💻 Development Notes

- Admin with `id = 1` is protected — cannot be edited or deleted.
- Borrow and return actions update both `books` and `borrows` tables.
- Frontend dynamically fetches and updates state using axios and reactivity.

---

## 📦 Scripts

### Server
```bash
cd server
npm run dev       # run backend in dev mode
```

### Client
```bash
cd client
npm run dev       # run frontend in dev mode
```

---

## 🖼️ Future Improvements

- Book cover image upload (using Multer or Cloudinary)
- Borrow duration tracking
- Pagination and search filters
- Advanced role management
- Dashboard analytics for admins

---

## 📜 License

This project is open source and available under the **MIT License**.

---

## 👤 Author

**Canberk Ekinci**  
Full-stack Developer  
GitHub: [@canberkekinci](https://github.com/canberkekinci)
