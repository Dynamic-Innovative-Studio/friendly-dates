# 📆 Friendly-Dates

[![Dynamic Innovative Studio](public/icons/DIS_Original_logo.png)](https://dynamic-innovative-studio.web.app)
[![Friendly Dates](public/icons/friendly-dates-logo.png)](https://github.com/Dynamic-Innovative-Studio/friendly-dates)
[![CI](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/ci.yaml/badge.svg)](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/ci.yaml)
[![Code Quality](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/code-quality.yaml/badge.svg)](https://github.com/Dynamic-Innovative-Studio/friendly-dates/actions/workflows/code-quality.yaml)
[![npm version](https://img.shields.io/npm/v/@dynamic-innovative-studio/friendly-dates.svg)](https://www.npmjs.com/package/@dynamic-innovative-studio/friendly-dates)
[![license](https://img.shields.io/npm/l/@dynamic-innovative-studio/friendly-dates.svg)](https://github.com/Dynamic-Innovative-Studio/friendly-dates/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@dynamic-innovative-studio/friendly-dates)](https://bundlephobia.com/package/@dynamic-innovative-studio/friendly-dates)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A fast, secure, tiny, fully-typed and i18n-ready date formatting library by **Dynamic Innovative Studio**.

---

## ✨ Features

* 🔥 **Tiny footprint** – Less than 2KB min+gzip
* 🚀 **Zero dependencies** – Lean and efficient
* 🛡️ **Type-safe** – Written in strict TypeScript
* 🌍 **i18n support** – 8+ built-in locales + custom locales
* ⚡ **High performance** – Optimized for speed and memory
* 📦 **Tree-shakeable** – Only import what you need
* 🧪 **Battle-tested** – High test coverage

---

## 📦 Installation

```bash
npm install @dynamic-innovative-studio/friendly-dates
# or
yarn add @dynamic-innovative-studio/friendly-dates
# or
pnpm add @dynamic-innovative-studio/friendly-dates
```

---

## 🔧 Usage

### Basic

```ts
import format from '@dynamic-innovative-studio/friendly-dates';

format(new Date()); // "Just now"
format(new Date(Date.now() - 5 * 60 * 1000)); // "5 minutes ago"
```

### Reference Date Support

```ts
format(new Date('2023-10-14T15:30:00Z'), new Date('2023-10-15T12:00:00Z'));
// => "Yesterday at 3:30 PM"
```

### With Options

```ts
import format, { ptPT } from '@dynamic-innovative-studio/friendly-dates';

format(new Date(), undefined, { locale: ptPT });
format(new Date(), undefined, { timeFormat: '24h', includeTime: false });
format(new Date(Date.now() - 20_000), undefined, { justNowThreshold: 10 });
```

### Custom Locale

```ts
import { format, LocaleConfig } from '@dynamic-innovative-studio/friendly-dates';

const esES: LocaleConfig = { ... };

format(new Date(), undefined, { locale: esES });
```

---

## 📚 API Reference

### `format(date, referenceDate?, options?)`

#### Parameters

* `date`: Date | string | number — Input date
* `referenceDate?`: Date — Optional reference to compare from
* `options?`: Object

#### Options

| Option             | Type         | Default  | Description                    |                   |
| ------------------ | ------------ | -------- | ------------------------------ | ----------------- |
| `locale`           | LocaleConfig | `enUS`   | Internationalization config    |                   |
| `includeTime`      | boolean      | `true`   | Show time component            |                   |
| `timeFormat`       | \`'12h'      | '24h'\`  | `'12h'`                        | Time format style |
| `maxUnit`          | string       | `'year'` | Max unit: second → year        |                   |
| `justNowThreshold` | number       | `30`     | Seconds to consider "just now" |                   |
| `useWords`         | boolean      | `true`   | Use words or numbers           |                   |

---

## 🌐 i18n Support

* ✅ Built-in:
  * `brBR`,
  * `enUS`,
  * `esES`,
  * `frFR`,
  * `ptPT`,
* ✅ Easy to extend with `LocaleConfig`

---

## 🌍 Browser & Runtime Support

* Modern Browsers: ✅ Chrome, Firefox, Safari, Edge
* Node.js: ✅ 18+
* ES2020+ support

---

## 🛠️ Development

```bash
git clone https://github.com/Dynamic-Innovative-Studio/friendly-dates.git
cd friendly-dates
npm install
npm run dev
```

### Scripts

| Command            | Description         |
| ------------------ | ------------------- |
| `dev`              | Watch mode build    |
| `build`            | Production bundle   |
| `test`             | Run tests           |
| `test:coverage`    | Coverage reports    |
| `test:performance` | Perf benchmarks     |
| `lint`             | Lint source code    |
| `lint:fix`         | Auto-fix issues     |
| `type-check`       | Type safety         |
| `format`           | Prettier formatting |

---

## 🔁 CI/CD Pipeline

Using **GitHub Actions**:

* ✅ Node 18, 20, 22 testing
* ✅ Lint & Type Check
* ✅ Coverage reports
* ✅ Bundle size analysis
* ✅ Automated releases
* ✅ Dependency scanning

---

## ⚖️ Comparison

| Feature            | Friendly-Dates | moment.js  | date-fns  | dayjs | luxon  | intl-relativeformat |
| ------------------ | -------------- | ---------- | --------- | ----- | ------ | ------------------- |
| Bundle Size (gzip) | \~2KB          | \~69KB     | \~16KB    | \~2KB | \~24KB | \~7KB               |
| Dependencies       | ❌              | ❌          | ❌         | ❌     | ❌      | ✅ (polyfill needed) |
| TypeScript Support | ✅              | ❌          | ✅         | ✅     | ✅      | ❌                   |
| Tree-shakeable     | ✅              | ❌          | ✅         | ❌     | ✅      | ❌                   |
| i18n Customization | ✅              | ⚠️ Partial | ⚠️ Custom | ⚠️    | ✅      | ✅                   |
| Maintenance Status | ✅              | ❌          | ✅         | ✅     | ✅      | ❌                   |
| Performance        | 🚀 Ultra Fast  | 🐢 Slow    | 🚀 Fast   | 🚀    | ⚡      | ⚠️ Mediocre         |

---

## 🧾 License

[MIT License](LICENSE)

---

> Made with 💡 by [Dynamic Innovative Studio](https://dynamic-innovative-studio.web.app)
