/**
 * @file TYPES.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Type definitions for friendly-dates
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 * @requires FormatPreset from friendly-dates
 * @requires TimeUnit from friendly-dates
 *
 * @exports LocaleId
 * @exports RelativeTimeString
 * @exports StrictFormatOptions
 * @exports ValidationResult
 * @exports LocaleValidationResult
 * @exports FormatResult
 * @exports PerformanceMetrics
 * @exports AccessibilityOptions
 * @exports RTLOptions
 * @exports NumberFormatConfig
 * @exports ExtendedLocaleConfig
 * @exports LocaleKeys
 * @exports FormatFunction
 * @exports IsValidLocale
 * @exports IsValidTimeUnit
 *
 * @module friendly-dates
 */

// ------------ CORE TYPES
/**
 * Extended time units including new granular options
 */
export type TimeUnit =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade';

/**
 * Format preset types for common use cases
 */
export type FormatPreset = 'social' | 'formal' | 'compact' | 'accessibility';

/**
 * Locale configuration interface for i18n support
 */
export interface LocaleConfig {
  /** Locale identifier (e.g., 'en-US', 'pt-BR') */
  id: string;

  /** Display name of the locale */
  name: string;

  /** Text direction for RTL support */
  direction?: 'ltr' | 'rtl';

  /** Number formatting configuration */
  numberFormat?: {
    thousandsSeparator: string;
    decimalSeparator: string;
  };

  /** Time units in singular form */
  units: {
    millisecond: string;
    second: string;
    minute: string;
    hour: string;
    day: string;
    week: string;
    month: string;
    quarter: string;
    year: string;
    decade: string;
  };

  /** Time units in plural form */
  unitsPlural: {
    millisecond: string;
    second: string;
    minute: string;
    hour: string;
    day: string;
    week: string;
    month: string;
    quarter: string;
    year: string;
    decade: string;
  };

  /** Relative time phrases */
  relative: {
    just: string;
    past: string;
    future: string;
    yesterday: string;
    tomorrow: string;
    previous: string;
    next: string;
    at: string;
    about: string;
    thisWeek: string;
    lastWeek: string;
    nextWeek: string;
    thisMonth: string;
    lastMonth: string;
    nextMonth: string;
    thisYear: string;
    lastYear: string;
    nextYear: string;
  };

  /** Day names */
  days: {
    short: string[];
    long: string[];
  };

  /** Month names */
  months: {
    short: string[];
    long: string[];
  };
}

/**
 * Configuration options for formatting
 */
export interface FormatOptions {
  /** Locale to use for formatting */
  locale: LocaleConfig;

  /** Whether to include the time in the output */
  includeTime: boolean;

  /** Format for time display (12h or 24h) */
  timeFormat: '12h' | '24h';

  /** Maximum unit to use for relative formatting */
  maxUnit: TimeUnit;

  /** Threshold in seconds to consider "just now" */
  justNowThreshold: number;

  /** Whether to use words for small numbers or always use digits */
  useWords: boolean;

  /** Enable fuzzy matching for approximate times */
  fuzzyMatching: boolean;

  /** Custom thresholds for switching between units */
  customThresholds?: Partial<Record<TimeUnit, number>>;

  /** Format preset for common use cases */
  preset?: FormatPreset;

  /** Enable accessibility-friendly formatting */
  accessibility: boolean;

  /** Enable relative date ranges (this week, last month, etc.) */
  relativeDateRanges: boolean;
}

/**
 * Template literal type for locale IDs
 */
export type LocaleId =
  | 'en-US'
  | 'pt-BR'
  | 'es-ES'
  | 'fr-FR'
  | 'de-DE'
  | 'ar-SA'
  | `${string}-${string}`;

/**
 * Template literal type for relative time strings
 */
export type RelativeTimeString = string;

/**
 * Strict format options with better type safety
 */
export interface StrictFormatOptions {
  /** Locale to use for formatting */
  locale?: LocaleConfig;

  /** Whether to include the time in the output */
  includeTime?: boolean;

  /** Format for time display (12h or 24h) */
  timeFormat?: '12h' | '24h';

  /** Maximum unit to use for relative formatting */
  maxUnit?: TimeUnit;

  /** Threshold in seconds to consider "just now" */
  justNowThreshold?: number;

