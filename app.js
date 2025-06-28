const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Argument validation
const args = process.argv;
const showIndex = args.indexOf('--show');

if (showIndex === -1 || !args[showIndex + 1]) {
    console.error('Usage: node app.js --show <filename>');
    process.exit(1);
}

const filename = args[showIndex + 1];

// Get parent folder
const scriptPath = process.argv[1];
const parentFolder = path.dirname(scriptPath);

// Check file exists
const filePath = path.join(parentFolder, filename);
if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
}

// Serve static files
app.use(express.static(parentFolder));

// Route to file
app.get('/', (req, res) => {
    res.sendFile(filePath);
});

// Start server
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}/`);
    });

    // if os port bind error then it emmits the 'error' event with error data
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️  Port ${port} in use, trying ${port + 1}...`);
            startServer(port + 1); // recursive call
        } else {
            console.error('🚨 Server error:', err);
            process.exit(1);
        }
    });
}

// Start from port 3000
startServer(3000);
