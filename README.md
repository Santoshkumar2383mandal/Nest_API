# Nest.js Postgres API

A complete Nest.js REST API with Authentication and Resource management.

## Features

- **PostgreSQL** database with **TypeORM**
- **Authentication**: Register & Login with JWT and bcrypt
- **Resource Module**: Items CRUD with ownership protection
- **Validation**: DTOs and class-validator
- **Security**: JWT Guards, Password Hashing
- **Testing**: Unit tests for Controllers and Services

## Folder Structure

```
src/
├── auth/           # Authentication Module
│   ├── dto/        # Data Transfer Objects (Login, Register)
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── user.entity.ts
├── item/           # Resource Module
│   ├── dto/        # Create/Update DTOs
│   ├── item.controller.ts
│   ├── item.module.ts
│   ├── item.service.ts
│   └── item.entity.ts
├── app.module.ts   # Main Module
└── main.ts         # Entry Point
```

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL=postgres://user:password@localhost:5432/db_name
    JWT_SECRET=supersecretkey
    JWT_EXPIRES_IN=1d
    ```

3.  **Run Database**
    Ensure you have PostgreSQL running and the database created.

4.  **Run Application**
    ```bash
    # development
    npm run start:dev

    # production
    npm run build
    npm run start:prod
    ```

5.  **Run Tests**
    ```bash
    npm run test
    ```

## API Endpoints

### Auth
- `POST /auth/register` - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password" }`
- `POST /auth/login` - Login and get JWT
  - Body: `{ "email": "user@example.com", "password": "password" }`

### Items (Protected)
Headers: `Authorization: Bearer <token>`

- `POST /items` - Create item
  - Body: `{ "title": "My Item", "description": "Optional" }`
- `GET /items` - Get all items
- `GET /items/:id` - Get item by ID
- `PATCH /items/:id` - Update item (Owner only)
  - Body: `{ "title": "New Title" }`
- `DELETE /items/:id` - Delete item (Owner only)

## Notes
- The `ItemService` protects `update` and `delete` operations by checking if the requesting user is the owner.
- `ValidationPipe` is enabled globally in `main.ts` to ensure data integrity.
