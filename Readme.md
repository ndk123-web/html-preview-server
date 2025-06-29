# Show Preview Server

A simple Express.js server for previewing HTML files locally.

## Features

- Preview any HTML file on your local machine
- Automatic port scanning (3000-9000)
- Clean error handling
- Simple command-line interface
- Global command availability via npm link

## Installation

1. Ensure Node.js is installed on your system
2. Install dependencies:
   ```bash
   npm install express
   ```

## Global Installation

To make the `show-preview` command available globally:

1. Navigate to the project directory:
   ```bash
   cd path/to/show-preview
   ```

2. Create a global link:
   ```bash
   npm link
   ```

3. Now you can use `show-preview` from anywhere on your system

## Usage

Run the server in any folder with:
```bash
show-preview --show <your-html-file>
```

Example:
```bash
show-preview --show hello.html
```

The server will automatically find an available port and start serving your file.

## Project Structure

```
Show Preview/
├── app.js        # Main server file
├── hello.html    # Example HTML file
└── my.html       # Another example HTML file
```

## Error Handling

- Shows clear error messages if file not found
- Automatically tries next port if current port is in use
- Proper error handling for server startup failures

## Notes

- Make sure your HTML file exists in the same directory as app.js
- The server will serve files from the directory containing app.js
- Uses Express.js for serving static files
- The `#!/usr/bin/env node` shebang line makes the script executable
- The `bin` field in package.json makes the command globally available

## Support

For any issues or questions, please create an issue in the repository.