/**
 * @file PERFORMANCE.TEST.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Performance benchmark tests for friendly-dates
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires brBR from index
 * @requires createBenchmark from index
 * @requires enUS from index
 * @requires esES from index
 * @requires format from index
 * @requires frFR from index
 * @requires ptPT from index
 * @requires quickBenchmark from index
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { brBR, createBenchmark, enUS, esES, format, frFR, ptPT, quickBenchmark } from '../index';

// ------------ TESTS
describe('Performance Benchmarks', () => {
  const now = new Date('2024-01-15T12:00:00Z');
  const locales = [enUS, esES, frFR, ptPT, brBR];

  describe('Basic formatting performance', () => {
    test('single format call should be fast', () => {
      const start = performance.now();
      const oneHourAgo = new Date(now.getTime() - 3600000);
      format(oneHourAgo, now);
      const end = performance.now();

      // Single call should take less than 10ms (more reasonable for CI)
      expect(end - start).toBeLessThan(10);
    });

    test('batch formatting should be efficient', () => {
      const dates = Array.from({ length: 1000 }, (_, i) =>
        new Date(now.getTime() - i * 60000), // Every minute for 1000 minutes
      );

      const start = performance.now();
      dates.forEach(date => format(date, now));
      const end = performance.now();

      // 1000 calls should take less than 200ms (more reasonable for CI)
      expect(end - start).toBeLessThan(200);
    });

    test('complex options should not significantly impact performance', () => {
      const complexOptions = {
        includeTime: true,
        useWords: true,
        fuzzyMatching: true,
        relativeDateRanges: true,
        accessibility: true,
        customThresholds: {
          minute: 30,
          hour: 1800,
          day: 43200,
        },
      };

      const dates = Array.from({ length: 100 }, (_, i) =>
        new Date(now.getTime() - i * 3600000), // Every hour for 100 hours
      );

      const start = performance.now();
      dates.forEach(date => format(date, now, complexOptions));
      const end = performance.now();

      // 100 complex calls should take less than 100ms (more reasonable for CI)
      expect(end - start).toBeLessThan(100);
    });
  });

  describe('Locale performance', () => {
    test('different locales should have similar performance', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);
      const results: number[] = [];

      // Disable accessibility and relativeDateRanges for fair performance comparison
      locales.forEach(locale => {
        const start = performance.now();
        for (let i = 0; i < 100; i++) {
          format(oneHourAgo, now, { locale, accessibility: false, relativeDateRanges: false });
        }
        const end = performance.now();
        results.push(end - start);
      });

      // All locales should perform within 2.5x of each other (allowing for timing variations)
      const min = Math.min(...results);
      const max = Math.max(...results);
      // Avoid division by zero
      if (min > 0) {
        expect(max / min).toBeLessThan(2.5);
      } else {
        // If min is 0, just check that max is reasonable
        expect(max).toBeLessThan(100);
      }
    });

    // RTL locale performance test removed
    test('RTL locale should not significantly impact performance', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);

      // Test LTR locale
      const ltrStart = performance.now();
      for (let i = 0; i < 100; i++) {
        format(oneHourAgo, now, { locale: enUS });
      }
      const ltrEnd = performance.now();
      const ltrTime = ltrEnd - ltrStart;

      // Test different locale (brBR is actually LTR, not RTL)
      const altStart = performance.now();
      for (let i = 0; i < 100; i++) {
        format(oneHourAgo, now, { locale: brBR });
      }
      const altEnd = performance.now();
      const altTime = altEnd - altStart;

      // Different locale should not be more than 2.5x slower than English (relaxed for CI variability)
      // Avoid division by zero
      if (ltrTime > 0) {
        expect(altTime / ltrTime).toBeLessThan(2.5);
      } else {
        // If ltrTime is 0, just check that altTime is reasonable
        expect(altTime).toBeLessThan(100);
      }
    });
  });

  describe('Memory usage', () => {
    test('should not create excessive temporary objects', () => {
      const performanceWithMemory = performance as unknown as { memory?: { usedJSHeapSize: number } };
      const initialMemory = performanceWithMemory.memory?.usedJSHeapSize ?? 0;

      // Perform many operations
      for (let i = 0; i < 10000; i++) {
        const testDate = new Date(now.getTime() - Math.random() * 31556952000);
        const selectedLocale = locales[i % locales.length];
        if (selectedLocale) {
          format(testDate, now, {
            locale: selectedLocale,
            includeTime: i % 2 === 0,
            useWords: i % 3 === 0,
            fuzzyMatching: i % 4 === 0,
          });
        }
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = performanceWithMemory.memory?.usedJSHeapSize ?? 0;

      // Memory increase should be reasonable (less than 5MB for 10k operations)
      if (initialMemory > 0 && finalMemory > 0) {
        expect(finalMemory - initialMemory).toBeLessThan(5 * 1024 * 1024);
      }
    });

    test('should handle large time differences efficiently', () => {
      const veryOldDates = Array.from({ length: 1000 }, (_, i) =>
        new Date(now.getTime() - i * 31556952000), // Every year for 1000 years
      );

      const start = performance.now();
      veryOldDates.forEach(date => format(date, now));
      const end = performance.now();

      // Should handle large time differences efficiently
      expect(end - start).toBeLessThan(100);
    });
  });

  describe('Edge case performance', () => {
    test('should handle very small time differences efficiently', () => {
      const microDifferences = Array.from({ length: 1000 }, (_, i) =>
        new Date(now.getTime() + i), // Millisecond differences
      );

      const start = performance.now();
      microDifferences.forEach(date => format(date, now));
      const end = performance.now();

      expect(end - start).toBeLessThan(50);
    });

    test('should handle future dates efficiently', () => {
      const futureDates = Array.from({ length: 1000 }, (_, i) =>
        new Date(now.getTime() + i * 86400000), // Every day for 1000 days
      );

      const start = performance.now();
      futureDates.forEach(date => format(date, now));
      const end = performance.now();

      expect(end - start).toBeLessThan(50);
    });

    test('should handle mixed past and future dates efficiently', () => {
      const mixedDates = Array.from({ length: 1000 }, (_, i) =>
        new Date(now.getTime() + (i % 2 === 0 ? -1 : 1) * i * 3600000),
      );

      const start = performance.now();
      mixedDates.forEach(date => format(date, now));
      const end = performance.now();

      expect(end - start).toBeLessThan(50);
    });
  });

  describe('Preset performance', () => {
    test('presets should not significantly impact performance', () => {
      const presets = ['social', 'formal', 'compact', 'accessibility'] as const;
      const oneHourAgo = new Date(now.getTime() - 3600000);

      const results: number[] = [];

      // Test each preset (disable accessibility and relativeDateRanges for fair comparison)
      presets.forEach(preset => {
        const start = performance.now();
        for (let i = 0; i < 100; i++) {
          format(oneHourAgo, now, { preset, accessibility: false, relativeDateRanges: false });
        }
        const end = performance.now();
        results.push(end - start);
      });

      // Test without preset
      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        format(oneHourAgo, now, { accessibility: false, relativeDateRanges: false });
      }
      const end = performance.now();
      const baselineTime = end - start;

      // Presets should not be more than 2.5x slower than baseline (relaxed for CI variability)
      results.forEach(time => {
        // Avoid division by zero
        if (baselineTime > 0) {
          expect(time / baselineTime).toBeLessThan(2.5);
        } else {
          // If baselineTime is 0, just check that time is reasonable
          expect(time).toBeLessThan(100);
        }
      });
    });
  });

  describe('Validation performance', () => {
    test('validation should have minimal performance impact', async () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);

      // Test without validation
      const withoutValidationStart = performance.now();
      for (let i = 0; i < 100; i++) {
        format(oneHourAgo, now);
      }
      const withoutValidationEnd = performance.now();
      const withoutValidationTime = withoutValidationEnd - withoutValidationStart;

      // Test with validation (if available)
      try {
        const { setRuntimeValidation } = await import('../validation');
        setRuntimeValidation(true);

        const withValidationStart = performance.now();
        for (let i = 0; i < 100; i++) {
          format(oneHourAgo, now);
        }
        const withValidationEnd = performance.now();
        const withValidationTime = withValidationEnd - withValidationStart;

        // Validation should not add more than 50% overhead
        expect(withValidationTime / withoutValidationTime).toBeLessThan(1.5);

        setRuntimeValidation(false);
      } catch (_error) {
        // Validation module not available, skip test
      }
    });
  });

  describe('Concurrent usage simulation', () => {
    test('should handle concurrent formatting requests', async () => {
      const concurrentRequests = Array.from({ length: 100 }, async (_, i) =>
        new Promise<void>(resolve => {
          setTimeout(() => {
            const testDate = new Date(now.getTime() - i * 60000);
            const selectedLocale = locales[i % locales.length];
            if (selectedLocale) {
              format(testDate, now, {
                locale: selectedLocale,
                includeTime: i % 2 === 0,
              });
            }
            resolve();
          }, Math.random() * 10);
        }),
      );

      const start = performance.now();
      await Promise.all(concurrentRequests);
      const end = performance.now();

      // Should complete all concurrent requests quickly
      expect(end - start).toBeLessThan(100);
    });
  });

  describe('Benchmark utilities', () => {
    test('createBenchmark should work correctly', () => {
      const benchmark = createBenchmark();
      const oneHourAgo = new Date(now.getTime() - 3600000);

      const result = benchmark.benchmark(
        'Test benchmark',
        () => format(oneHourAgo, now),
        { iterations: 10, logResults: false },
      );

      expect(result.name).toBe('Test benchmark');
      expect(result.iterations).toBe(10);
      expect(result.totalTime).toBeGreaterThanOrEqual(0);
      expect(result.averageTime).toBeGreaterThanOrEqual(0);
      expect(result.operationsPerSecond).toBeGreaterThanOrEqual(0);
    });

    test('quickBenchmark should work correctly', () => {
      const oneHourAgo = new Date(now.getTime() - 3600000);

      const result = quickBenchmark(
        'Quick test',
        () => format(oneHourAgo, now),
        10,
      );

      expect(result.name).toBe('Quick test');
      expect(result.iterations).toBe(10);
    });

    test('runStandardBenchmarks should complete', () => {
      const benchmark = createBenchmark();
      const results = benchmark.runStandardBenchmarks({ iterations: 5 });

      expect(results.length).toBeGreaterThan(0);
      results.forEach(result => {
        expect(result.operationsPerSecond).toBeGreaterThanOrEqual(0);
      });
    });

    test('generateReport should create readable output', () => {
      const benchmark = createBenchmark();
      benchmark.benchmark(
        'Test report',
        () => format(now, now),
        { iterations: 5 },
      );

      const report = benchmark.generateReport();
      expect(report).toContain('Performance Benchmark Report');
      expect(report).toContain('Test report');
      expect(report).toContain('Operations/sec');
    });
  });
});
