#!/usr/bin/env node
// This is for Mac and Linux OS 

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Argument validation
const args = process.argv;

const isCheckingVersion = args.indexOf('--version')
if (isCheckingVersion !== -1) {
    console.log("Version: 1.0.6")
    process.exit(0)
}

const isCheckingHelp = args.indexOf('--help')
if (isCheckingHelp !== -1) {
    console.log(`Usage: node app.js [options]\n\nA simple HTML preview server.\n\nOptions:\n  --help           Show this help information and exit\n  --version        Show version information and exit\n  --show           Start the preview server and open the browser\n\nExamples:\n  dev-preview --help\n  dev-preview --version\n  dev-preview --show <filename>.html\n`);
    process.exit(0);
}

const showIndex = args.indexOf('--show');

if (showIndex === -1 || !args[showIndex + 1]) {
    console.error('Syntax Error: dev-preview --show <filename>');
    process.exit(1);
}

const filename = args[showIndex + 1];

if (!filename) {
    console.error('Syntax Error: dev-preview --show <filename>');
    process.exit(1);
}

// Get parent folder
const scriptPath = process.argv[1];
const parentFolder = path.dirname(scriptPath);

// Check file exists
const filePath = path.join(process.cwd(), filename);
if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
}

// Serve static files
// Serve static files from the directory containing the HTML file
const fileDir = path.dirname(filePath);
app.use(express.static(fileDir));

// Route to handle requests
app.get('/', (req, res) => {
    // Get file extension
    const ext = path.extname(filename).toLowerCase();

    // Check if it's HTML file
    if (ext === '.html') {
        res.sendFile(filePath);
    } else {
        // For non-HTML files, show error
        console.error('Message: Only HTML files can be served');
        process.exit(1);
    }
});

// Start server
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}/`);
    });

    const ext = path.extname(filename).toLowerCase();

    if (ext !== '.html') {
        // For non-HTML files, show error
        console.error('Message: Only HTML files can be served');
        process.exit(1);
    }

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
