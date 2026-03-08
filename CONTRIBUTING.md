# Contributing to @theluckystrike/webext-clipboard

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-clipboard.git
   cd webext-clipboard
   ```

### Install Dependencies

```bash
pnpm install
```

### Create a Branch

Create a feature branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## Development Workflow

### Running Tests

```bash
pnpm test
```

This runs the test suite with Vitest. All tests must pass before submitting a PR.

### Building

```bash
pnpm build
```

This builds the TypeScript source to JavaScript using tsup.

## Code Style

- Use TypeScript for all new code
- Follow existing code conventions
- Add JSDoc comments for public APIs
- Ensure all tests pass before submitting

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request against the `main` branch

3. Fill out the PR template with:
   - Description of changes
   - Related issue numbers (if applicable)
   - Testing performed

4. Wait for review and address any feedback

## Code of Conduct

Be respectful and constructive. We welcome contributions from everyone.

## Questions?

If you have questions, feel free to open an issue for discussion before submitting a PR.
