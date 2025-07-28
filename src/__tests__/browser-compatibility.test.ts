/**
 * @file BROWSER-COMPATIBILITY.TEST.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Browser compatibility tests for friendly-dates
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 * @requires enUS from friendly-dates
 * @requires format from friendly-dates
 * @requires frFR from friendly-dates
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig, enUS, format, frFR } from '../index';

// ------------ TESTS
describe('Browser Compatibility', () => {
  const now = new Date('2024-01-15T12:00:00Z');

  describe('Date parsing compatibility', () => {
    test('handles ISO 8601 strings', () => {
      const isoString = '2024-01-15T11:00:00Z';
      expect(() => format(isoString, now, { locale: enUS })).not.toThrow();
    });

    test('handles timestamp numbers', () => {
      const timestamp = 1705320000000;
      expect(() => format(timestamp, now, { locale: enUS })).not.toThrow();
    });

    test('handles Date objects', () => {
      const date = new Date('2024-01-15T11:00:00Z');
      expect(() => format(date, now, { locale: enUS })).not.toThrow();
    });

    test('handles various date string formats', () => {
      const formats = [
        '2024-01-15',
        '2024/01/15',
        'Jan 15, 2024',
        '15 Jan 2024',
        '2024-01-15T11:00:00.000Z',
        '2024-01-15T11:00:00+00:00',
      ];

      formats.forEach(dateStr => {
        expect(() => format(dateStr, now, { locale: enUS })).not.toThrow();
      });
    });
  });

  describe('Timezone handling', () => {
    test('handles UTC dates', () => {
      const utcDate = new Date('2024-01-15T11:00:00Z');
      const result = format(utcDate, now, { locale: enUS });
      expect(result).toBeDefined();
    });

    test('handles local timezone dates', () => {
      const localDate = new Date('2024-01-15T11:00:00');
      const result = format(localDate, now, { locale: enUS });
      expect(result).toBeDefined();
    });

    test('handles timezone offset dates', () => {
      const offsetDate = new Date('2024-01-15T11:00:00+05:00');
      const result = format(offsetDate, now, { locale: enUS });
      expect(result).toBeDefined();
    });
  });

  describe('Number formatting compatibility', () => {
    test('handles large numbers', () => {
      const veryOld = new Date('1900-01-01');
      const result = format(veryOld, now, { locale: enUS });
      expect(result).toBeDefined();
      expect(result).not.toContain('NaN');
    });

    test('handles decimal precision', () => {
      const almostOneMinute = new Date(now.getTime() - 59500); // 59.5 seconds
      const result = format(almostOneMinute, now, { justNowThreshold: 0, locale: enUS });
      expect(result).toBeDefined();
    });

    test('handles floating point edge cases', () => {
      const edgeCase = new Date(now.getTime() - 0.1);
      const result = format(edgeCase, now, { locale: enUS });
      expect(result).toBeDefined();
    });
  });

  describe('Unicode and character encoding', () => {
    test('handles French text correctly', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const result = format(oneHourAgo, now, { locale: frFR });
      expect(result).toContain('heure');
    });

    test('handles special characters in locale strings', () => {
      const customLocale = {
        ...enUS,
        relative: {
          ...enUS.relative,
          just: 'Just now! 🎉',
          past: 'ago ⏰',
          future: 'in ⏰',
          about: 'about ~',
        },
      };

      const result = format(now, now, { locale: customLocale });
      expect(result).toContain('🎉');
    });
  });

  describe('Memory and performance', () => {
    test('handles repeated calls efficiently', () => {
      const start = performance.now();

      for (let i = 0; i < 1000; i++) {
        const testDate = new Date(now.getTime() - i * 1000);
        format(testDate, now, { locale: enUS });
      }

      const end = performance.now();
      const duration = end - start;

      // Should complete 1000 calls in reasonable time (< 100ms)
      expect(duration).toBeLessThan(100);
    });

    test('does not leak memory with large datasets', () => {
      const performanceWithMemory = performance as unknown as { memory?: { usedJSHeapSize: number } };
      const initialMemory = performanceWithMemory.memory?.usedJSHeapSize ?? 0;

      // Create many date objects and format them
      for (let i = 0; i < 10000; i++) {
        const testDate = new Date(now.getTime() - Math.random() * 31556952000); // Random date within a year
        format(testDate, now, { locale: enUS });
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = performanceWithMemory.memory?.usedJSHeapSize ?? 0;

      // Memory should not increase dramatically (allow for 10MB increase)
      if (initialMemory > 0 && finalMemory > 0) {
        expect(finalMemory - initialMemory).toBeLessThan(10 * 1024 * 1024);
      }
    });
  });

  describe('Error handling', () => {
    test('gracefully handles malformed input', () => {
      const malformedInputs = [
        '',
        'not-a-date',
        '2024-13-45', // Invalid month/day
        '2024-02-30', // Invalid date for February
        Infinity,
        -Infinity,
        NaN,
        null,
        undefined,
      ];

      malformedInputs.forEach(input => {
        expect(() => format(input as unknown as Date, now)).toThrow();
      });
    });

    test('handles edge case dates', () => {
      const edgeCases = [
        new Date(0), // Unix epoch
        new Date(8640000000000000), // Max safe date
        new Date(-8640000000000000), // Min safe date
        new Date('1970-01-01T00:00:00Z'),
        new Date('2038-01-19T03:14:07Z'), // Y2038 problem date
      ];

      edgeCases.forEach(date => {
        expect(() => format(date, now, { locale: enUS })).not.toThrow();
      });
    });
  });

  describe('Locale fallback behavior', () => {
    test('handles missing locale properties gracefully', () => {
      const incompleteLocale = {
        id: 'test',
        name: 'Test',
        relative: {
          just: 'now',
          past: 'ago',
          future: 'in',
          about: 'about',
        },
        units: {
          second: { singular: 'second', plural: 'seconds' },
          minute: { singular: 'minute', plural: 'minutes' },
          hour: { singular: 'hour', plural: 'hours' },
          day: { singular: 'day', plural: 'days' },
          week: { singular: 'week', plural: 'weeks' },
          month: { singular: 'month', plural: 'months' },
          year: { singular: 'year', plural: 'years' },
        },
        // Missing some required properties
      };

      // Should not throw, should use defaults or handle gracefully
      expect(() => format(now, now, { locale: incompleteLocale as unknown as LocaleConfig })).not.toThrow();
    });
  });

  describe('Cross-browser number formatting', () => {
    test('handles different number formatting across browsers', () => {
      const largeNumber = 1234567;
      const testDate = new Date(now.getTime() - largeNumber * 1000);

      const result = format(testDate, now, { locale: enUS });
      expect(result).toBeDefined();
      expect(result).not.toContain('NaN');
      expect(result).not.toContain('undefined');
    });
  });
});
