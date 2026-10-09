const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const test = require('node:test');

const appPath = path.join(__dirname, '..', 'app.js');

function request(port) {
    return new Promise((resolve, reject) => {
        const request = http.get(`http://localhost:${port}/`, (response) => {
            let body = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => { body += chunk; });
            response.on('end', () => resolve({ statusCode: response.statusCode, body }));
        });
        request.on('error', reject);
    });
}

function waitForOutput(child, pattern) {
    return new Promise((resolve, reject) => {
        let output = '';
        const timeout = setTimeout(() => reject(new Error(`Timed out waiting for ${pattern}`)), 5000);
        const onData = (chunk) => {
            output += chunk.toString();
            if (pattern.test(output)) {
                clearTimeout(timeout);
                child.stdout.off('data', onData);
                resolve(output);
            }
        };
        child.stdout.on('data', onData);
        child.once('exit', () => {
            clearTimeout(timeout);
            reject(new Error(`Preview server exited before ${pattern}`));
        });
    });
}

test('restarts on file changes and keeps the same port', async (t) => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-preview-'));
    const filename = 'index.html';
    const filePath = path.join(directory, filename);
    fs.writeFileSync(filePath, '<h1>before</h1>');

    const child = spawn(process.execPath, [appPath, filename], {
        cwd: directory,
        stdio: ['ignore', 'pipe', 'pipe']
    });
    t.after(() => child.kill());

    const output = await waitForOutput(child, /localhost:(\d+)/);
    const port = Number(output.match(/localhost:(\d+)/)[1]);
    assert.equal((await request(port)).body, '<h1>before</h1>');

    const restart = waitForOutput(child, /restarting preview server/);
    fs.writeFileSync(filePath, '<h1>after</h1>');
    await restart;

    assert.equal((await request(port)).body, '<h1>after</h1>');
});
