# Friendly-Dates

[![Dynamic Innovative Studio](public/icons/DIS_Original_logo.png)](https://dynamic-innovative-studio.web.app)
[![Friendly Dates](public/icons/friendly-dates-logo.png)](https://github.com/Dynamic-Innovative-Studio/friendly-dates)

[![CI](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/ci.yaml/badge.svg)](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/ci.yaml)
[![Code Quality](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/code-quality.yaml/badge.svg)](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/code-quality.yaml)
[![npm version](https://img.shields.io/npm/v/@dynamic-innovative-studio/friendly-dates.svg)](https://www.npmjs.com/package/@dynamic-innovative-studio/friendly-dates)
[![license](https://img.shields.io/npm/l/@dynamic-innovative-studio/friendly-dates.svg)](https://github.com/Dynamic-Innovative-Studio/friendly-dates/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@dynamic-innovative-studio/friendly-dates)](https://bundlephobia.com/package/@dynamic-innovative-studio/friendly-dates)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

This is the public repository for the Friendly-Dates - a cutting-edge technology, secure, safe and lighting fast library.
This technology is owned by Dynamic Innovative Studio.

## Features

- 🔥 **Tiny footprint** - Less than 2KB minified and gzipped
- 🚀 **Zero dependencies** - Keeps your project lean
- 🛡️ **Fully typed** - Built with TypeScript for better developer experience
- 🌎 **i18n support** - Easy localization (8 languages in total)
- ⚡ **Huge performance** - Optimized by design for speed and minimal memory usage
- 📦 **Tree-shakeable** - Import only what you need
- 🧪 **Well tested** - Comprehensive test coverage

## Installation

```bash
npm install @dynamic-innovative-studio/friendly-dates
```

or

```bash
yarn add @dynamic-innovative-studio/friendly-dates
```

or

```bash
pnpm add @dynamic-innovative-studio/friendly-dates
```

## Usage

### Basic Usage

```typescript
import { format } from '@dynamic-innovative-studio/friendly-dates';
// or
import format from '@dynamic-innovative-studio/friendly-dates';

// Basic usage (relative to current time)
format(new Date()); // "Just now"
format(new Date(Date.now() - 5 * 60 * 1000)); // "5 minutes ago"
format(new Date(Date.now() + 2 * 60 * 60 * 1000)); // "in 2 hours"

// With a specific reference date
const referenceDate = new Date('2023-10-15T12:00:00Z');
format(new Date('2023-10-14T15:30:00Z'), referenceDate); // "Yesterday at 3:30 PM"
format(new Date('2023-10-16T09:15:00Z'), referenceDate); // "Tomorrow at 9:15 AM"
format(new Date('2023-10-12T10:00:00Z'), referenceDate); // "Last Thursday at 10:00 AM"
```

### With Options

```typescript
import format, { ptPT } from 'friendly-date';

// Using Portuguese (Portugal) locale
format(new Date(Date.now() - 5 * 60 * 1000), undefined, { locale: ptPT }); // "5 minutos atrás"

// Customizing format options
format(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), undefined, {
  includeTime: false,   // Don't include time
  timeFormat: '24h',    // Use 24-hour format
  maxUnit: 'day',       // Don't convert to weeks/months/years
  useWords: false       // Use numbers instead of words
}); // "2 days ago"

// Maximum unit threshold
format(new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), undefined, {
  maxUnit: 'month'      // Will use months instead of days
}); // "a month ago"

format(new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), undefined, {
  maxUnit: 'day'        // Force using days
}); // "45 days ago"

// Custom "just now" threshold
format(new Date(Date.now() - 20 * 1000), undefined, {
  justNowThreshold: 30  // Consider "just now" if within 30 seconds
}); // "Just now"

format(new Date(Date.now() - 20 * 1000), undefined, {
  justNowThreshold: 10  // Only consider "just now" if within 10 seconds
}); // "20 seconds ago"

// Using with Dates, ISO strings, or timestamps all work
format(new Date()); // Using Date object
format("2023-10-15T12:00:00Z"); // Using ISO string
format(1697371200000); // Using timestamp
```

### Creating Custom Locales

```typescript
import { format, LocaleConfig } from 'friendly-date';

// Define a custom locale (e.g., Spanish)
const esES: LocaleConfig = {
  units: {
    second: 'segundo',
    minute: 'minuto',
    hour: 'hora',
    day: 'día',
    week: 'semana',
    month: 'mes',
    year: 'año',
  },
  unitsPlural: {
    second: 'segundos',
    minute: 'minutos',
    hour: 'horas',
    day: 'días',
    week: 'semanas',
    month: 'meses',
    year: 'años',
  },
  relative: {
    just: 'Ahora mismo',
    past: 'hace',
    future: 'en',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    previous: 'El',
    next: 'El próximo',
    at: 'a las',
  },
  days: {
    short: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    long: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  },
  months: {
    short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    long: [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ],
  },
};

// Use the custom locale
format(new Date(Date.now() - 5 * 60 * 1000,undefined, { locale: esES }); // "5 minutos hace"
```

## API Reference

### `format(date, referenceDate?, options?)`

Formats a date into a human-friendly string.

#### Parameters

- `date` (required): Date to format (Date object, ISO string, or timestamp)
- `referenceDate` (optional): Reference date to calculate relative time from (defaults to current time)
- `options` (optional): Formatting options

#### Options

| Option             | Type                                                                                 | Default  | Description                                                 |
| ------------------ | ------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------------- |
| `locale`           | `LocaleConfig`                                                                       | `enUS`   | Locale configuration for i18n                               |
| `includeTime`      | `boolean`                                                                            | `true`   | Whether to include the time in the output                   |
| `timeFormat`       | `'12h'` or `'24h'`                                                                   | `'12h'`  | Format for time display                                     |
| `maxUnit`          | `'second'` \| `'minute'` \| `'hour'` \| `'day'` \| `'week'` \| `'month'` \| `'year'` | `'year'` | Maximum unit to use for relative formatting                 |
| `justNowThreshold` | `number`                                                                             | `30`     | Threshold in seconds to consider "just now"                 |
| `useWords`         | `boolean`                                                                            | `true`   | Whether to use words for small numbers or always use digits |

#### Return Value

A string representing the date in a human-friendly format.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ support required
- No polyfills needed for modern environments

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Dynamic-Innovative-Studio/friendly-dates.git
cd friendly-dates

# Install dependencies
npm install

# Run development build
npm run dev
```

### Available Scripts

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

### Code Quality

This project uses modern tooling for code quality:

- **TypeScript** with strict configuration for type safety
- **ESLint** with comprehensive rules for code quality
- **Prettier** for consistent code formatting
- **Jest** for testing with coverage reporting
- **GitHub Actions** for CI/CD pipeline

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and ensure tests pass: `npm test`
4. Lint and format your code: `npm run lint:fix && npm run format`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- **CI Workflow**: Runs on every push and pull request
  - Tests across Node.js versions 18.x, 20.x, and 22.x
  - Type checking with TypeScript
  - Linting with ESLint
  - Code coverage reporting
  - Build verification

- **Code Quality Workflow**: Monitors code quality metrics
  - SARIF security analysis
  - Performance testing
  - Bundle size monitoring

- **Dependency Updates**: Automated weekly dependency updates
  - Security vulnerability scanning
  - Automated pull requests for updates

- **Publishing**: Automated NPM publishing on release commits

## Performance

FriendlyDate is designed to be lightweight and fast:

- Minimal calculations
- No external dependencies
- Optimized for repeated use
- Less than 2KB gzipped
- Comprehensive performance testing included

## Comparison with Alternatives

| Feature            | FriendlyDate | moment.js      | date-fns  | dayjs     |
| ------------------ | ------------ | -------------- | --------- | --------- |
| Bundle size        | ~2KB         | ~69KB          | ~16KB     | ~2KB      |
| Dependencies       | 0            | 0              | 0         | 0         |
| TypeScript         | ✅            | ❌              | ✅         | ✅         |
| Tree-shakeable     | ✅            | ❌              | ✅         | ❌         |
| Active maintenance | ✅            | ❌ (deprecated) | ✅         | ✅         |
| Performance        | Excellent    | Good           | Excellent | Very Good |

## License

[MIT LICENSE](LICENSE)
