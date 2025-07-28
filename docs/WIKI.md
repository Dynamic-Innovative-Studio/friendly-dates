# Welcome to the Friendly-Dates Wiki

**Friendly-Dates** is a lightweight, high-performance, and secure JavaScript library designed to format dates into human-friendly strings.

## Features

- Zero Dependencies
- High Performance by design
- Security Focused by design
- MIT Licensed

## API Reference

`formatDate(date: Date, options?: FormatOptions): string`

- **Parameters:**
  - `date`: The date to format.
  - `options` (optional): Formatting options.
- Returns:
  - A human-friendly formatted date string.
- FormatOptions Interface:
  - `locale` (string): Locale code, e.g., 'en-US'.
  - `relative` (boolean): Whether to use relative formatting.
  - `timeFormat` ('12h' | '24h'): Time format preference.

## How to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

### Code Style

- Use [Prettier](https://prettier.io/) for code formatting.

- Reporting Issues:
  - Use the [Issues](https://github.com/Dynamic-Innovative-Studio/friendly-dates/issues) tab to report bugs or request features.

## Getting Started

### NPM

```node
npm install friendly-dates
```

### Yarn

```node
yarn add friendly-dates
```

## Importing

```js
import { formatDate } from 'friendly-dates';
```

## Basic usage

```js
const formattedDate = formatDate(new Date());
console.log(formattedDate); // Outputs: 'Today at 2:00 PM'
```

## Q&A

**Q:** Does Friendly-Dates support time zones?
**A:** Currently, it uses the system's local time zone. Time zone support is planned for future releases.

---

**Q:** Can I customize the output format?
**A:** Yes, by providing options to the `formatDate` function.

## Usage

## Formatting Options

- **Relative Dates:** 'Today', 'Yesterday', '2 days ago'
- **Time Formats:** 12-hour, 24-hour
- **Custom Formats:** Define your own date formats

**Examples:**

```js
formatDate(new Date('2025-05-10T14:00:00')); // 'Today at 2:00 PM'
```
