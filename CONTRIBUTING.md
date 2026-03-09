# Contributing to @theluckystrike/webext-clipboard

Thank you for your interest in contributing! This library is part of the @zovo/webext ecosystem and provides typed clipboard helpers for Chrome extensions.

## Development Workflow

### 1. Fork and Clone

Fork this repository and clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/webext-clipboard.git
cd webext-clipboard
```

### 2. Install Dependencies

This project uses pnpm for package management:

```bash
pnpm install
```

### 3. Create a Feature Branch

Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 4. Make Changes

Make your changes to the source code in `src/index.ts`. This project uses TypeScript.

### 5. Run Tests

Run the test suite to ensure your changes don't break existing functionality:

```bash
pnpm test
```

### 6. Build the Project

Build the TypeScript to ensure it compiles correctly:

```bash
pnpm build
```

### 7. Commit and Push

Commit your changes with a descriptive message:

```bash
git add .
git commit -m "feat: add new feature or fix description"
git push origin your-branch-name
```

### 8. Open a Pull Request

Open a pull request against the `main` branch of the original repository. Include:

- A clear description of what your changes do
- Any relevant issue numbers
- A summary of testing performed

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns in `src/index.ts`
- Add JSDoc comments for public APIs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
