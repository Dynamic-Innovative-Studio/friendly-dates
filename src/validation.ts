/**
 * @file VALIDATION.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Runtime validation utilities for friendly-dates
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires TimeUnit from friendly-dates
 * @requires LocaleValidationResult from types
 * @requires ValidationResult from types
 * @requires isValidLocale from types
 * @requires isValidTimeUnit from types
 *
 * @exports validateLocale
 * @exports validateFormatOptions
 * @exports validateDate
 * @exports validateInputs
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleValidationResult, TimeUnit, ValidationResult, isValidLocale, isValidTimeUnit } from './types';

// ------------ VALIDATION VARS
/**
 * Required locale keys for validation
 */
const REQUIRED_TIME_UNITS = [
  'millisecond', 'second', 'minute', 'hour', 'day',
  'week', 'month', 'quarter', 'year', 'decade',
] as const;

/**
 * Required relative keys for validation
 */
const REQUIRED_RELATIVE_KEYS = ['just', 'past', 'future', 'about'] as const;

// ------------ VALIDATION FUNCTIONS
/**
 * Validate a locale configuration
 * @param locale Locale to validate
 * @returns Validation result with detailed information
 */
export function validateLocale(locale: unknown): LocaleValidationResult {
  const result: LocaleValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    missingKeys: [],
    extraKeys: [],
    localeId: (locale !== null && typeof locale === 'object' && 'id' in locale && typeof locale.id === 'string') ? locale.id : 'unknown',
  };

  // Type guard for locale object
  const localeObj = locale as Record<string, unknown>;

  // Basic structure validation
  if (!isValidLocale(locale)) {
    result.isValid = false;
    result.errors.push('Invalid locale structure');
    return result;
  }

  // Validate required properties
  if (localeObj['id'] === undefined || localeObj['id'] === null || typeof localeObj['id'] !== 'string') {
    result.errors.push('Missing or invalid locale id');
    result.isValid = false;
  }

  if (localeObj['name'] === undefined || localeObj['name'] === null || typeof localeObj['name'] !== 'string') {
    result.errors.push('Missing or invalid locale name');
    result.isValid = false;
  }

  // Validate direction
  if (localeObj['direction'] !== undefined && localeObj['direction'] !== null && !['ltr', 'rtl'].includes(localeObj['direction'] as string)) {
    result.errors.push('Invalid text direction, should be "ltr" or "rtl"');
    result.isValid = false;
  }

  // Validate units structure (our current structure has units.{timeUnit} and unitsPlural.{timeUnit})
  if (localeObj['units'] === undefined || localeObj['units'] === null || typeof localeObj['units'] !== 'object') {
    result.errors.push('Missing or invalid units object');
    result.isValid = false;
  } else {
    const unitsObj = localeObj['units'] as Record<string, unknown>;
    for (const unit of REQUIRED_TIME_UNITS) {
      const unitValue = unitsObj[unit];
      if (unitValue === undefined || unitValue === null || typeof unitValue !== 'string') {
        result.missingKeys.push(`units.${unit}`);
        result.isValid = false;
      } else if ((unitValue).trim() === '') {
        result.errors.push(`units.${unit} cannot be empty`);
        result.isValid = false;
      }
    }
  }

  // Validate unitsPlural structure
  if (localeObj['unitsPlural'] === undefined || localeObj['unitsPlural'] === null || typeof localeObj['unitsPlural'] !== 'object') {
    result.errors.push('Missing or invalid unitsPlural object');
    result.isValid = false;
  } else {
    const unitsPluralObj = localeObj['unitsPlural'] as Record<string, unknown>;
    for (const unit of REQUIRED_TIME_UNITS) {
      const unitValue = unitsPluralObj[unit];
      if (unitValue === undefined || unitValue === null || typeof unitValue !== 'string') {
        result.missingKeys.push(`unitsPlural.${unit}`);
        result.isValid = false;
      } else if ((unitValue).trim() === '') {
        result.errors.push(`unitsPlural.${unit} cannot be empty`);
        result.isValid = false;
      }
    }
  }

  // Validate relative keys
  if (localeObj['relative'] === undefined || localeObj['relative'] === null || typeof localeObj['relative'] !== 'object') {
    result.errors.push('Missing or invalid relative object');
    result.isValid = false;
  } else {
    const relativeObj = localeObj['relative'] as Record<string, unknown>;
    for (const key of REQUIRED_RELATIVE_KEYS) {
      if (relativeObj[key] === undefined || relativeObj[key] === null || typeof relativeObj[key] !== 'string') {
        result.missingKeys.push(`relative.${key}`);
        result.isValid = false;
      } else if ((relativeObj[key]).trim() === '') {
        result.errors.push(`relative.${key} cannot be empty`);
        result.isValid = false;
      }
    }
  }

  // Validate number format if present
  if (locale.numberFormat) {
    if (typeof locale.numberFormat !== 'object') {
      result.warnings.push('Invalid numberFormat object');
    } else {
      if (typeof locale.numberFormat.thousandsSeparator !== 'string') {
        result.warnings.push('Invalid thousandsSeparator in numberFormat');
      }
      if (typeof locale.numberFormat.decimalSeparator !== 'string') {
        result.warnings.push('Invalid decimalSeparator in numberFormat');
      }
    }
  }

  return result;
}

