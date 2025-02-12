const https = require('https');
const fs = require('fs');
const app = require('./app');
const PORT = process.env.SECURE_PORT || 443;  // Fixed typo here

// Handle file reading errors and ensure files exist
let key, cert;

try {
    key = fs.readFileSync('./certs/server.key', 'utf8');  // Add encoding for clarity
} catch (error) {
    console.error('Error reading server key file:', error);
    process.exit(1);  // Exit if the key file is missing or unreadable
}

try {
    cert = fs.readFileSync('./certs/server.cert', 'utf8');  // Add encoding for clarity
} catch (error) {
    console.error('Error reading server certificate file:', error);
    process.exit(1);  // Exit if the cert file is missing or unreadable
}

const tlsOptions = {
    key,  // The key read from the file
    cert  // The cert read from the file
};

// Start the HTTPS server with error handling
try {
    https.createServer(tlsOptions, app).listen(PORT, () => {
        console.log(`HTTPS Server is running on https://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Error starting HTTPS server:', error);
    process.exit(1); // Exit with failure if server setup fails
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down HTTPS server gracefully...');
    process.exit(0);
});
