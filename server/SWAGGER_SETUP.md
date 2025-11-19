# Swagger/OpenAPI Setup Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - `swagger-jsdoc` - Generates Swagger documentation from JSDoc comments
   - `swagger-ui-express` - Serves Swagger UI interface

2. **Start the server:**
   ```bash
   npm run dev
   ```

3. **Access Swagger UI:**
   Open your browser and navigate to:
   ```
   http://localhost:5000/api-docs
   ```

## Features

- **Interactive API Documentation** - Test endpoints directly from the browser
- **JWT Authentication** - Click "Authorize" button to add your JWT token
- **Request/Response Examples** - See example requests and responses
- **Schema Definitions** - View data models and structures

## Using Swagger UI

### 1. Authorize (Add JWT Token)

1. Click the **"Authorize"** button at the top right
2. Enter your JWT token in the format: `Bearer <your-token>`
3. Click **"Authorize"**
4. Now you can test protected endpoints

### 2. Test Endpoints

1. Find the endpoint you want to test
2. Click **"Try it out"**
3. Fill in the required parameters/body
4. Click **"Execute"**
5. See the response below

### 3. View Schemas

- Click on **"Schemas"** at the bottom to see data models
- View User, Scholarship, Error, Success, and Pagination schemas

## Current Status

Swagger is set up with:
- ✅ Base configuration
- ✅ Authentication endpoints documented
- ✅ Schema definitions (User, Scholarship, Error, Success, Pagination)
- ✅ JWT Bearer authentication support

**Note:** Additional endpoint annotations can be added to route files using JSDoc comments. The current setup includes authentication endpoints as examples.

## Adding More Endpoints

To document additional endpoints, add JSDoc comments above route handlers:

```javascript
/**
 * @swagger
 * /public/scholarships:
 *   get:
 *     summary: Get all scholarships
 *     tags: [Scholarships]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of scholarships
 */
router.get("/", getAllScholarships);
```

## Troubleshooting

- **Swagger UI not loading?** - Make sure dependencies are installed (`npm install`)
- **Endpoints not showing?** - Check that JSDoc comments are properly formatted
- **Authentication not working?** - Make sure you've clicked "Authorize" and entered your token