  /** Whether to use words for small numbers or always use digits */
  useWords?: boolean;

  /** Enable fuzzy matching for approximate times */
  fuzzyMatching?: boolean;

  /** Custom thresholds for switching between units */
  customThresholds?: Partial<Record<TimeUnit, number>>;

  /** Format preset for common use cases */
  preset?: FormatPreset;

  /** Enable accessibility-friendly formatting */
  accessibility?: boolean;

  /** Enable relative date ranges (this week, last month, etc.) */
  relativeDateRanges?: boolean;
}

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Locale validation result
 */
export interface LocaleValidationResult extends ValidationResult {
  missingKeys: string[];
  extraKeys: string[];
  localeId: string;
}

/**
 * Format result with metadata
 */
export interface FormatResult {
  /** The formatted string */
  formatted: string;

  /** The time unit used for formatting */
  unit: TimeUnit;

  /** The numeric value used */
  value: number;

  /** Whether the date is in the past */
  isPast: boolean;

  /** Whether fuzzy matching was applied */
  isFuzzy: boolean;

  /** The locale used for formatting */
  locale: LocaleConfig;
}

/**
 * Performance metrics for benchmarking
 */
export interface PerformanceMetrics {
  /** Execution time in milliseconds */
  executionTime: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Number of operations performed */
  operations: number;

  /** Operations per second */
  opsPerSecond: number;
}

/**
 * Accessibility options
 */
export interface AccessibilityOptions {
  /** Include ARIA labels */
  includeAriaLabels: boolean;

  /** Use screen reader friendly format */
  screenReaderFriendly: boolean;

  /** Include semantic markup */
  includeSemanticMarkup: boolean;

  /** Use verbose descriptions */
  verboseDescriptions: boolean;
}

/**
 * RTL (Right-to-Left) formatting options
 */
export interface RTLOptions {
  /** Force RTL direction */
  forceRTL: boolean;

  /** Use RTL-specific number formatting */
  rtlNumbers: boolean;

  /** Include direction markers */
  includeDirectionMarkers: boolean;
}

/**
 * Number formatting configuration
 */
export interface NumberFormatConfig {
  /** Thousands separator */
  thousandsSeparator: string;

  /** Decimal separator */
  decimalSeparator: string;

  /** Use locale-specific number formatting */
  useLocaleNumbers: boolean;
}

/**
 * Extended locale configuration with additional features
 */
export interface ExtendedLocaleConfig extends LocaleConfig {
  /** Accessibility options */
  accessibility?: AccessibilityOptions;

  /** RTL options */
  rtl?: RTLOptions;

  /** Extended number formatting */
  extendedNumberFormat?: NumberFormatConfig;

  /** Custom format patterns */
  customPatterns?: Record<string, string>;
}

/**
 * Utility type to extract locale keys
 */
export type LocaleKeys<T extends LocaleConfig> = keyof T['relative'];

/**
 * Utility type for format function overloads
 */
export type FormatFunction = (date: Date | string | number, referenceDate?: Date | string | number | StrictFormatOptions, options?: StrictFormatOptions) => RelativeTimeString;

/**
 * Type guard for checking if a value is a valid locale
 */
export function isValidLocale(value: unknown): value is LocaleConfig {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;
  return (
    typeof obj['id'] === 'string' &&
    typeof obj['name'] === 'string' &&
    typeof obj['units'] === 'object' &&
    typeof obj['unitsPlural'] === 'object' &&
    typeof obj['relative'] === 'object' &&
    Array.isArray((obj['days'] as Record<string, unknown> | undefined)?.['short']) &&
    Array.isArray((obj['days'] as Record<string, unknown> | undefined)?.['long']) &&
    Array.isArray((obj['months'] as Record<string, unknown> | undefined)?.['short']) &&
    Array.isArray((obj['months'] as Record<string, unknown> | undefined)?.['long'])
  );
}

/**
 * Type guard for checking if a value is a valid time unit
 */
export function isValidTimeUnit(value: unknown): value is TimeUnit {
  const validUnits: string[] = [
    'millisecond', 'second', 'minute', 'hour',
    'day', 'week', 'month', 'quarter', 'year', 'decade',
  ];
  return typeof value === 'string' && validUnits.includes(value);
}
