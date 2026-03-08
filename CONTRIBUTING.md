# Contributing to @theluckystrike/webext-clipboard

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Fork the Repository

1. Click the **Fork** button on the [repository page](https://github.com/theluckystrike/webext-clipboard)
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-clipboard.git
   cd webext-clipboard
   ```

### Install Dependencies

This project uses pnpm for package management:

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

### Create a Feature Branch

Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Development

Run the build to compile TypeScript:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

### Making Changes

1. Make your changes in the `src/` directory
2. Add or update tests in `src/__tests__/`
3. Ensure the build passes and all tests pass

### Submitting a Pull Request

1. Commit your changes with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: add new clipboard function"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request against the `main` branch of the original repository

4. Fill out the PR template with:
   - Description of changes
   - Related issues (if any)
   - Testing performed

## Code Style

- Use TypeScript with strict mode
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Ensure type safety

## Questions?

If you have questions, feel free to open an issue or reach out through the repository.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
