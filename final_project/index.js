const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated; // login, register
const genl_routes = require('./router/general.js').general; // public routes

const app = express();
const DEFAULT_PORT = 5000;

// Body parser
app.use(express.json());

// Session middleware
app.use(session({
    secret: "fingerprint_customer",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Middleware to protect /customer/auth/* routes
app.use("/customer/auth/*", (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }

    jwt.verify(token, "access", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
});

// Mount routers
app.use("/customer", customer_routes); // login & register
app.use("/", genl_routes); // public routes

// Start server with automatic port increment
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`✅ Server is running on port ${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️  Port ${port} is in use. Trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
}

startServer(DEFAULT_PORT);
