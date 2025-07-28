/**
 * @file FRIENDLY-DATES.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description main module for friendly-dates
 * Formats dates into human-friendly strings
 * with support for i18n, accessibility, and more
 *
 * @since 2025-05-10
 * @updated 2025-07-25
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { FormatOptions, FormatPreset, LocaleConfig, TimeUnit } from './types';
import { enUS } from './locales/en-US';

// ------------ DEFAULT OPTIONS
/**
 * Default format options
 */
const DEFAULT_OPTIONS: FormatOptions = {
  locale: enUS,
  includeTime: true,
  timeFormat: '12h',
  maxUnit: 'year',
  justNowThreshold: 30,
  useWords: true,
  fuzzyMatching: false,
  customThresholds: {},
  accessibility: false,
  relativeDateRanges: false,
};

// ------------ TIME UNITS
/**
 * Time units in seconds for calculations
 */
const TIME_UNITS: Record<TimeUnit, number> = {
  // 1 Millisecond
  millisecond: 0.001,

  // 1 Second
  second: 1,

  // 1 Minute
  minute: 60,

  // 1 Hour
  hour: 3600,

  // 1 Day
  day: 86400,

  // 1 Week
  week: 604800,

  // 30 days
  month: 2592000,

  // 3 months
  quarter: 7776000,

  // 365 days
  year: 31536000,

  // 10 years
  decade: 315360000,
};

// ------------ HELPER FUNCTIONS

/**
 * Get numeric value with appropriate formatting
 * @param n Number to format
 * @param useWords Whether to use words for small numbers
 * @param locale Optional locale configuration for number formatting
 * @returns Formatted number
 */
function getNumeric(n: number, useWords: boolean, locale?: LocaleConfig): string {
  if (!useWords) {
    return locale ? formatNumber(n, locale) : n.toString();
  }

  switch (n) {
    case 1:
      return 'a';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    case 10:
      return 'ten';
    default:
      return locale ? formatNumber(n, locale) : n.toString();
  }
}

/**
 * Format a time string based on the provided options
 * @param date Date to format
 * @param options Formatting options
 * @returns Formatted time string
 */
