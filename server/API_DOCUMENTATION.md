# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Table of Contents

1. [Public Endpoints](#public-endpoints)
   - [Authentication](#authentication)
   - [User Profile](#user-profile)
   - [Scholarships](#scholarships)
   - [Search](#search)
   - [Favorites](#favorites)
2. [Admin Endpoints](#admin-endpoints)
   - [Scholarships Management](#scholarships-management)
   - [Users Management](#users-management)
3. [Error Responses](#error-responses)
4. [Response Format](#response-format)

---

# Public Endpoints

## Authentication

### Register User

**POST** `/api/public/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "jwt-token-here"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes

---

### Login

**POST** `/api/public/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "jwt-token-here"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes

---

### Get Current User

**GET** `/api/public/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "favorites": {
        "scholarships": [],
        "jobs": []
      },
      "createdAt": "2025-01-16T...",
      "updatedAt": "2025-01-16T..."
    }
  }
}
```

---

## User Profile

### Get User Profile

**GET** `/api/public/users/profile`

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "favorites": {
        "scholarships": [...],
        "jobs": []
      }
    }
  }
}
```

---

### Update User Profile

**PUT** `/api/public/users/profile`

Update authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (all fields optional):**
```json
{
  "email": "newemail@example.com",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "newemail@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "user"
    }
  }
}
```

---

### Change Password

**PUT** `/api/public/users/change-password`

Change authenticated user's password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Delete Account

**DELETE** `/api/public/users/profile`

Delete authenticated user's account.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## Scholarships

### Get All Scholarships

**GET** `/api/public/scholarships`

Get all published scholarships with pagination and filters.

**Query Parameters (all optional):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `pays` - Filter by country (array or single value)
- `niveau` - Filter by education level (array or single value)
- `domaine` - Filter by field of study (array or single value)
- `type_bourse` - Filter by scholarship type
- `organisateur` - Filter by organizer (partial match)
- `montant_min` - Minimum amount
- `montant_max` - Maximum amount
- `badge_verifie` - Filter by verified badge (`true` or `false`)
- `premium` - Filter by premium status (`true` or `false`)
- `sort` - Sort order (default: `-createdAt`)
- `search` - Text search in title, description, tags

**Example:**
```
GET /api/public/scholarships?page=1&limit=20&pays=USA&niveau=Graduate&search=engineering
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "scholarships": [
      {
        "_id": "...",
        "titre": "Engineering Scholarship",
        "description": "...",
        "pays": ["USA", "Canada"],
        "niveau": ["Graduate"],
        "domaine": ["Engineering"],
        "montant": 5000,
        "date_limite": "2025-12-31T...",
        "statut_publication": true,
        "badge_verifie": true,
        "premium": false,
        "createdAt": "2025-01-16T...",
        "updatedAt": "2025-01-16T..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### Get Single Scholarship

**GET** `/api/public/scholarships/:id`

Get a single scholarship by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "scholarship": {
      "_id": "...",
      "titre": "Engineering Scholarship",
      "description": "...",
      "pays": ["USA"],
      "niveau": ["Graduate"],
      "domaine": ["Engineering"],
      "type_bourse": "Merit-Based",
      "organisateur": "University Name",
      "montant": 5000,
      "date_limite": "2025-12-31T...",
      "statut_publication": true,
      "badge_verifie": true,
      "premium": false,
      "createdAt": "2025-01-16T...",
      "updatedAt": "2025-01-16T..."
    }
  }
}
```

---

## Search

### Unified Search

**GET** `/api/public/search`

Search across scholarships (and jobs in the future).

**Query Parameters (all optional):**
- `q` - Search query (text search)
- `type` - `"all"`, `"scholarships"`, or `"jobs"` (default: `"all"`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `pays` - Filter by country
- `niveau` - Filter by education level
- `domaine` - Filter by field of study
- `type_bourse` - Filter by scholarship type
- `montant_min` - Minimum amount
- `montant_max` - Maximum amount
- `badge_verifie` - Filter by verified badge
- `premium` - Filter by premium status
- `sort` - Sort order (default: `-createdAt`)

**Example:**
```
GET /api/public/search?q=engineering&type=scholarships&pays=USA
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "query": "engineering",
    "type": "scholarships",
    "results": {
      "scholarships": [...],
      "jobs": []
    },
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

## Favorites

### Get User Favorites

**GET** `/api/public/favorites`

Get authenticated user's favorites.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "favorites": {
      "scholarships": [
        {
          "_id": "...",
          "titre": "Engineering Scholarship",
          "...": "scholarship details"
        }
      ],
      "jobs": []
    }
  }
}
```

---

### Add Scholarship to Favorites

**POST** `/api/public/favorites/scholarships/:id`

Add a scholarship to favorites.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Scholarship added to favorites",
  "data": {
    "favorites": {
      "scholarships": [...],
      "jobs": []
    }
  }
}
```

---

### Remove Scholarship from Favorites

**DELETE** `/api/public/favorites/scholarships/:id`

Remove a scholarship from favorites.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Scholarship removed from favorites",
  "data": {
    "favorites": {
      "scholarships": [...],
      "jobs": []
    }
  }
}
```

---

# Admin Endpoints

All admin endpoints require:
- Authentication (Bearer token)
- Admin role

---

## Scholarships Management

### Get All Scholarships (Admin)

**GET** `/api/admin/scholarships`

Get all scholarships (including unpublished ones).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters (all optional):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `statut_publication` - Filter by publication status (`true` or `false`)
- `sort` - Sort order (default: `-createdAt`)
- `search` - Text search

**Response (200):**
```json
{
  "success": true,
  "data": {
    "scholarships": [
      {
        "_id": "...",
        "titre": "...",
        "admin_id": {
          "_id": "...",
          "firstName": "Admin",
          "lastName": "User",
          "email": "admin@example.com"
        },
        "...": "all scholarship fields"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### Get Single Scholarship (Admin)

**GET** `/api/admin/scholarships/:id`

Get a single scholarship by ID (admin view).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "scholarship": {
      "_id": "...",
      "titre": "...",
      "admin_id": {
        "_id": "...",
        "firstName": "Admin",
        "lastName": "User",
        "email": "admin@example.com"
      },
      "...": "all scholarship fields"
    }
  }
}
```

---

### Create Scholarship

**POST** `/api/admin/scholarships`

Create a new scholarship.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "titre": "Engineering Scholarship",
  "description": "Full description here...",
  "pays": ["USA", "Canada"],
  "niveau": ["Graduate"],
  "domaine": ["Engineering"],
  "type_bourse": "Merit-Based",
  "organisateur": "University Name",
  "montant": 5000,
  "date_limite": "2025-12-31T00:00:00.000Z",
  "statut_publication": true,
  "badge_verifie": true,
  "premium": false,
  "tags": ["engineering", "graduate"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Scholarship created successfully",
  "data": {
    "scholarship": {
      "_id": "...",
      "...": "all scholarship fields"
    }
  }
}
```

---

### Update Scholarship

**PUT** `/api/admin/scholarships/:id`

Update an existing scholarship.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body (all fields optional):**
```json
{
  "titre": "Updated Title",
  "description": "Updated description",
  "statut_publication": false
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Scholarship updated successfully",
  "data": {
    "scholarship": {
      "_id": "...",
      "...": "updated scholarship fields"
    }
  }
}
```

---

### Delete Scholarship

**DELETE** `/api/admin/scholarships/:id`

Delete a scholarship.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Scholarship deleted successfully"
}
```

---

## Users Management

### Get All Users

**GET** `/api/admin/users`

Get all users with pagination and filters.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters (all optional):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `role` - Filter by role (`user` or `admin`)
- `search` - Search in email, firstName, lastName
- `sort` - Sort order (default: `-createdAt`)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "...",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "user",
        "createdAt": "2025-01-16T...",
        "updatedAt": "2025-01-16T..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### Get Single User

**GET** `/api/admin/users/:id`

Get a single user by ID.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "favorites": {
        "scholarships": [...],
        "jobs": []
      },
      "createdAt": "2025-01-16T...",
      "updatedAt": "2025-01-16T..."
    }
  }
}
```

---

### Update User

**PUT** `/api/admin/users/:id`

Update a user (admin can change role, email, etc.).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body (all fields optional):**
```json
{
  "email": "newemail@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "admin"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "...",
      "email": "newemail@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "admin"
    }
  }
}
```

---

### Delete User

**DELETE** `/api/admin/users/:id`

Delete a user.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Note:** Admin cannot delete their own account.

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

# Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error message here",
    "errors": [
      {
        "type": "field",
        "msg": "Validation error message",
        "path": "fieldName",
        "location": "body"
      }
    ]
  }
}
```

## Common Error Codes

- **400** - Bad Request (validation errors, invalid input)
- **401** - Unauthorized (missing or invalid token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (resource doesn't exist)
- **409** - Conflict (duplicate entry)
- **429** - Too Many Requests (rate limit exceeded)
- **500** - Internal Server Error

---

# Response Format

## Success Response

```json
{
  "success": true,
  "message": "Optional success message",
  "data": {
    // Response data here
  }
}
```

## Pagination Response

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

# Security Features

1. **JWT Authentication** - All protected endpoints require valid JWT token
2. **Rate Limiting** - Authentication endpoints limited to 5 requests per 15 minutes
3. **Input Sanitization** - All user input is sanitized to prevent XSS attacks
4. **Request Size Limits** - Maximum 10MB payload size
5. **Helmet.js** - Security headers for protection against common vulnerabilities
6. **Role-Based Access Control** - Admin endpoints require admin role

---

# Health Check

**GET** `/health`

Check if the server is running.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-16T12:00:00.000Z"
}
```

---

# Notes

- All dates are in ISO 8601 format
- All IDs are MongoDB ObjectIds
- Passwords must be at least 6 characters
- Email addresses are validated and normalized (lowercase)
- HTML/script tags in user input are automatically removed
- Expired scholarships are automatically marked as inactive (daily at midnight UTC)

---

# Support

For issues or questions, please refer to the project repository or contact the development team.

