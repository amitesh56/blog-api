# 📝 Blog API Backend

A production-style backend API built with Node.js, Express.js, MongoDB, JWT Authentication, and Cloudinary image uploads.

This project demonstrates:

- 🔐 Authentication & Authorization
- 📝 Blog CRUD Operations
- 💬 Comment System
- ↩️ Reply System
- ☁️ Cloud Image Upload
- 🛡 Protected Routes
- 📄 Pagination
- 🗂 MVC Architecture
- ✅ Validation using Zod

---

# 🚀 Features

# 🔑 Authentication System

- User Signup
- User Login
- JWT Authentication
- Cookie-Based Authentication
- Password Hashing using bcrypt

---

# 📝 Blog System

- Create Blog
- Update Blog
- Delete Blog
- Get Single Blog
- Get All Blogs
- Upload Blog Cover Image

---

# 💬 Comment System

- Add Comments to Blogs
- Get All Comments
- Update Comment
- Delete Comment

---

# ↩️ Reply System

- Reply to Comments
- Get Replies
- Update Reply
- Delete Reply

---

# ☁️ Image Upload System

- Upload blog cover images
- Cloudinary Integration
- Multer Memory Storage

---

# 🛡 Security Features

- JWT Authentication
- Protected Routes
- Ownership Authorization
- Request Validation
- Cookie Parsing

---

# 🛠 Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Multer | File Upload |
| Cloudinary | Cloud Image Storage |
| Zod | Validation |
| Cookie Parser | Cookie Handling |
| CORS | Cross-Origin Requests |

---

# 📂 Project Structure

```bash
project/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── blog.controller.js
│   │   ├── comment.controller.js
│   │   └── reply.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── blog.model.js
│   │   ├── comment.model.js
│   │   └── reply.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── blog.routes.js
│   │   ├── comment.routes.js
│   │   └── reply.routes.js
│   │
│   ├── validators/
│   │   ├── userData.validator.js
│   │   ├── blogData.validator.js
│   │   ├── commentData.validator.js
│   │   └── reply.validator.js
│   │
│   ├── services/
│   │   └── cloudinary.image.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

---

# 🧠 Backend Architecture Flow

```text
Client Request
      ↓
Routes
      ↓
Middleware
(Authentication / Validation)
      ↓
Controllers
      ↓
Services
(Cloudinary Upload)
      ↓
Database Models
      ↓
MongoDB
      ↓
Response Sent Back
```

---

# 🔐 Authentication Flow

```text
User Signup/Login
        ↓
Validate Input Data
        ↓
Hash Password using bcrypt
        ↓
Generate JWT Token
        ↓
Store Token in Cookies
        ↓
Protected Routes Verify User
```

---

# 📝 Blog Flow

```text
User Creates Blog
       ↓
Validate Blog Data
       ↓
Upload Cover Image
       ↓
Store Blog in MongoDB
       ↓
Fetch Blogs with Pagination
```

---

# 💬 Comment Flow

```text
User Adds Comment
       ↓
Validate Comment Data
       ↓
Check Blog Exists
       ↓
Save Comment
       ↓
Populate User Details
```

---

# ↩️ Reply Flow

```text
User Replies to Comment
        ↓
Validate Reply Data
        ↓
Check Comment Exists
        ↓
Save Reply
        ↓
Return Updated Response
```

---

# 🗄 Database Relationship Structure

```text
User
 ├── Blogs
 ├── Comments
 └── Replies

Blog
 └── Comments

Comment
 └── Replies
```

---

# ⚙️ Installation

# 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/blog-api.git
```

---

# 2️⃣ Move into Project Directory

```bash
cd blog-api
```

---

# 3️⃣ Install Dependencies

```bash
npm install
```

---

# 4️⃣ Create `.env` File

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

SALT=10

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 5️⃣ Run Server

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# 📮 API Endpoints

# 🔑 Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |

---

# 📝 Blog Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/blogs` | Create Blog |
| GET | `/api/blogs` | Get All Blogs |
| GET | `/api/blogs/:id` | Get Single Blog |
| PUT | `/api/blogs/:id` | Update Blog |
| DELETE | `/api/blogs/:id` | Delete Blog |

---

# 💬 Comment Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/blogs/:id/comments` | Create Comment |
| GET | `/api/blogs/:id/comments` | Get Blog Comments |
| PUT | `/api/comments/:id` | Update Comment |
| DELETE | `/api/comments/:id` | Delete Comment |

---

# ↩️ Reply Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/comments/:id/replies` | Create Reply |
| GET | `/api/comments/:id/replies` | Get Replies |
| PUT | `/api/replies/:id` | Update Reply |
| DELETE | `/api/replies/:id` | Delete Reply |

---

# 🔒 Protected Route Example

```http
Authorization: Bearer your_jwt_token
```

---

# 🧠 Concepts Used

# Backend Concepts

- REST API Design
- MVC Architecture
- Middleware Architecture
- CRUD Operations
- Pagination
- Nested Resource Routing
- Authentication & Authorization

---

# Database Concepts

- MongoDB Relationships
- ObjectId References
- Schema Design
- Data Population using `.populate()`

---

# Security Concepts

- JWT Authentication
- Password Hashing
- Protected Routes
- Ownership Authorization

---

# File Upload Concepts

- Multer Middleware
- Memory Storage
- Cloudinary Upload Pipeline
- Multipart Form Data Handling

---

# 🚀 Future Improvements

- Like System
- Nested Replies
- Real-Time Comments using Socket.IO
- Refresh Tokens
- Email Verification
- Docker Deployment
- Redis Caching
- Swagger API Documentation
- Rate Limiting
- Unit Testing

---

# 📈 Learning Outcome

This project helped me understand:

- Production-style backend architecture
- Authentication systems
- File upload pipelines
- MongoDB relationships
- Middleware design
- REST API development
- Nested route architecture
- Real-world backend structure

---

# 👨‍💻 Author

## Amitesh Yadav

Computer Engineering Student passionate about:
- Backend Development
- System Design
- Blockchain
- AI & Emerging Technologies

GitHub:
https://github.com/amitesh56

---

# ⭐ Support

If you liked this project, give it a star on GitHub ⭐
