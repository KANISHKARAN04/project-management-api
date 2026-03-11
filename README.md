# 🚀 Project Management API

A **RESTful backend API** for managing **projects, tasks, subtasks, and notes**.
This system supports **user authentication, role-based access control, and project collaboration**.

Built with **Node.js, Express.js, and MongoDB**.

---

# 📌 Features

* 🔐 User Authentication (JWT)
* 📧 Email Verification
* 🔑 Forgot / Reset Password
* 📁 Project Management
* ✅ Task Management
* 🧩 Subtask Tracking
* 📝 Project Notes
* 👥 Project Members & Roles
* 🛡 Role-Based Authorization
* ✔ Input Validation
* ⚡ Centralized Error Handling

---

# 🛠 Tech Stack

| Technology        | Usage              |
| ----------------- | ------------------ |
| Node.js           | Backend Runtime    |
| Express.js        | Web Framework      |
| MongoDB           | Database           |
| Mongoose          | ODM                |
| JWT               | Authentication     |
| Express Validator | Request Validation |

---

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/project-management-api.git
```

### 2️⃣ Navigate into project

```
cd project-management-api
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Create `.env` file

Create a `.env` file in the root folder and add the following:

```
PORT=3000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d

FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/reset-password
```

---

# ▶️ Running the Server

Development mode

```
npm run dev
```

Production mode

```
npm start
```

Server will start at:

```
http://localhost:3000
```

---

# 🔐 Authentication

Protected routes require an **access token**.

Example header:

```
Authorization: Bearer <access_token>
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/v1/auth/register => (User Registration)
POST /api/v1/auth/login => (User Login)
GET /api/v1/auth/verify-email/:verificationToken => (Email Verification)
POST /api/v1/auth/forgot-password => (Forgot Password)
POST /api/v1/auth/reset-password/:resetToken => (Reset Password)
POST /api/v1/auth/refresh-token => (Resfresh Access Token)
POST /api/v1/auth/resend-email-verification => (Resend Email Verification)
GET /api/v1/auth/current-user => (Get Current User)
POST /api/v1/auth/change-password => (Change Password)
/api/v1/auth/logout => (User Logout)
```

---

## Projects

```
GET /api/v1/projects => (Get Project Details)
POST /api/v1/projects => (Create Project)
GET /api/v1/projects/:projectId => (Get Specific Project Details)
PUT /api/v1/projects/:projectId => (Update Project Details)
DELETE /api/v1/projects/:projectId => (Delete Project Details)
GET /api/v1/projects/:projectId/members => (List Project Members)
POST /api/v1/projects/:projectId/members => (Add Member To Projects)
PUT /api/v1/projects/:projectId/members/:userId => (Update Project Member Details)
DELETE /api/v1/projects/:projectId/members/:userId => (Delete Project Members)
```

---

## Tasks

```
POST /api/v1/projects/:projectId/tasks => (Create Task)
GET /api/v1/projects/:projectId/tasks => (Get All Task Details)
GET /api/v1/projects/:projectId/tasks/:taskId => (Get Specific Task Details)
PUT /api/v1/projects/:projectId/tasks/:taskId => (Update Task Details)
DELETE /api/v1/projects/:projectId/tasks/:taskId => (Delete Task Details)
```

---

## Subtasks

```
POST /api/v1/projects/:projectId/tasks/:taskId/st => (Create Subtask)
PUT /api/v1/projects/:projectId/tasks/:taskId/st/:subTaskId => (Update Subtask)
DELETE /api/v1/projects/:projectId/tasks/:taskId/st/:subTaskId => (Delete Subtask)
```

---

## Notes

```
POST /api/v1/projects/:projectId/note => (Create Note)
GET /api/v1/projects/:projectId/note => (List Notes)
PUT /api/v1/projects/:projectId/note/:noteId => (Get Note Details)
DELETE /api/v1/projects/:projectId/note/:noteId => (Delete Note)
PUT /api/v1/projects/:projectId/note/:noteId => (Update Note)
```

---

# 🛡 Security

* Password hashing using bcrypt
* JWT authentication
* Protected routes with middleware
* Input validation
* Environment variable protection

---

# 👨‍💻 Author

Kanishkaran K

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
