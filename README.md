# Project API Documentation

## Overview

This project is a RESTful API built with **Express** and **Sequelize** for managing a platform with user authentication, listings, chats, images, categories, and more. It connects to a **MySQL** database and uses **Redis** for session management.

## Features

- User authentication and management
- Listings creation and management
- Chat and messaging functionality
- Image handling
- Categories management
- Location management
- Password recovery

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>

2. Set up environment variables: Create a .env file in the root directory and add the following variables:
- SECRET_KEY=<your_secret_key>
- DB_HOST=<your_db_host>
- DB_USER=<your_db_user>
- DB_PASS=<your_db_password>
- DB_NAME=<your_db_name>

3. ```bash
    tsc -w
    nodemon ./dist/server.js
    

The server will run at: https://127.0.0.1:443.

## Usage

### User Authentication:
- Register, login, and log out users using the `/signup`, `/signin`, and `/logout` routes.

### Listing Management:
- Create, update, delete, and retrieve listings via the `/listing` routes.

### Image Management:
- Upload and manage images associated with listings via the `/image` routes.

### Chat and Message Management:
- Create and retrieve chats related to listings, and send messages using the `/chat` and `/message` routes.

### Category and Location Management:
- Manage categories and locations with the `/category` and `/location` routes.

## Routes

### User Routes:
- `/api/user` (GET) - Get all users.
- `/api/user/signup` (POST) - Register a new user.
- `/api/user/signin` (POST) - Login a user.
- `/api/user/logout` (POST) - Logout a user.
- `/api/user/:id` (GET, PATCH, DELETE) - Get, update, or delete a specific user.

### Listing Routes:
- `/api/listing` (POST, GET) - Create a new listing or get all listings.
- `/api/listing/:id` (GET, PATCH, DELETE) - Get, update, or delete a specific listing.

### Image Routes:
- `/api/image` (POST, GET) - Upload a new image or get all images.
- `/api/image/:id` (GET, PATCH, DELETE) - Get, update, or delete a specific image.

### Message Routes:
- `/api/message` (POST) - Send a new message.
- `/api/message/:chatId` (GET) - Get all messages in a specific chat.
- `/api/message/:chatId/:messageId` (PATCH, DELETE) - Update or delete a specific message.

### Chat Routes:
- `/api/chat` (POST) - Create a new chat.
- `/api/chat/:chatId` (GET, PATCH, DELETE) - Get, update, or delete a specific chat.

### Category Routes:
- `/api/category` (POST, GET) - Create a new category or get all categories.
- `/api/category/:id` (GET, PATCH, DELETE) - Get, update, or delete a specific category.

### Location Routes:
- `/api/location` (POST, GET) - Create a new location or get all locations.
- `/api/location/:id` (GET, PATCH, DELETE) - Get, update, or delete a specific location.

## Technologies Used

- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: MySQL
- **Cache Storage**: Redis
- **Session Management**: `express-session` with Sequelize store
- **Security**: HTTPS, environment variables, session management


