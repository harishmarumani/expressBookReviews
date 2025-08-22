# Express Book Reviews API

A comprehensive RESTful API for managing book reviews built with Express.js. This application provides authentication, book management, and review functionality with a clean and intuitive interface.

## 📋 Project Overview

The Express Book Reviews API is a full-featured web application that allows users to browse books, register accounts, authenticate, and manage book reviews. The application demonstrates modern web development practices with Express.js, including middleware usage, authentication, and RESTful API design.

## ✨ Features

- **User Authentication**: Secure registration and login system
- **Book Management**: Browse and search through a collection of books
- **Review System**: Add, edit, and delete book reviews
- **User Sessions**: Persistent login sessions
- **RESTful API**: Clean and intuitive API endpoints
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Robust error handling and user feedback
- **JSON Responses**: Consistent JSON response format

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Session Management**: express-session
- **Data Storage**: In-memory data structures (JSON objects)
- **Middleware**: Custom authentication and validation middleware
- **Development**: nodemon for development server

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tharunkumar04/expressBookReviews.git
   cd expressBookReviews/final_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create environment file (optional)
   cp .env.example .env
   ```

## 🏃‍♂️ Running Locally

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new user | No |
| POST | `/customer/login` | User login | No |
| GET | `/customer/logout` | User logout | Yes |

### Book Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/` | Get all books | No |
| GET | `/isbn/:isbn` | Get book by ISBN | No |
| GET | `/author/:author` | Get books by author | No |
| GET | `/title/:title` | Get books by title | No |

### Review Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/review/:isbn` | Get reviews for book | No |
| POST | `/customer/auth/review/:isbn` | Add/update review | Yes |
| DELETE | `/customer/auth/review/:isbn` | Delete review | Yes |

## 🔐 Authentication

The API uses JWT-based authentication with the following flow:

1. **Registration**: Users register with username and password
2. **Login**: Users authenticate and receive a JWT token
3. **Authorization**: Protected routes require valid JWT token in headers
4. **Sessions**: Server maintains user sessions for authenticated requests

### Authentication Headers
```bash
Authorization: Bearer <jwt_token>
```

## 📝 Example Requests

### Register User
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

### Get All Books
```bash
curl -X GET http://localhost:5000/
```

### Add Review
```bash
curl -X POST http://localhost:5000/customer/auth/review/9781593275846 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{"review": "Excellent book on JavaScript!"}'
```

### Get Reviews
```bash
curl -X GET http://localhost:5000/review/9781593275846
```

## 📁 Project Structure

```
final_project/
├── router/
│   ├── auth_users.js      # Authenticated user routes
│   ├── booksdb.js         # Book database and utilities
│   └── general.js         # Public routes
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

### File Descriptions

- **`index.js`**: Main application file with Express server setup
- **`router/general.js`**: Public routes for books and reviews
- **`router/auth_users.js`**: Protected routes requiring authentication
- **`router/booksdb.js`**: Book data and database utilities
- **`package.json`**: Project configuration and dependencies

## 🧪 Testing

### Manual Testing
Use tools like Postman, Insomnia, or curl to test the API endpoints.

### Test Coverage
- User registration and authentication
- Book retrieval by various criteria
- Review CRUD operations
- Error handling and validation
- Authentication middleware

### Example Test Scenarios
1. Register new user → Login → Add review → Verify review
2. Search books by author, title, ISBN
3. Attempt unauthorized access to protected routes
4. Test invalid input validation

## 🚀 Deployment

### Local Deployment
```bash
npm start
```

### Production Deployment

1. **Environment Variables**
   ```bash
   export NODE_ENV=production
   export PORT=3000
   ```

2. **Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start index.js --name "book-reviews-api"
   ```

3. **Docker Deployment**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Add appropriate comments and documentation
- Test your changes thoroughly
- Update README if adding new features
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgements

- **Express.js Team**: For the excellent web framework
- **Node.js Community**: For the robust runtime environment
- **JWT.io**: For authentication standards and libraries
- **Contributors**: Thank you to all contributors who help improve this project
- **Open Source Community**: For inspiration and best practices

## 📞 Support

If you have questions or need support:
- Open an issue on GitHub
- Check existing documentation
- Review the API endpoints and examples above

---

**Happy Coding! 🚀**
