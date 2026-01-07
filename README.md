# Nalanda Library Management System – Backend

---

## Project Overview

Nalanda is a backend system for managing a library where:

- Users can register and log in
- Admins can manage books
- Members can borrow and return books
- The system can generate reports using MongoDB aggregations
- APIs are exposed via both **REST** and **GraphQL**
- All APIs are validated, secured, and documented

The project is designed to be **clean, scalable, and production-ready**, not just to “pass the task”.

---

## Tech Stack

### Core Technologies
- **Node.js** (ES6 Modules)
- **Express.js**
- **MongoDB** with **Mongoose**

### Security & Validation
- **JWT Authentication** (with additional encryption layer)
- **Role-Based Access Control** (Admin / Member)
- **Zod** for request validation

### APIs & Documentation
- **REST APIs**
- **GraphQL** (Apollo Server)
- **Swagger (OpenAPI)** for API documentation

---

## Project Structure

src/
├── app.js
├── server.js
│
├── config/
│ └── db.js
│
├── models/
│ ├── User.model.js
│ ├── Book.model.js
│ └── Borrow.model.js
│
├── controllers/
│ ├── auth.controller.js
│ ├── book.controller.js
│ ├── borrow.controller.js
│ └── report.controller.js
│
├── routes/
│ ├── auth.routes.js
│ ├── book.routes.js
│ ├── borrow.routes.js
│ └── report.routes.js
│
├── validators/
│ ├── auth.schema.js
│ ├── book.schema.js
│ ├── borrow.schema.js
│ └── report.schema.js
│
├── middlewares/
│ ├── auth.middleware.js
│ ├── role.middleware.js
│ └── validate.middleware.js
│
├── graphql/
│ ├── schema/
│ ├── resolvers/
│ └── context.js
│
├── utils/
│ └── jwtEncrypt.js
│
└── docs/
└── swagger.js

pgsql
Copy code

This structure keeps responsibilities clearly separated and makes the project easy to extend.

---

##  Authentication & Authorization

### Authentication
- Users authenticate using **JWT**
- On login, a JWT is generated and **encrypted** before being sent to the client
- The encrypted token must be sent in the `Authorization` header

Authorization: Bearer <encrypted_token>

yaml
Copy code

### Authorization
- **Admin**: Can manage books and view reports
- **Member**: Can borrow and return books
- Role checks are enforced using middleware

---

## User Management

### Features
- User registration
- User login
- Role-based access (Admin / Member)

Passwords are:
- Hashed using `bcrypt`
- Never returned in API responses

---

## Book Management

### Admin Capabilities
- Add new books
- Update existing books
- Manage total and available copies safely

### Key Design Decisions
- `availableCopies` is automatically initialized from `totalCopies`
- Updates prevent reducing total copies below already borrowed copies
- Schema-level safeguards prevent invalid data (NaN, negatives)

---

## Borrowing System

### Features
- Members can borrow books
- Members can return books
- Borrow records are stored separately for reporting

### Safety Measures
- A book cannot be borrowed if no copies are available
- Data integrity is enforced at:
  - Schema level
  - Controller level
  - Runtime level

---

## Reports & Aggregations

MongoDB aggregation framework is used to generate reports efficiently:

- **Most Borrowed Books**
- **Most Active Members**
- **Book Availability Summary**

All reports:
- Are admin-only
- Use aggregation pipelines (not in-memory processing)

---

## Validation Strategy

Validation is handled using **Zod**:

- Every API input is validated
- Missing fields return clear, human-readable errors
- Same schemas are reused across:
  - REST APIs
  - GraphQL resolvers

Example validation error:
```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Email is missing" }
  ]
}
```

This ensures consistent behavior across the entire system.

## REST APIs

All core functionality is exposed through REST endpoints.

### Auth
- **POST** `/api/auth/register`
  Register a new user (Admin or Member)

- **POST** `/api/auth/login`
  Login and receive an encrypted JWT token

---

### Books
- **POST** `/api/books` *(Admin only)*
  Add a new book to the library

- **GET** `/api/books`
  Fetch books with pagination and optional filters

- **PUT** `/api/books/:id` *(Admin only)*
  Update book details safely

---

###  Borrow
- **POST** `/api/borrow/:bookId`
  Borrow a book (Member)

- **POST** `/api/borrow/return/:borrowId`
  Return a borrowed book

---

###  Reports
- **GET** `/api/reports/most-borrowed`
  Get most borrowed books *(Admin only)*

- **GET** `/api/reports/active-members`
  Get most active members *(Admin only)*

- **GET** `/api/reports/availability`
  Book availability summary *(Admin only)*



---

##  GraphQL API

GraphQL is implemented using **Apollo Server** and provides **feature parity with REST APIs**.

### Key Features
- Auth-aware context using encrypted JWT
- Role checks inside resolvers (Admin / Member)
- Zod validation reused inside resolvers
- Queries, mutations, and aggregation reports supported

### GraphQL Endpoint

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
cd nalanda-library-backend

npm install

Create a .env file in the project root:

PORT=5000
MONGO_URI=mongodb://localhost:27017/nalanda
JWT_SECRET=your_super_secret_key


npm run dev
```
