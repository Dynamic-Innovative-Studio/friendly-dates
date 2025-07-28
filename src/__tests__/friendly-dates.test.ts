/**
 * @file FRIENDLY-DATES.TEST.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Comprehensive suite tests for friendly-dates
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires brBR from index
 * @requires enUS from index
 * @requires esES from index
 * @requires format from index
 * @requires frFR from index
 * @requires validateDate from validation
 * @requires validateFormatOptions from validation
 * @requires validateLocale from validation
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { brBR, enUS, esES, format, frFR } from '../index';
import { validateDate, validateFormatOptions, validateLocale } from '../validation';

// ------------ TESTS
describe('friendly-dates', () => {
  const now = new Date('2024-01-15T12:00:00Z');

  describe('Basic functionality', () => {
    test('formats "just now" correctly', () => {
      const justNow = new Date(now.getTime() + 5000); // 5 seconds later
      expect(format(justNow, now)).toBe('Just now');
    });

    test('formats past times correctly', () => {
      const oneMinuteAgo = new Date(now.getTime() - 60000);
      expect(format(oneMinuteAgo, now)).toContain('minute ago');
    });

    test('formats future times correctly', () => {
      const oneHourLater = new Date(now.getTime() + 3600000);
      expect(format(oneHourLater, now)).toContain('in');
    });

    test('handles different date input formats', () => {
      const timestamp = now.getTime();
      const isoString = now.toISOString();

      expect(format(timestamp, now)).toBeDefined();
      expect(format(isoString, now)).toBeDefined();
      expect(format(now, now)).toBeDefined();
    });
  });

  describe('Locale support', () => {
    test('formats with English locale', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { locale: enUS });
      expect(result).toContain('hour');
    });

    test('formats with Portuguese locale', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { locale: brBR });
      expect(result).toContain('hora');
    });

    test('formats with Spanish locale', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { locale: esES });
      expect(result).toContain('hora');
    });

    test('formats with French locale', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { locale: frFR });
      expect(result).toContain('heure');
    });
  });

  describe('Time units', () => {
    test('handles milliseconds', () => {
      const halfSecondAgo = new Date(now.getTime() - 500);
      const result = format(halfSecondAgo, now, { maxUnit: 'millisecond', justNowThreshold: 0 });
      expect(result).toContain('millisecond');
    });

    test('handles seconds', () => {
      const fiveSecondsAgo = new Date(now.getTime() - 5000);
      const result = format(fiveSecondsAgo, now, { justNowThreshold: 0 });
      expect(result).toContain('second');
    });

    test('handles minutes', () => {
      const fiveMinutesAgo = new Date(now.getTime() - 300000);
      expect(format(fiveMinutesAgo, now)).toContain('minute');
    });

    test('handles hours', () => {
      const twoHoursAgo = new Date(now.getTime() - 7200000);
      expect(format(twoHoursAgo, now)).toContain('hour');
    });

    test('handles days', () => {
      const threeDaysAgo = new Date(now.getTime() - 259200000);
      expect(format(threeDaysAgo, now)).toContain('day');
    });

    test('handles weeks', () => {
      const twoWeeksAgo = new Date(now.getTime() - 1209600000);
      expect(format(twoWeeksAgo, now)).toContain('week');
    });

    test('handles months', () => {
      const twoMonthsAgo = new Date(now.getTime() - 5259600000);
      expect(format(twoMonthsAgo, now)).toContain('month');
    });

    test('handles quarters', () => {
      const oneQuarterAgo = new Date(now.getTime() - 7889238000);
      const result = format(oneQuarterAgo, now, { maxUnit: 'quarter' });
      expect(result).toContain('quarter');
    });

    test('handles years', () => {
      const twoYearsAgo = new Date(now.getTime() - 63113904000);
      expect(format(twoYearsAgo, now)).toContain('year');
    });

    test('handles decades', () => {
      const oneDecadeAgo = new Date(now.getTime() - 315569520000);
      const result = format(oneDecadeAgo, now, { maxUnit: 'decade' });
      expect(result).toContain('decade');
    });
  });

  describe('Format options', () => {
    test('includes time when requested', () => {
      const yesterday = new Date(now.getTime() - 86400000);
      const result = format(yesterday, now, { includeTime: true });
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    test('uses 24h time format', () => {
      const yesterday = new Date(now.getTime() - 86400000);
      const result = format(yesterday, now, { includeTime: true, timeFormat: '24h' });
      expect(result).not.toContain('AM');
      expect(result).not.toContain('PM');
    });

    test('uses words for small numbers', () => {
      const twoMinutesAgo = new Date(now.getTime() - 120000);
      const result = format(twoMinutesAgo, now, { useWords: true });
      expect(result).toContain('two');
    });

    test('respects maxUnit setting', () => {
      const twoYearsAgo = new Date(now.getTime() - 63113904000);
      const result = format(twoYearsAgo, now, { maxUnit: 'month' });
      expect(result).toContain('month');
      expect(result).not.toContain('year');
    });

    test('applies fuzzy matching', () => {
      const threeMinutesAgo = new Date(now.getTime() - 180000);
      const result = format(threeMinutesAgo, now, { fuzzyMatching: true });
      expect(result).toContain('about');
    });
  });

  describe('Format presets', () => {
    test('applies social preset', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { preset: 'social' });
      expect(result).toContain('about');
      expect(result).not.toMatch(/\d{1,2}:\d{2}/); // No time
    });

    test('applies formal preset', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { preset: 'formal' });
      expect(result).toMatch(/\d{1,2}:\d{2}/); // Includes time
      expect(result).not.toContain('about'); // No fuzzy matching
    });

    test('applies compact preset', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { preset: 'compact' });
      expect(result).not.toMatch(/\d{1,2}:\d{2}/); // No time
      expect(result).not.toContain('about'); // No fuzzy matching
    });

    test('applies accessibility preset', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { preset: 'accessibility' });
      expect(result).toContain('<time');
      expect(result).toContain('datetime');
      expect(result).toContain('aria-label');
    });
  });

  describe('Relative date ranges', () => {
    test('detects "this week"', () => {
      const thisWeek = new Date(now.getTime() + 86400000); // Tomorrow
      const result = format(thisWeek, now, { relativeDateRanges: true });
      expect(result).toContain('this week');
    });

    test('detects "last week"', () => {
      const lastWeek = new Date(now.getTime() - 604800000); // 7 days ago
      const result = format(lastWeek, now, { relativeDateRanges: true });
      expect(result).toContain('last week');
    });

    test('detects relative date ranges', () => {
      // Use a date that's a few days in the future
      const futureDate = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
      const result = format(futureDate, now, { relativeDateRanges: true });
      // Accept any relative date range as valid (this/next week, this/next month, etc.)
      expect(result).toMatch(/(this|next|last) (week|month)/);
    });
  });

  describe('Custom thresholds', () => {
    test('uses custom minute threshold', () => {
      const twoMinutesAgo = new Date(now.getTime() - 120000);
      const result = format(twoMinutesAgo, now, {
        customThresholds: { minute: 30 }, // 30 seconds threshold for minutes
      });
      expect(result).toContain('minute');
    });

    test('uses custom hour threshold', () => {
      const thirtyMinutesAgo = new Date(now.getTime() - 1800000);
      const result = format(thirtyMinutesAgo, now, {
        customThresholds: { hour: 1800 }, // 30 minutes threshold for hours
      });
      expect(result).toContain('hour');
    });
  });

  describe('Edge cases', () => {
    test('handles invalid dates', () => {
      expect(() => format('invalid-date', now)).toThrow();
    });

    test('handles very large time differences', () => {
      const veryOld = new Date('1900-01-01');
      const result = format(veryOld, now);
      expect(result).toBeDefined();
    });

    test('handles very small time differences', () => {
      const almostNow = new Date(now.getTime() + 1);
      const result = format(almostNow, now);
      expect(result).toBeDefined();
    });

    test('handles same date', () => {
      const result = format(now, now);
      expect(result).toBe('Just now');
    });
  });

  describe('Validation', () => {
    test('validates locale configuration', () => {
      const validation = validateLocale(enUS);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('detects invalid locale', () => {
      const invalidLocale = { id: 'invalid' };
      const validation = validateLocale(invalidLocale);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('validates format options', () => {
      const validation = validateFormatOptions({ includeTime: true });
      expect(validation.isValid).toBe(true);
    });

    test('validates date inputs', () => {
      const validation = validateDate(now);
      expect(validation.isValid).toBe(true);

      const invalidValidation = validateDate('invalid');
      expect(invalidValidation.isValid).toBe(false);
    });
  });
});