function formatTime(date: Date, options: FormatOptions): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format minutes with leading zero
  const paddedMinutes = minutes.toString().padStart(2, '0');

  if (options.timeFormat === '24h') {
    return `${String(hours)}:${paddedMinutes}`;
  } else {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${String(displayHours)}:${paddedMinutes} ${period}`;
  }
}

/**
 * Check if two dates are on the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if dates are on the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if a date is in the current week
 * @param date Date to check
 * @param reference Reference date
 * @returns True if date is in current week
 */
function isThisWeek(date: Date, reference: Date): boolean {
  const startOfWeek = new Date(reference);
  startOfWeek.setDate(reference.getDate() - reference.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
}

/**
 * Check if a date is in the current month
 * @param date Date to check
 * @param reference Reference date
 * @returns True if date is in current month
 */
function isThisMonth(date: Date, reference: Date): boolean {
  return date.getMonth() === reference.getMonth() &&
         date.getFullYear() === reference.getFullYear();
}

/**
 * Check if a date is in the current year
 * @param date Date to check
 * @param reference Reference date
 * @returns True if date is in current year
 */
function isThisYear(date: Date, reference: Date): boolean {
  return date.getFullYear() === reference.getFullYear();
}

/**
 * Get relative date range description
 * @param date Target date
 * @param reference Reference date
 * @param locale Locale configuration
 * @returns Relative date range string or null if not applicable
 */
function getRelativeDateRange(date: Date, reference: Date, locale: LocaleConfig): string | null {
  // Check for this/last/next week
  if (isThisWeek(date, reference)) {
    return locale.relative.thisWeek;
  }

  const lastWeekStart = new Date(reference);
  lastWeekStart.setDate(reference.getDate() - reference.getDay() - 7);
  lastWeekStart.setHours(0, 0, 0, 0);
  const lastWeekEnd = new Date(lastWeekStart);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
  lastWeekEnd.setHours(23, 59, 59, 999);

  if (date >= lastWeekStart && date <= lastWeekEnd) {
    return locale.relative.lastWeek;
  }

  const nextWeekStart = new Date(reference);
  nextWeekStart.setDate(reference.getDate() - reference.getDay() + 7);
  nextWeekStart.setHours(0, 0, 0, 0);
  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
  nextWeekEnd.setHours(23, 59, 59, 999);

  if (date >= nextWeekStart && date <= nextWeekEnd) {
    return locale.relative.nextWeek;
  }

  // Check for this/last/next month
  if (isThisMonth(date, reference)) {
    return locale.relative.thisMonth;
  }

  const lastMonth = new Date(reference);
  lastMonth.setMonth(reference.getMonth() - 1);
  if (isThisMonth(date, lastMonth)) {
    return locale.relative.lastMonth;
  }

  const nextMonth = new Date(reference);
  nextMonth.setMonth(reference.getMonth() + 1);
  if (isThisMonth(date, nextMonth)) {
    return locale.relative.nextMonth;
  }

  // Check for this/last/next year
  if (isThisYear(date, reference)) {
    return locale.relative.thisYear;
  }

  if (date.getFullYear() === reference.getFullYear() - 1) {
    return locale.relative.lastYear;
  }

  if (date.getFullYear() === reference.getFullYear() + 1) {
    return locale.relative.nextYear;
  }

  return null;
}

/**
 * Format text with RTL support
 * @param text Text to format
 * @param locale Locale configuration
 * @returns Formatted text with RTL markers if needed
 */
function formatWithRTL(text: string, locale: LocaleConfig): string {
  if (locale.direction === 'rtl') {
    // Add RTL markers for proper text direction
    return `\u202B${text}\u202C`; // RLE (Right-to-Left Embedding) + PDF (Pop Directional Formatting)
  }
  return text;
}

/**
 * Format text with accessibility features
 * @param text Text to format
 * @param targetDate Target date for semantic markup
 * @param options Format options
 * @returns Accessibility text
 */
function formatWithAccessibility(text: string, targetDate: Date, options: FormatOptions): string {
  if (!options.accessibility) {
    return text;
  }

  // Add semantic markup for screen readers
  const timestamp = targetDate.toISOString();

  // Create verbose description for screen readers
  const verboseText = text.replace(/\d+/, (match) => {
    const num = parseInt(match);
    if (num === 1) {return 'one';}
    if (num === 2) {return 'two';}
    if (num === 3) {return 'three';}
    return match;
  });

  // Wrap in time element with machine-readable datetime
  return `<time datetime="${timestamp}" aria-label="${verboseText}">${text}</time>`;
}

/**
 * Format numbers according to locale
 * @param num Number to format
 * @param locale Locale configuration
 * @returns Formatted number string
 */
function formatNumber(num: number, locale: LocaleConfig): string {
  if (!locale.numberFormat) {
    return num.toString();
  }

  const { thousandsSeparator, decimalSeparator } = locale.numberFormat;
  const parts = num.toString().split('.');

  // Add thousands separators
  if (parts[0] !== undefined && parts[0] !== '') {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }

  // Join with decimal separator if there's a decimal part
  return parts.join(decimalSeparator);
}

/**
 * Apply fuzzy matching to time values
 * @param value Original time value
 * @param unit Time unit
 * @returns Fuzzy matched value or original value
 */
function applyFuzzyMatching(value: number, unit: TimeUnit): number {
  // Apply fuzzy matching for larger time units
  if (unit === 'minute' && value >= 2 && value <= 5) {
    return Math.round(value / 5) * 5; // Round to nearest 5 minutes
  }

  if (unit === 'hour' && value >= 2 && value <= 12) {
    return Math.round(value / 2) * 2; // Round to nearest 2 hours
  }

  if (unit === 'day' && value >= 2 && value <= 7) {
    return Math.round(value); // Round to nearest day
  }

  if (unit === 'week' && value >= 2 && value <= 4) {
    return Math.round(value); // Round to nearest week
  }

  if (unit === 'month' && value >= 2 && value <= 6) {
    return Math.round(value); // Round to nearest month
  }

  return value;
}

/**
 * Format presets for common use cases
 */
const FORMAT_PRESETS: Record<FormatPreset, Partial<FormatOptions>> = {
  social: {
    includeTime: false,
    useWords: true,
    fuzzyMatching: true,
    relativeDateRanges: true,
    justNowThreshold: 30,
    maxUnit: 'week',
  },
  formal: {
    includeTime: true,
    useWords: false,
    fuzzyMatching: false,
    relativeDateRanges: false,
    timeFormat: '24h',
    justNowThreshold: 5,
  },
  compact: {
    includeTime: false,
    useWords: false,
    fuzzyMatching: false,
    relativeDateRanges: false,
    justNowThreshold: 0,
    maxUnit: 'day',
  },
  accessibility: {
    includeTime: true,
    useWords: true,
    fuzzyMatching: false,
    relativeDateRanges: true,
    accessibility: true,
    justNowThreshold: 10,
  },
};

/**
 * Apply format preset to options
 * @param preset Preset name
 * @param options Existing options
 * @returns Merged options with preset applied
 */
function applyFormatPreset(preset: FormatPreset, options: Partial<FormatOptions>): Partial<FormatOptions> {
  const presetOptions = FORMAT_PRESETS[preset];
  return { ...presetOptions, ...options }; // User options override preset
}

/**
 * Get the threshold for a specific time unit
 * @param unit Time unit
 * @param customThresholds Custom thresholds configuration
 * @returns Threshold value in seconds
 */
function getUnitThreshold(unit: TimeUnit, customThresholds: Partial<Record<TimeUnit, number>>): number {
  if (customThresholds[unit] !== undefined) {
    return customThresholds[unit];
  }

  // Default thresholds
  const defaultThresholds: Record<TimeUnit, number> = {
    millisecond: 0.001,
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2629746, // Average month
    quarter: 7889238, // 3 months
    year: 31556952, // Average year
    decade: 315569520, // 10 years
  };

  return defaultThresholds[unit];
}

/**
 * Format a date into a human-friendly string with type safety
 * @param date Date to format (Date object, ISO string, or timestamp)
 * @param referenceDate Reference date to calculate relative time from (defaults to now)
 * @param options Formatting options
 * @returns Human-friendly formatted date string
 */
export function format(
  date: Date | string | number,
  referenceDate: Date | string | number = new Date(),
  options: Partial<FormatOptions> = {},
): string {
  // Runtime validation if enabled
  if (typeof window !== 'undefined' || typeof global !== 'undefined') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const validationModule = require('./validation') as { validateInputs: (date: unknown, options?: unknown) => void };
      validationModule.validateInputs(date, options);
    } catch (_error) {
      // Validation module not available or validation failed, continue without validation (nothing)
    }
  }
  // Additional validation for malformed inputs
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (date === null || date === undefined || referenceDate === null || referenceDate === undefined) {
    throw new Error('Invalid date provided');
  }

  // Check for Date objects
  const targetDate = date instanceof Date ? date : new Date(date);
  const reference =
    referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

  // Validate input dates
  if (isNaN(targetDate.getTime()) || isNaN(reference.getTime())) {
    throw new Error('Invalid date provided');
  }

  // Additional validation for edge cases that JavaScript Date constructor accepts but shouldn't
  if (typeof date === 'string' && date.includes('-')) {
    // For date strings like '2024-02-30', check if the parsed date matches the input
    const parts = date.split('-');
    if (
      parts.length === 3 &&
      parts[0] !== undefined && parts[0] !== '' &&
      parts[1] !== undefined && parts[1] !== '' &&
      parts[2] !== undefined && parts[2] !== ''
    ) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const day = parseInt(parts[2]);

      // Check if the parsed date has the same year, month, and day as the input
      if (targetDate.getFullYear() !== year ||
          targetDate.getMonth() + 1 !== month ||
          targetDate.getDate() !== day) {
        throw new Error('Invalid date provided');
      }
    }
  }

  // Apply preset if specified
  let processedOptions = options;
  if (options.preset) {
    processedOptions = applyFormatPreset(options.preset, options);
  }

  // Merge default options with provided options
  const fullOptions: FormatOptions = {
    ...DEFAULT_OPTIONS,
    ...processedOptions,
    customThresholds: {
      ...DEFAULT_OPTIONS.customThresholds,
      ...processedOptions.customThresholds,
    },
  };

  const { locale, includeTime, justNowThreshold, useWords, relativeDateRanges, fuzzyMatching, customThresholds } = fullOptions;

  // Calculate time difference in seconds
  const diffMs = targetDate.getTime() - reference.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const isInPast = diffSeconds < 0;
  const absoluteDiffSeconds = Math.abs(diffSeconds);

  // Check if the time difference is within the "just now" threshold
  if (absoluteDiffSeconds < justNowThreshold) {
    const result = formatWithRTL(locale.relative.just, locale);
    return formatWithAccessibility(result, targetDate, fullOptions);
  }

  // Handle milliseconds for very precise timing
  if (absoluteDiffSeconds < 1 && fullOptions.maxUnit === 'millisecond') {
    const milliseconds = Math.round(Math.abs(diffMs));
    const unit = milliseconds === 1 ? locale.units.millisecond : locale.unitsPlural.millisecond;
    const result = isInPast
      ? `${getNumeric(milliseconds, useWords, locale)} ${unit} ${locale.relative.past}`
      : `${locale.relative.future} ${getNumeric(milliseconds, useWords, locale)} ${unit}`;
    return formatWithRTL(result, locale);
  }

  // Create a new date object for today, yesterday, and tomorrow comparisons
  const today = new Date(reference);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const targetDay = new Date(targetDate);
  targetDay.setHours(0, 0, 0, 0);

  // Handle special cases: yesterday, today, tomorrow
  if (isSameDay(targetDay, yesterday)) {
    if (includeTime) {
      return `${locale.relative.yesterday} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
    }
    return locale.relative.yesterday;
  }

  if (isSameDay(targetDay, today)) {
    // For today, use relative time based on hours/minutes
    if (absoluteDiffSeconds < 60) {
      const unit =
        absoluteDiffSeconds === 1
          ? locale.units.second
          : locale.unitsPlural.second;
      const result = isInPast
        ? `${getNumeric(absoluteDiffSeconds, useWords, locale)} ${unit} ${locale.relative.past}`
        : `${locale.relative.future} ${getNumeric(absoluteDiffSeconds, useWords, locale)} ${unit}`;
      const rtlResult = formatWithRTL(result, locale);
      return formatWithAccessibility(rtlResult, targetDate, fullOptions);
    }

    const hourThreshold = getUnitThreshold('hour', customThresholds ?? {});
    if (absoluteDiffSeconds < hourThreshold) {
      let minutes = Math.round(absoluteDiffSeconds / 60);
      if (fuzzyMatching) {
        minutes = applyFuzzyMatching(minutes, 'minute');
      }
      const unit =
        minutes === 1 ? locale.units.minute : locale.unitsPlural.minute;
      const prefix = fuzzyMatching && minutes > 1 ? locale.relative.about : '';
      const result = isInPast
        ? `${prefix} ${getNumeric(minutes, useWords, locale)} ${unit} ${locale.relative.past}`.trim()
        : `${locale.relative.future} ${prefix} ${getNumeric(minutes, useWords, locale)} ${unit}`.trim();
      const rtlResult = formatWithRTL(result, locale);
      return formatWithAccessibility(rtlResult, targetDate, fullOptions);
    }

    let hours = Math.round(absoluteDiffSeconds / 3600);
    if (fuzzyMatching) {
      hours = applyFuzzyMatching(hours, 'hour');
    }
    const unit = hours === 1 ? locale.units.hour : locale.unitsPlural.hour;
    const prefix = fuzzyMatching && hours >= 1 ? locale.relative.about : '';

    let result: string;
    if (includeTime) {
      // For formal preset or when time is requested, include the actual time
      const timeStr = formatTime(targetDate, fullOptions);
      result = isInPast
        ? `${prefix} ${getNumeric(hours, useWords, locale)} ${unit} ${locale.relative.past} ${locale.relative.at} ${timeStr}`.trim()
        : `${locale.relative.future} ${prefix} ${getNumeric(hours, useWords, locale)} ${unit} ${locale.relative.at} ${timeStr}`.trim();
    } else {
      result = isInPast
        ? `${prefix} ${getNumeric(hours, useWords, locale)} ${unit} ${locale.relative.past}`.trim()
        : `${locale.relative.future} ${prefix} ${getNumeric(hours, useWords, locale)} ${unit}`.trim();
    }

    const rtlResult = formatWithRTL(result, locale);
    return formatWithAccessibility(rtlResult, targetDate, fullOptions);
  }

  // Check for relative date ranges if enabled (before specific day checks)
  if (relativeDateRanges) {
    const relativeDateRange = getRelativeDateRange(targetDate, reference, locale);
    if (relativeDateRange !== null) {
      if (includeTime) {
        return `${relativeDateRange} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
      }
      return relativeDateRange;
    }
  }

  if (isSameDay(targetDay, tomorrow)) {
    if (includeTime) {
      return `${locale.relative.tomorrow} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
    }
    return locale.relative.tomorrow;
  }

  // Check if dates are within the same week
  const dayDiff = Math.round(
    Math.abs(targetDay.getTime() - today.getTime()) / TIME_UNITS.day / 1000,
  );

  if (dayDiff < 7) {
    const targetDayOfWeek = targetDate.getDay();
    const dayName = locale.days.long[targetDayOfWeek];

    if (dayName !== undefined) {
      if (isInPast) {
        if (includeTime) {
          return `${String(locale.relative.previous)} ${dayName} ${String(locale.relative.at)} ${formatTime(targetDate, fullOptions)}`;
        }
        return `${String(locale.relative.previous)} ${dayName}`;
      } else {
        if (includeTime) {
          return `${String(locale.relative.next)} ${dayName} ${String(locale.relative.at)} ${formatTime(targetDate, fullOptions)}`;
        }
        return `${String(locale.relative.next)} ${dayName}`;
      }
    }
  }

  /**
   * For dates beyond a week
   * Find appropriate unit based
   * on maxUnit and difference
   */
  const units: TimeUnit[] = [
    'decade',
    'year',
    'quarter',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
  ];
  const maxUnitIndex = units.indexOf(fullOptions.maxUnit);

  for (let i = maxUnitIndex; i < units.length; i++) {
    const unit = units[i];
    if (!unit) {
      continue;
    }

    const unitInSeconds = getUnitThreshold(unit, customThresholds ?? {});

    if (absoluteDiffSeconds >= unitInSeconds || i === units.length - 1) {
      let count = Math.round(absoluteDiffSeconds / unitInSeconds);
      if (fuzzyMatching) {
        count = applyFuzzyMatching(count, unit);
      }
      const unitName =
        count === 1 ? locale.units[unit] : locale.unitsPlural[unit];

      // For very long time periods (many years), use calendar format
      // For shorter periods (months, quarters, few years, decades), use relative format
      if (unit === 'year' && count > 5) {
        const monthName = locale.months.long[targetDate.getMonth()];
        if (monthName !== undefined) {
          if (includeTime) {
            return `${monthName} ${String(targetDate.getDate())}, ${String(targetDate.getFullYear())} ${String(locale.relative.at)} ${formatTime(targetDate, fullOptions)}`;
          }
          return `${monthName} ${String(targetDate.getDate())}, ${String(targetDate.getFullYear())}`;
        }
      }

      const prefix = fuzzyMatching && count > 1 ? locale.relative.about : '';
      const result = isInPast
        ? `${prefix} ${getNumeric(count, useWords, locale)} ${unitName} ${locale.relative.past}`.trim()
        : `${locale.relative.future} ${prefix} ${getNumeric(count, useWords, locale)} ${unitName}`.trim();
      const rtlResult = formatWithRTL(result, locale);
      return formatWithAccessibility(rtlResult, targetDate, fullOptions);
    }
  }

  // Fallback for any other case
  return targetDate.toLocaleDateString();
}

// ------------ EXPORT DEFAULT
export default format;
