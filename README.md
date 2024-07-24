# Book Store API

A Node.js API for managing a book store, including routes for authentication, authors, books, users, password reset, and image upload. This API supports various middlewares for error handling, logging, and token verification.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
  - [Auth Routes](#auth-routes)
  - [Author Routes](#author-routes)
  - [Book Routes](#book-routes)
  - [Password Routes](#password-routes)
  - [Upload Routes](#upload-routes)
  - [User Routes](#user-routes)
- [Models](#models)
- [Middleware](#middleware)
- [Views](#views)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Abdelmoumainenessah2002/book-store-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd book-store-api
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up the environment variables by creating a `.env` file in the root directory. Refer to the [Environment Variables](#environment-variables) section for required variables.

5. Seed the database (optional):
    ### For the Books
    ```bash
    node seeder -import 
    ```
    ### For the Authors
    ```bash
    node seeder -import-authors 
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. The API will be available at `http://localhost:5000`.

## Routes

### Auth Routes

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: User login.

### Author Routes

- **GET /authors**: Get all authors.
- **GET /authors/:id**: Get a specific author by ID.
- **POST /authors**: Create a new author (admin only).
- **PUT /authors/:id**: Update an author by ID (admin only).
- **DELETE /authors/:id**: Delete an author by ID (admin only).

### Book Routes

- **GET /books**: Get all books.
- **GET /books/:id**: Get a specific book by ID.
- **POST /books**: Create a new book (admin only).
- **PUT /books/:id**: Update a book by ID (admin only).
- **DELETE /books/:id**: Delete a book by ID (admin only).

### Password Routes

- **GET /password/forgot-password**: Render forgot password view.
- **POST /password/forgot-password**: Send password reset link.
- **GET /password/reset-password/:userId/:token**: Render reset password view.
- **POST /password/reset-password/:userId/:token**: Reset password.

### Upload Routes

- **POST /upload**: Upload an image file.

### User Routes

- **GET /users**: Get all users (admin only).
- **GET /users/:id**: Get a specific user by ID.
- **PUT /users/:id**: Update a user by ID.
- **DELETE /users/:id**: Delete a user by ID.

## Models

### Author

Defines the schema for authors in the database. An author has a name and an array of books.

### Book

Defines the schema for books in the database. A book has a title, author reference, and a published date.

### User

Defines the schema for users in the database. A user has a name, email, and password.

## Middleware

### Errors

Handles application errors and sends appropriate responses.

### Logger

Logs incoming requests to the console.

### Verify Token

Verifies JWT tokens for protected routes.

### Verify Token and Admin

Verifies JWT tokens and checks if the user has admin privileges for protected routes.

### Verify Token and Authorization

Verifies JWT tokens and checks if the user is authorized for specific actions.

## Views

Contains EJS templates for password-related views (forgot password, reset password, link sent, and success).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- **MONGO_URI**: MongoDB connection string.
  ```plaintext
  MONGO_URI=mongodb://localhost/bookStoreDB
  ```

- **PORT**: Server port number.
  ```plaintext
  PORT=5000
  ```

- **JWT_SECRET_KEY**: Secret key for JWT.
  ```plaintext
  JWT_SECRET_KEY= your secret key
  ```

- **NODE_ENV**: Development environment.
  ```plaintext
  NODE_ENV=development
  ```

- **USER_EMAIL**: Email for sending notifications.
  ```plaintext
  USER_EMAIL= your.email@email.com
  ```

- **USER_PASSWORD**: Password for email authentication.
  ```plaintext
  USER_PASSWORD=your_password
  ```

## Dependencies

- **bcryptjs**: Library for hashing passwords.
- **cors**: Middleware for enabling CORS.
- **dotenv**: Loads environment variables from a .env file.
- **ejs**: Embedded JavaScript templates.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **express-async-handler**: Simple middleware for handling exceptions inside async express routes.
- **helmet**: Helps secure Express apps by setting various HTTP headers.
- **joi**: Data validation library.
- **joi-password-complexity**: Joi extension for password complexity validation.
- **jsonwebtoken**: Implementation of JSON Web Tokens.
- **mongoose**: MongoDB object modeling tool.
- **multer**: Middleware for handling multipart/form-data.
- **nodemailer**: Easy as cake email sending from Node.js.

### Dev Dependencies

- **nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.

## License

This project is licensed under the ISC License.