/**
 * Validate format options
 * @param options Options to validate
 * @returns Validation result
 */
export function validateFormatOptions(options: unknown): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  if (typeof options !== 'object' || options === null) {
    result.errors.push('Options must be an object');
    result.isValid = false;
    return result;
  }

  // Type guard to ensure options is an object
  const opts = options as Record<string, unknown>;

  // Validate locale if provided
  if (opts['locale'] !== undefined && opts['locale'] !== null && !isValidLocale(opts['locale'])) {
    result.errors.push('Invalid locale configuration');
    result.isValid = false;
  }

  // Validate timeFormat
  if (opts['timeFormat'] !== undefined && opts['timeFormat'] !== null && !['12h', '24h'].includes(opts['timeFormat'] as string)) {
    result.errors.push('timeFormat must be "12h" or "24h"');
    result.isValid = false;
  }

  // Validate maxUnit
  if (opts['maxUnit'] !== undefined && opts['maxUnit'] !== null && !isValidTimeUnit(opts['maxUnit'] as string)) {
    result.errors.push('Invalid maxUnit');
    result.isValid = false;
  }

  // Validate justNowThreshold
  if (opts['justNowThreshold'] !== undefined) {
    if (typeof opts['justNowThreshold'] !== 'number' || opts['justNowThreshold'] < 0) {
      result.errors.push('justNowThreshold must be a non-negative number');
      result.isValid = false;
    }
  }

  // Validate boolean options
  const booleanOptions = ['includeTime', 'useWords', 'fuzzyMatching', 'accessibility', 'relativeDateRanges'];
  for (const option of booleanOptions) {
    if (opts[option] !== undefined && typeof opts[option] !== 'boolean') {
      result.warnings.push(`${option} should be a boolean`);
    }
  }

  // Validate customThresholds
  if (opts['customThresholds'] !== undefined && opts['customThresholds'] !== null) {
    if (typeof opts['customThresholds'] !== 'object') {
      result.errors.push('customThresholds must be an object');
      result.isValid = false;
    } else {
      for (const [unit, threshold] of Object.entries(opts['customThresholds'] as Record<string, unknown>)) {
        if (!isValidTimeUnit(unit as TimeUnit)) {
          result.warnings.push(`Invalid time unit in customThresholds: ${unit}`);
        }
        if (typeof threshold !== 'number' || threshold < 0) {
          result.warnings.push(`Invalid threshold value for ${unit}: must be a non-negative number`);
        }
      }
    }
  }

  // Validate preset
  if (opts['preset'] !== undefined && opts['preset'] !== null && !['social', 'formal', 'compact', 'accessibility'].includes(opts['preset'] as string)) {
    result.errors.push('Invalid preset value');
    result.isValid = false;
  }

  return result;
}

/**
 * Validate a date input
 * @param date Date to validate
 * @returns Validation result
 */
export function validateDate(date: unknown): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
  };

  if (date === null || date === undefined) {
    result.errors.push('Date cannot be null or undefined');
    result.isValid = false;
    return result;
  }

  let parsedDate: Date;

  try {
    if (date instanceof Date) {
      parsedDate = date;
    } else if (typeof date === 'string' || typeof date === 'number') {
      parsedDate = new Date(date);
    } else {
      result.errors.push('Date must be a Date object, string, or number');
      result.isValid = false;
      return result;
    }

    if (isNaN(parsedDate.getTime())) {
      result.errors.push('Invalid date value');
      result.isValid = false;
    }

    // Check for reasonable date range (1900-2100)
    const year = parsedDate.getFullYear();
    if (year < 1900 || year > 2100) {
      result.warnings.push('Date is outside reasonable range (1900-2100)');
    }

  } catch (error) {
    result.errors.push(`Date parsing error: ${String(error)}`);
    result.isValid = false;
  }

  return result;
}

/**
 * Enable runtime validation globally
 */
let runtimeValidationEnabled = false;

/**
 * Enable or disable runtime validation
 * @param enabled Whether to enable validation
 */
export function setRuntimeValidation(enabled: boolean): void {
  runtimeValidationEnabled = enabled;
}

/**
 * Check if runtime validation is enabled
 * @returns True if validation is enabled
 */
export function isRuntimeValidationEnabled(): boolean {
  return runtimeValidationEnabled;
}

/**
 * Validate inputs with runtime validation if enabled
 * @param date Date to validate
 * @param options Options to validate
 * @throws Error if validation fails and runtime validation is enabled
 */
export function validateInputs(date: unknown, options?: unknown): void {
  if (!runtimeValidationEnabled) {
    return;
  }

  const dateValidation = validateDate(date);
  if (!dateValidation.isValid) {
    throw new Error(`Date validation failed: ${dateValidation.errors.join(', ')}`);
  }

  if (options !== null && options !== undefined) {
    const optionsValidation = validateFormatOptions(options);
    if (!optionsValidation.isValid) {
      throw new Error(`Options validation failed: ${optionsValidation.errors.join(', ')}`);
    }
  }
}
