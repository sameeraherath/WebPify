# Contributing to WebPify

Thank you for your interest in contributing to WebPify! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) and npm
- **Python** (3.8 or higher) and pip
- **Git** for version control
- A GitHub account

### Setting Up the Development Environment

1. **Fork the repository** on GitHub

2. **Clone your forked repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/WebPify.git
   cd WebPify
   ```

3. **Set up the backend:**
   ```bash
   cd server
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Set up the frontend:**
   ```bash
   cd ../client
   npm install
   ```

5. **Optional: Create a `.env` file** in `client/` for custom configuration:
   ```bash
   # client/.env
   VITE_API_URL=http://localhost:8000/api/convert
   ```

## Development Workflow

### Making Changes

1. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly

3. **Follow the coding standards** (see below)

4. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add support for AVIF format"
   ```

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
- `feat: add batch processing for large file sets`
- `fix: resolve memory leak in image conversion`
- `docs: update API documentation`

### Testing Your Changes

**Backend Testing:**
```bash
cd server
python start.py
```

Visit `http://localhost:8000/docs` to test the API endpoints.

**Frontend Testing:**
```bash
cd client
npm run dev
# or
npm start
```

Visit `http://localhost:3000` (or the next available port) to test the UI.

### Submitting Your Changes

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template (if available)
   - Submit the PR

3. **Wait for review** and respond to any feedback

## Coding Standards

### Python (Backend)

- Follow [PEP 8](https://pep8.org/) style guidelines
- Use type hints where appropriate
- Add docstrings to functions and classes
- Keep functions focused and single-purpose
- Maximum line length: 100 characters

Example:
```python
def convert_to_webp(image_data: bytes, quality: int = 85) -> bytes:
    """
    Convert image data to WebP format.
    
    Args:
        image_data: Raw image bytes
        quality: WebP quality (1-100)
        
    Returns:
        Converted WebP image bytes
    """
    # Implementation here
    pass
```

### JavaScript (Frontend)

- Use modern ES6+ syntax
- Follow React best practices
- Use meaningful variable and function names
- Keep components small and focused
- Add comments for complex logic

Example:
```javascript
const FileUpload = ({ onFileSelect, maxFiles }) => {
  const handleChange = (e) => {
    const files = Array.from(e.target.files).slice(0, maxFiles);
    onFileSelect(files);
  };
  
  return (
    <input
      type="file"
      multiple
      onChange={handleChange}
      className="file-input"
    />
  );
};
```

**Note:** With Vite, files containing JSX must use the `.jsx` extension instead of `.js` for proper module resolution.

### CSS/Styling

- Use Tailwind CSS utility classes
- Maintain consistent spacing and colors
- Ensure responsive design
- Follow existing design patterns

### Vite-Specific Guidelines

- All files containing JSX must use `.jsx` extension
- Use `import.meta.env.VITE_*` for environment variables (not `process.env`)
- Leverage Vite's fast HMR for rapid development iteration
- Build output goes to `build/` directory (configurable in `vite.config.js`)

## Project Structure

### Backend (`server/`)

```
server/
├── main.py              # FastAPI application and routes
├── start.py             # Server startup script
├── requirements.txt     # Python dependencies
└── utils/
    ├── __init__.py
    └── image_converter.py  # Image processing logic
```

### Frontend (`client/`)

```
client/
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.jsx        # Entry point
│   ├── index.css        # Global styles
│   └── components/
│       ├── FileUpload.jsx
│       ├── ConversionProgress.jsx
│       ├── ConversionResults.jsx
│       ├── Features.jsx
│       ├── Header.jsx
│       └── Footer.jsx
├── public/
│   ├── fav.png
│   └── manifest.json
├── index.html           # Vite HTML template
├── vite.config.js       # Vite configuration
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Areas for Contribution

We welcome contributions in various areas:

### Features

- [ ] Add support for more image formats (ICO, AVIF, etc.)
- [ ] Implement image resizing/optimization
- [ ] Add drag-and-drop support
- [ ] Implement progressive WebP loading
- [ ] Add batch download progress for large files
- [ ] Create a CLI tool version
- [ ] Add PWA support for offline functionality
- [ ] Implement image preview before conversion

### Improvements

- [ ] Performance optimizations
- [ ] Better error handling
- [ ] Enhanced UI/UX
- [ ] Accessibility improvements
- [ ] Internationalization (i18n)
- [ ] Dark mode support

### Documentation

- [ ] API documentation improvements
- [ ] Add code examples
- [ ] Create video tutorials
- [ ] Improve README
- [ ] Add architecture diagrams

### Testing

- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add E2E tests
- [ ] Improve test coverage

### Bug Fixes

- Report bugs using GitHub Issues
- Include steps to reproduce
- Provide error messages and screenshots

## Reporting Issues

When reporting issues, please include:

1. **Description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Environment details:**
   - OS and version
   - Node.js version
   - Python version
   - Browser (for frontend issues)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Give constructive feedback
- Focus on what is best for the community

### Expected Behavior

- Use welcoming language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing others' private information
- Other conduct that could be considered inappropriate

## Questions?

If you have questions about contributing, please:

- Open a GitHub Discussion
- Create an issue with the "question" label
- Contact the maintainers

## License

By contributing to WebPify, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:

- README.md (Contributors section)
- Release notes (for significant contributions)
- GitHub Contributors page

Thank you for contributing to WebPify! 🎉

