# Contributing to @theluckystrike/webext-clipboard

Thank you for your interest in contributing!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/webext-clipboard.git
cd webext-clipboard

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## Code Style

This project uses TypeScript with default settings. Please ensure:

- TypeScript types are properly defined
- Functions include JSDoc comments
- Code is formatted consistently with the existing style

## Testing

Write tests for any new functionality. Tests are located in `src/__tests__/`.

```bash
npm test
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests and ensure they pass
5. Commit with clear messages
6. Push to your fork
7. Open a pull request

## Commit Messages

Use clear, descriptive commit messages:
- `feat: add copyImage function`
- `fix: resolve clipboard fallback issue`
- `docs: update README with examples`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
