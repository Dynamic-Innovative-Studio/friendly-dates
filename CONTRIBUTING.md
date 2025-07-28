# Contributing to Friendly-Dates

Thank you for your interest in contributing to Friendly-Dates! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine:

   ```bash
   git clone https://github.com/dynamic-innovative-studio/friendly-dates.git
   cd friendly-dates
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Scripts

- `npm run build` - Build the library for production
- `npm run dev` - Start development build with watch mode
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:performance` - Run performance benchmarks
- `npm run lint` - Lint the codebase
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Development Workflow

1. **Make your changes** to the codebase
2. **Write or update tests** for your changes
3. **Run tests** to ensure everything works:

   ```bash
   npm test
   ```

4. **Run linting** to ensure code style consistency:

   ```bash
   npm run lint
   ```

5. **Format your code**:

   ```bash
   npm run format
   ```

6. **Build the project** to verify your changes work in the compiled version:

   ```bash
   npm run build
   ```

## Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Ensure all tests pass** with your changes
3. **Commit your changes** with clear, descriptive commit messages
4. **Push to your fork** and submit a pull request to the `main` branch
5. **Describe your changes** in the pull request, explaining the problem and solution

## Commit Message Guidelines

We follow conventional commits for clear and structured history:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

Example:

```git
feat: add Spanish localization
```

## Code Style

We use ESLint and Prettier to maintain code quality and consistency. Please ensure your code follows the established style:

- Use TypeScript strict mode
- Write meaningful comments for complex logic
- Use descriptive variable and function names
- Keep functions small and focused on a single task
- Avoid any-type when possible

## How to Add a New Locale

Friendly-Dates supports multiple locales. To add a new locale, follow these steps to ensure consistency and full integration:

### 1. Create the Locale Configuration

- In `src/locales/`, create a new file named after the locale code (e.g., `de-DE.ts` for German).
- Implement the locale following the `LocaleConfig` interface. Refer to existing locale files (e.g., `en-US.ts`, `fr-FR.ts`) for structure and examples.
- Include all required fields such as month names, weekday names, and formatting patterns.

### 2. Register the Locale

- Import and export your new locale in `src/locales/index.ts` so it becomes available to the library.

### 3. Add Tests

- Create or update tests in `src/__tests__/` to cover your new locale. Add a dedicated test file if needed (e.g., `locale-de-DE.test.ts`).
- Ensure tests cover formatting, parsing, and edge cases for your locale.

### 4. Update Documentation

- Add your locale to the list of supported locales in `README.md`.
- Document any special rules or notes about your locale if applicable.

### 5. Verify and Submit

- Run all tests to ensure nothing is broken: `npm test`
- Lint and format your code: `npm run lint && npm run format`
- Build the project: `npm run build`
- Submit your pull request following the guidelines above.

**Tip:** If your locale has unique date or time conventions, add comments in your locale file to explain them for future maintainers.

## Testing Guidelines

- All new features should have corresponding tests
- Focus on testing behavior, not implementation details
- Include edge cases in your tests
- Make sure all existing tests continue to pass

## Release Process

Maintainers will follow these steps for releases:

1. Update version in package.json
2. Update CHANGELOG.md
3. Tag the release (`git tag v1.x.x`)
4. Push tags (`git push --tags`)
5. Publish to npm (`npm publish`)

## Questions?

Feel free to open an issue with any questions or concerns about contributing.

Thank you for helping improve Friendly-Dates!
