#!/usr/bin/env node
const express = require('express');
const path = require('path');
const fs = require('fs');
const packageInfo = require('./package.json');

const args = process.argv;

if (args.includes('--version')) {
    console.log(`Version: ${packageInfo.version}`);
    process.exit(0)
}

if (args.includes('--help')) {
    console.log(`Usage: dev-preview <filename>.html\n\nA simple HTML preview server.\n\nOptions:\n  --help           Show this help information and exit\n  --version        Show version information and exit\n\nExamples:\n  dev-preview hello.html\n  dev-preview --help\n  dev-preview --version\n`);
    process.exit(0);
}

const filename = args.slice(2).find((arg) => !arg.startsWith('--'));
if (!filename || args.slice(2).some((arg) => arg === '--show')) {
    console.error('Syntax Error: dev-preview <filename>.html');
    process.exit(1);
}

const filePath = path.resolve(process.cwd(), filename);
if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
}

if (path.extname(filename).toLowerCase() !== '.html') {
    console.error('Message: Only HTML files can be served');
    process.exit(1);
}

const app = express();
const fileDir = path.dirname(filePath);
app.use(express.static(fileDir));

app.get('/', (req, res) => {
    res.sendFile(filePath);
});

let server;
let restartTimer;

function startServer(port, allowPortFallback = true) {
    const nextServer = app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}/`);
    });

    nextServer.on('error', (err) => {
        if (err.code === 'EADDRINUSE' && allowPortFallback) {
            console.warn(`⚠️  Port ${port} in use, trying ${port + 1}...`);
            server = startServer(port + 1);
        } else {
            console.error('🚨 Server error:', err);
            process.exit(1);
        }
    });

    return nextServer;
}

function restartServer() {
    if (!server) return;

    const port = server.address().port;
    server.close(() => {
        console.log('🔄 Change detected, restarting preview server...');
        server = startServer(port, false);
    });
}

function watchForChanges() {
    const onChange = () => {
        clearTimeout(restartTimer);
        restartTimer = setTimeout(restartServer, 100);
    };

    try {
        fs.watch(fileDir, { recursive: true }, onChange);
    } catch (err) {
        if (err.code !== 'ERR_FEATURE_UNAVAILABLE_ON_PLATFORM') {
            throw err;
        }
        fs.watch(fileDir, onChange);
    }
}

server = startServer(3000);
watchForChanges();
