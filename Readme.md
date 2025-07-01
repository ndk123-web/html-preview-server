# Dev Preview Server

[![npm version](https://img.shields.io/npm/v/dev-preview.svg)](https://www.npmjs.com/package/dev-preview)
[![ISC License](https://img.shields.io/npm/l/dev-preview.svg)](https://opensource.org/licenses/ISC)

A simple Express.js server for previewing HTML files locally.

## Features

- Preview any HTML file on your local machine
- Automatic port scanning (3000-9000)
- Clean error handling
- Simple command-line interface
- Global command availability via npm

## Installation

Install the package globally:
```bash
npm install -g dev-preview
```

## Usage

### Basic Usage
Run the server with:
```bash
dev-preview --show <your-html-file>
```

Example:
```bash
dev-preview --show hello.html
```

### Version Information
Check the installed version:
```bash
dev-preview --version
```

### Available Ports
The server will automatically try ports 3000-9000 if the default port is in use.

### File Types
Only HTML files are supported. The server will exit with an error if you try to serve a non-HTML file.

The server will automatically find an available port and start serving your file.

## Project Structure

```
Dev Preview/
├── app.js        # Main server file
├── hello.html    # Example HTML file
└── my.html       # Another example HTML file
```

## Error Handling

- Shows clear error messages if file not found
- Automatically tries next port if current port is in use
- Proper error handling for server startup failures

## Requirements

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details

## Support

For any issues or questions, please:

1. Check the existing issues
2. Create a new issue if your problem hasn't been reported yet
3. Include as much detail as possible when reporting issues

## Acknowledgments

- Thanks to the Express.js team for their excellent framework
- Appreciation to all contributors who help improve this package
