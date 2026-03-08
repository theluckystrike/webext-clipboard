# Contributing to @theluckystrike/webext-clipboard

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### 1. Fork the Repository

Click the "Fork" button on the [GitHub repository](https://github.com/theluckystrike/webext-clipboard) to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/webext-clipboard.git
cd webext-clipboard
```

### 3. Install Dependencies

This project uses pnpm for package management:

```bash
npm install -g pnpm  # if not already installed
pnpm install
```

### 4. Create a Feature Branch

Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

## Making Changes

1. Make your changes in your feature branch
2. Test your changes with `pnpm test`
3. Commit with a clear commit message
4. Push to your fork

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request against the `main` branch of the original repository

3. Fill in the PR template with:
   - A clear description of your changes
   - Any related issues
   - Testing steps

## Code Style

- Use TypeScript with strict type checking
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Include type definitions for all exports

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
