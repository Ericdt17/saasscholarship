# SaaS Scholarship Platform - Backend Server

A comprehensive backend API for managing scholarships and job opportunities.

## 🚀 Features

- **User Authentication** - JWT-based authentication with role-based access control
- **Scholarship Management** - Full CRUD operations for scholarships
- **User Management** - User profiles and admin user management
- **Search & Filters** - Advanced search with multiple filter options
- **Favorites System** - Users can save scholarships to favorites
- **Automatic Expiration** - Scheduler automatically marks expired scholarships as inactive
- **Security** - Input sanitization, rate limiting, and security headers
- **Pagination** - Efficient pagination for large datasets
- **Swagger/OpenAPI Documentation** - Interactive API documentation with Swagger UI

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saasscholarship/server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the server**

   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## 📁 Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware (auth, error handling, sanitization)
│   ├── models/          # Mongoose models
│   ├── routes/          # Route definitions
│   │   ├── public/      # Public routes
│   │   └── admin/       # Admin routes
│   ├── schedulers/      # Automated tasks (cron jobs)
│   ├── utils/           # Utility functions (JWT, rate limiter, response formatter)
│   └── validators/      # Input validation schemas
├── scripts/             # Utility scripts (promote-to-admin, etc.)
├── index.js            # Server entry point
├── package.json        # Dependencies and scripts
└── .env                # Environment variables (not in git)
```

## 🔐 Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Creating an Admin User

Use the provided script to promote a user to admin:

```bash
npm run promote-admin <user-email>
```

Example:

```bash
npm run promote-admin admin@example.com
```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Quick Start - API Endpoints

**Public Endpoints:**

- `POST /api/public/auth/register` - Register new user
- `POST /api/public/auth/login` - Login user
- `GET /api/public/auth/me` - Get current user
- `GET /api/public/scholarships` - Get all scholarships
- `GET /api/public/scholarships/:id` - Get single scholarship
- `GET /api/public/search` - Search scholarships
- `GET /api/public/favorites` - Get user favorites
- `POST /api/public/favorites/scholarships/:id` - Add to favorites
- `DELETE /api/public/favorites/scholarships/:id` - Remove from favorites

**Admin Endpoints:**

- `GET /api/admin/scholarships` - Get all scholarships (admin view)
- `POST /api/admin/scholarships` - Create scholarship
- `PUT /api/admin/scholarships/:id` - Update scholarship
- `DELETE /api/admin/scholarships/:id` - Delete scholarship
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🔒 Security Features

1. **JWT Authentication** - Secure token-based authentication
2. **Rate Limiting** - Prevents abuse (5 requests per 15 minutes for auth endpoints)
3. **Input Sanitization** - Automatically removes HTML/script tags from user input
4. **Request Size Limits** - Maximum 10MB payload size
5. **Helmet.js** - Security headers for protection
6. **Role-Based Access Control** - Admin-only endpoints

## ⏰ Automated Tasks

The server includes a scheduler that runs daily at midnight UTC to:

- Mark expired scholarships as inactive (unpublished)

The scheduler also runs once on server startup to catch any expired scholarships immediately.

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions.

### Quick Test Examples

**Test XSS Sanitization:**

```bash
POST /api/public/auth/register
Body: {
  "email": "test<script>alert('hack')</script>@example.com",
  "password": "password123"
}
# HTML tags should be removed in the response
```

**Test Error Handling:**

```bash
GET /api/public/scholarships/invalid-id
# Should return: { "success": false, "error": { "message": "Invalid ID format" } }
```

## 📦 Dependencies

### Main Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `express-validator` - Input validation
- `express-rate-limit` - Rate limiting
- `node-cron` - Task scheduling
- `helmet` - Security headers
- `morgan` - HTTP request logger
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

## 🐛 Error Handling

The API uses a centralized error handling system with specific error types:

- `ValidationError` - Input validation failures
- `NotFoundError` - Resource not found
- `UnauthorizedError` - Authentication failures
- `ForbiddenError` - Authorization failures
- `ConflictError` - Duplicate resources

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "errors": [] // Optional validation errors
  }
}
```

## 📝 Environment Variables

| Variable                  | Description                          | Default                 |
| ------------------------- | ------------------------------------ | ----------------------- |
| `PORT`                    | Server port                          | `5000`                  |
| `NODE_ENV`                | Environment (development/production) | `development`           |
| `MONGODB_URI`             | MongoDB connection string            | Required                |
| `JWT_SECRET`              | Secret key for JWT tokens            | Required                |
| `JWT_EXPIRES_IN`          | JWT token expiration                 | `7d`                    |
| `CORS_ORIGIN`             | Allowed CORS origin                  | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window                    | `900000` (15 min)       |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window              | `100`                   |

## 📖 API Documentation

### Swagger UI (Interactive)

Access the interactive Swagger documentation:

```
http://localhost:5000/api-docs
```

Features:

- Test endpoints directly from the browser
- JWT authentication support (click "Authorize" button)
- View request/response examples
- See data schemas and models

See [SWAGGER_SETUP.md](./SWAGGER_SETUP.md) for detailed setup instructions.

### Markdown Documentation

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing instructions

## 🚦 Health Check

Check if the server is running:

```bash
GET /health
```

Response:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-16T12:00:00.000Z"
}
```

## 📄 License

ISC

## 👥 Contributors

[Your team/name here]

---

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
