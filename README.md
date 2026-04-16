# 🚀 Task Manager API

A scalable backend service for a task management application built using Node.js, Express, and MongoDB. This API allows users to securely manage their personal todos with authentication and full CRUD functionality.

---

## 📌 Features

* 🔐 User Authentication (JWT-based)
* 📝 Create, Read, Update, Delete Todos
* 👤 User-specific task management
* 📦 RESTful API structure
* ⚡ Clean and scalable backend architecture

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

---

## 📁 Project Structure

```
├── controllers
├── models
├── routes
├── middleware
├── config
├── server.js
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```
git clone https://github.com/meet-17804/task-manager-api.git
```

2. Navigate to project folder

```
cd task-manager-api
```

3. Install dependencies

```
npm install
```

4. Create a `.env` file and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. Run the server

```
npm run dev
```

---

## 🔑 API Endpoints

### Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

### Todo Routes

* `GET /api/todos` → Get all todos
* `POST /api/todos` → Create todo
* `PUT /api/todos/:id` → Update todo
* `DELETE /api/todos/:id` → Delete todo

---

## 🧪 Testing

Use tools like:

* Thunder Client
* Postman

---

## 🚀 Future Improvements

* ✅ Add refresh tokens
* 📊 Add task priority & categories
* 🔔 Notifications & reminders
* 📁 File attachments

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Meet Patel**
Computer Engineering Student | MERN Stack Developer
