# Task Tracker Backend

A Node.js backend API for the Task Tracker app with Firebase Authentication integration.

## 🚀 Features

- **Firebase Authentication** - Secure user authentication with Firebase Admin
- **User Management** - User profiles and statistics
- **Task Management** - CRUD operations for tasks with user ownership
- **Enhanced Security** - Token verification and user isolation
- **Database Integration** - MySQL database with proper indexing
- **Error Handling** - Comprehensive error handling and logging

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Authentication**: Firebase Admin SDK
- **Database**: MySQL with mysql2
- **Security**: CORS, input validation
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- Firebase project with Authentication enabled

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=task_tracker_db
DB_PORT=3306

# Firebase Admin Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

### 3. Firebase Admin Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Download the JSON file and copy the values to your `.env` file

### 4. Database Setup

1. Create a MySQL database
2. Run the schema from `database/schema.sql`
3. Update your `.env` file with database credentials

### 5. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
All endpoints require Firebase ID token in Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

### Tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get user's tasks (with filters)
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

## 🔐 Security Features

- **Firebase Token Verification** - All requests verified against Firebase
- **User Isolation** - Users can only access their own data
- **Input Validation** - Comprehensive input sanitization
- **Error Handling** - Secure error messages without data leakage
- **CORS Protection** - Configured for frontend origin only

## 📊 Database Schema

### Users Table
- `id` - Auto-increment primary key
- `firebase_uid` - Firebase user ID (unique)
- `email` - User email address
- `display_name` - User display name
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Tasks Table
- `id` - Auto-increment primary key
- `user_id` - Foreign key to users table
- `title` - Task title (required)
- `description` - Task description
- `start_date` - Task start date (required)
- `end_date` - Task end date
- `priority` - Priority level (low/medium/high)
- `status` - Task status (pending/in_progress/completed/cancelled)
- `created_at` - Task creation timestamp
- `updated_at` - Last update timestamp

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error type",
  "message": "User-friendly error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔍 Development

### Project Structure
```
backend/
├── src/
│   ├── config/          # Database and Firebase config
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication and validation
│   ├── routes/          # API route definitions
│   └── server.js        # Main server file
├── database/            # Database schema and migrations
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## 🌐 CORS Configuration

Configured for frontend origin: `http://localhost:5173`

To change, update the `corsOptions` in `server.js`:
```javascript
const corsOptions = {
  origin: 'your_frontend_url',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}
```

## 📝 Notes

- The backend automatically creates user records when tasks are created
- All database operations are wrapped in try-catch blocks
- Firebase tokens are verified on every authenticated request
- Database indexes are optimized for common queries
- The API follows RESTful conventions

## 🤝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Test your changes thoroughly
5. Update documentation as needed


