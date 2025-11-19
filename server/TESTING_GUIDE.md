# Testing Guide - Phase 13: Security & Utilities

## 1. Testing Request Sanitization (XSS Prevention)

### Test: HTML/Script Injection in User Registration

**Endpoint:** `POST http://localhost:5000/api/public/auth/register`

**Request Body (with malicious input):**
```json
{
  "email": "test<script>alert('hack')</script>@example.com",
  "password": "password123",
  "firstName": "<img src=x onerror=alert('XSS')>John",
  "lastName": "<script>alert('hack')</script>Doe"
}
```

**Expected Result:**
- The HTML tags and scripts should be removed
- Check the database or response - you should see:
  - `email`: `test@example.com` (script tags removed)
  - `firstName`: `John` (HTML removed)
  - `lastName`: `Doe` (script tags removed)

**How to Verify:**
1. Register with malicious input
2. Login with the same email
3. Get user profile - check that HTML/scripts are removed

---

## 2. Testing Enhanced Error Handling

### Test 1: Invalid ID Format (CastError)

**Endpoint:** `GET http://localhost:5000/api/public/scholarships/invalid-id-123`

**Expected Response (400):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid ID format"
  }
}
```

### Test 2: Not Found Error

**Endpoint:** `GET http://localhost:5000/api/public/scholarships/507f1f77bcf86cd799439011`

**Expected Response (404):**
```json
{
  "success": false,
  "error": {
    "message": "Scholarship not found"
  }
}
```

### Test 3: Duplicate Email (ConflictError)

**Endpoint:** `POST http://localhost:5000/api/public/auth/register`

**Request Body:**
```json
{
  "email": "existing@example.com",
  "password": "password123"
}
```

**Steps:**
1. Register with this email (first time - should succeed)
2. Try to register again with the same email

**Expected Response (409):**
```json
{
  "success": false,
  "error": {
    "message": "Duplicate entry. Resource already exists"
  }
}
```

### Test 4: Validation Error

**Endpoint:** `POST http://localhost:5000/api/public/auth/register`

**Request Body (invalid email):**
```json
{
  "email": "not-an-email",
  "password": "123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "errors": [
      {
        "type": "field",
        "msg": "Please provide a valid email address",
        "path": "email",
        "location": "body"
      },
      {
        "type": "field",
        "msg": "Password must be at least 6 characters long",
        "path": "password",
        "location": "body"
      }
    ]
  }
}
```

### Test 5: Invalid Token (JWT Error)

**Endpoint:** `GET http://localhost:5000/api/public/users/profile`

**Headers:**
```
Authorization: Bearer invalid-token-here
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid token"
  }
}
```

---

## 3. Testing Request Size Limits

### Test: Large Payload Rejection

**Endpoint:** `POST http://localhost:5000/api/admin/scholarships`

**Request Body (create a very large description - over 10MB):**
```json
{
  "titre": "Test Scholarship",
  "description": "[VERY LONG STRING - over 10MB of text]",
  "organisateur": "Test Org",
  "date_limite": "2025-12-31T00:00:00.000Z"
}
```

**Expected Result:**
- Request should be rejected with a 413 (Payload Too Large) error
- Or connection timeout if payload is too large

**Note:** Creating a 10MB string manually is difficult. You can test with a smaller but still large payload to verify the limit works.

---

## 4. Testing Sanitization in Query Parameters

### Test: XSS in Search Query

**Endpoint:** `GET http://localhost:5000/api/public/search?q=<script>alert('XSS')</script>engineering`

**Expected Result:**
- The search query should be sanitized
- Script tags should be removed
- Search should work with just "engineering"

---

## 5. Testing Sanitization in URL Parameters

### Test: XSS in Scholarship ID (if applicable)

**Endpoint:** `GET http://localhost:5000/api/public/scholarships/<script>alert('XSS')</script>123`

**Expected Result:**
- Invalid ID format error (script tags removed, leaving invalid ID)
- Should return 400 error

---

## Quick Test Checklist

- [ ] Register user with HTML/script tags → Verify tags are removed
- [ ] Try invalid scholarship ID → Get "Invalid ID format" error
- [ ] Try non-existent scholarship → Get "Scholarship not found" error
- [ ] Register duplicate email → Get "Duplicate entry" error
- [ ] Register with invalid data → Get validation errors array
- [ ] Use invalid JWT token → Get "Invalid token" error
- [ ] Search with script tags in query → Verify tags are removed
- [ ] Check server logs → Verify error logging includes path and method

---

## Server Logs to Check

When errors occur, check your server console. You should see enhanced error logs like:

```
Error: {
  statusCode: 400,
  message: "Invalid ID format",
  path: "/api/public/scholarships/invalid-id",
  method: "GET",
  stack: "..." (only in development)
}
```

