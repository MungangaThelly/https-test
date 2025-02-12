const express = require('express');
const app = express();
app.use(express.json());

// Middleware to redirect insecure HTTP requests to HTTPS
app.get('*', (req, res, next) => {
    if (!req.secure) {
        const securePort = process.env.SECURE_PORT || 443;
        const host = req.hostname;
        const url = `https://${host}:${securePort}${req.originalUrl}`;
        console.log(`Redirecting to: ${url}`);
        return res.redirect(url); // Make sure to return after redirect
    }
    next();
});

// Handle GET request to the root
app.get('/', (req, res) => {
    if (req.secure) {
        res.send('<h1>Hello, Secure World!</h1>');
    } else {
        res.send('<h1>Hello, Insecure World!</h1>');
    }
});

// Handle POST request to the root
app.post('/', (req, res) => {
    console.log('Received POST request:', req.body); // Log the body of the POST request
    res.status(201).send({ success: "true" });
});

module.exports = app;
