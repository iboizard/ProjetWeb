# CRM Projet Management

CRM Projet Management is an all-in-one management application that allows teams to manage projects, track sales, handle teams, and centralize documents.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install the application, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/iboizard/ProjetWeb.git
```

2. Install the dependencies:

```bash
npm i
```

## Usage

To start the application, use the following command:

 1. Backend

```bash
cd backend
npm start
```
  
 2. Frontend

```bash
cd frontend
npm run serve
```

The application will be accessible at http://localhost:8080 by default.

## Project Summary

### Backend

- **Language:** JavaScript (Node.js)
- **Framework:** Express.js
- **Database:** Sequelize (MySQL, PostgreSQL, SQLite)
- **Authentication:** JWT (jsonwebtoken), Bcrypt for password hashing
- **WebSockets:** Socket.io for real-time communication
- **Middleware:** Cors for handling cross-origin HTTP requests
- **Other notable dependencies:** Dotenv for managing environment variables, Body-parser for parsing request bodies, Node-fetch for HTTP requests from the server

**Database:**

- Support for MySQL, PostgreSQL, and SQLite via Sequelize

### Frontend

- **Framework:** Vue.js (Vue 3)
- **Routing:** Vue Router
- **State management:** Vuex
- **Communication with the backend:** Axios for HTTP requests
- **WebSockets:** Socket.io-client for real-time communication with the server
- **Other notable dependencies:** Core-js for compatibility, Babel for transpilation

**Browserslist:**

- Configuration for browser compatibility

**Notes:**

- The backend uses Sequelize as an ORM to facilitate database operations.
- WebSockets (Socket.io) are used for bidirectional real-time communication between the frontend and backend.
- State management in the frontend is handled by Vuex.
- Project configuration includes scripts for development, building, and linting.
- The frontend communicates with the backend through HTTP requests (Axios) and uses Socket.io for real-time updates.
- The project is structured in a modular way, following best practices for each framework (Express.js for the backend, Vue.js for the frontend).
