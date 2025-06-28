# Show Preview Server

A simple Express.js server for previewing HTML files.

## Features

- Preview any HTML file on your local machine
- Automatic port scanning (3000-9000)
- Clean error handling
- Simple command-line interface

## Installation

1. Ensure Node.js is installed on your system
2. Install dependencies:
   ```bash
   npm install express
   ```

## Usage

Run the server with:
```bash
node app.js --show <your-html-file>
```

Example:
```bash
node app.js --show hello.html
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

## Support

For any issues or questions, please create an issue in the repository.