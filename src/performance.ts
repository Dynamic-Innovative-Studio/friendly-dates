/**
 * @file PERFORMANCE.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Performance monitoring
 * and benchmarking utilities for friendly-dates
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 * @requires format from friendly-dates
 *
 * @exports BenchmarkResult
 * @exports BenchmarkOptions
 * @exports PerformanceBenchmark
 * @exports quickBenchmark
 * @exports createBenchmark
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig } from './types';
import { format } from './friendly-dates';

// ------------ TYPES
/**
 * Benchmark result
 */
export interface BenchmarkResult {
  name: string;
  iterations: number;
  totalTime: number;
  averageTime: number;
  operationsPerSecond: number;
  memoryUsage?: {
    before: number;
    after: number;
    delta: number;
  };
}

/**
 * Benchmark options
 */
export interface BenchmarkOptions {
  iterations?: number;
  warmupIterations?: number;
  measureMemory?: boolean;
  logResults?: boolean;
}

/**
 * Performance benchmark runner
 */
export class PerformanceBenchmark {
  private results: BenchmarkResult[] = [];

  /**
   * Run a benchmark test
   * @param name Test name
   * @param testFn Function to benchmark
   * @param options Benchmark options
   * @returns Benchmark result
   */
  benchmark(
    name: string,
    testFn: () => void,
    options: BenchmarkOptions = {},
  ): BenchmarkResult {
    const {
      iterations = 1000,
      warmupIterations = 100,
      measureMemory = false,
      logResults = false,
    } = options;

    // Warmup
    for (let i = 0; i < warmupIterations; i++) {
      testFn();
    }

    // Force garbage collection before measurement
    if (global.gc && measureMemory) {
      global.gc();
    }

    const memoryBefore = measureMemory ? this.getMemoryUsage() : 0;
    const startTime = performance.now();

    // Run benchmark
    for (let i = 0; i < iterations; i++) {
      testFn();
    }

    const endTime = performance.now();
    const memoryAfter = measureMemory ? this.getMemoryUsage() : 0;

    const totalTime = endTime - startTime;
    const averageTime = totalTime / iterations;
    const operationsPerSecond = 1000 / averageTime;

    const result: BenchmarkResult = {
      name,
      iterations,
      totalTime,
      averageTime,
      operationsPerSecond,
      ...(measureMemory && {
        memoryUsage: {
          before: memoryBefore,
          after: memoryAfter,
          delta: memoryAfter - memoryBefore,
        },
      }),
    };

    this.results.push(result);

    if (logResults) {
      this.logResult(result);
    }

    return result;
  }

  /**
   * Run standard friendly-dates benchmarks
   * @param options Benchmark options
   * @returns Array of benchmark results
   */
  runStandardBenchmarks(options: BenchmarkOptions = {}): BenchmarkResult[] {
    const now = new Date('2024-01-15T12:00:00Z');
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const oneDayAgo = new Date(now.getTime() - 86400000);
    const oneWeekAgo = new Date(now.getTime() - 604800000);
    const oneMonthAgo = new Date(now.getTime() - 2629746000);
    const oneYearAgo = new Date(now.getTime() - 31556952000);

    const benchmarks = [
      {
        name: 'Basic formatting (1 hour ago)',
        fn: (): string => format(oneHourAgo, now),
      },
      {
        name: 'Basic formatting (1 day ago)',
        fn: (): string => format(oneDayAgo, now),
      },
      {
        name: 'Basic formatting (1 week ago)',
        fn: (): string => format(oneWeekAgo, now),
      },
      {
        name: 'Basic formatting (1 month ago)',
        fn: (): string => format(oneMonthAgo, now),
      },
      {
        name: 'Basic formatting (1 year ago)',
        fn: (): string => format(oneYearAgo, now),
      },
      {
        name: 'With complex options',
        fn: (): string => format(oneHourAgo, now, {
          includeTime: true,
          useWords: true,
          fuzzyMatching: true,
          relativeDateRanges: true,
          accessibility: true,
        }),
      },
      {
        name: 'With custom thresholds',
        fn: (): string => format(oneHourAgo, now, {
          customThresholds: {
            minute: 30,
            hour: 1800,
            day: 43200,
          },
        }),
      },
      {
        name: 'Future date formatting',
        fn: (): string => format(new Date(now.getTime() + 3600000), now),
      },
      {
        name: 'Very small time difference',
        fn: (): string => format(new Date(now.getTime() + 1000), now),
      },
      {
        name: 'Very large time difference',
        fn: (): string => format(new Date('1900-01-01'), now),
      },
    ];

    const results: BenchmarkResult[] = [];

    for (const benchmark of benchmarks) {
      const result = this.benchmark(benchmark.name, benchmark.fn, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Run locale-specific benchmarks
   * @param locales Array of locales to test
   * @param options Benchmark options
   * @returns Array of benchmark results
   */
  runLocaleBenchmarks(
    locales: LocaleConfig[],
    options: BenchmarkOptions = {},
  ): BenchmarkResult[] {
    const now = new Date('2024-01-15T12:00:00Z');
    const oneHourAgo = new Date(now.getTime() - 3600000);

    const results: BenchmarkResult[] = [];

    for (const locale of locales) {
      const result = this.benchmark(
        `Locale: ${locale.name}`,
        () => format(oneHourAgo, now, { locale }),
        options,
      );
      results.push(result);
    }

    return results;
  }

  /**
   * Run preset benchmarks
   * @param options Benchmark options
   * @returns Array of benchmark results
   */
  runPresetBenchmarks(options: BenchmarkOptions = {}): BenchmarkResult[] {
    const now = new Date('2024-01-15T12:00:00Z');
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const presets = ['social', 'formal', 'compact', 'accessibility'] as const;

    const results: BenchmarkResult[] = [];

    for (const preset of presets) {
      const result = this.benchmark(
        `Preset: ${preset}`,
        () => format(oneHourAgo, now, { preset }),
        options,
      );
      results.push(result);
    }

    return results;
  }

  /**
   * Get all benchmark results
   * @returns Array of all benchmark results
   */
  getResults(): BenchmarkResult[] {
    return [...this.results];
  }

  /**
   * Clear all benchmark results
   */
  clearResults(): void {
    this.results = [];
  }

  /**
   * Generate performance report
   * @returns Performance report as string
   */
  generateReport(): string {
    if (this.results.length === 0) {
      return 'No benchmark results available.';
    }

    let report = 'Performance Benchmark Report\n';
    report += '================================\n\n';

    this.results.forEach((result, index) => {
      report += `${String(index + 1)}. ${result.name}\n`;
      report += `   Iterations: ${result.iterations.toLocaleString()}\n`;
      report += `   Total Time: ${result.totalTime.toFixed(2)}ms\n`;
      report += `   Average Time: ${result.averageTime.toFixed(4)}ms\n`;
      report += `   Operations/sec: ${result.operationsPerSecond.toFixed(0)}\n`;

      if (result.memoryUsage) {
        report += `   Memory Delta: ${(result.memoryUsage.delta / 1024 / 1024).toFixed(2)}MB\n`;
      }

      report += '\n';
    });

    // Summary statistics
    const avgOpsPerSec = this.results.reduce((sum, r) => sum + r.operationsPerSecond, 0) / this.results.length;
    const minOpsPerSec = Math.min(...this.results.map(r => r.operationsPerSecond));
    const maxOpsPerSec = Math.max(...this.results.map(r => r.operationsPerSecond));

    report += 'Summary\n';
    report += '-------\n';
    report += `Average Operations/sec: ${avgOpsPerSec.toFixed(0)}\n`;
    report += `Min Operations/sec: ${minOpsPerSec.toFixed(0)}\n`;
    report += `Max Operations/sec: ${maxOpsPerSec.toFixed(0)}\n`;

    return report;
  }

  /**
   * Log benchmark result to console
   * @param result Benchmark result to log
   */
  private logResult(result: BenchmarkResult): void {
    // eslint-disable-next-line no-console
    console.log(`\n📊 ${result.name}`);
    // eslint-disable-next-line no-console
    console.log(`   ⏱️  ${result.averageTime.toFixed(4)}ms avg (${result.operationsPerSecond.toFixed(0)} ops/sec)`);

    if (result.memoryUsage) {
      // eslint-disable-next-line no-console
      console.log(`   💾 ${(result.memoryUsage.delta / 1024 / 1024).toFixed(2)}MB memory delta`);
    }
  }

  /**
   * Get current memory usage
   * @returns Memory usage in bytes
   */
  private getMemoryUsage(): number {
    const performanceWithMemory = performance as unknown as { memory?: { usedJSHeapSize: number } };
    if (typeof performance !== 'undefined' && performanceWithMemory.memory !== undefined) {
      return performanceWithMemory.memory.usedJSHeapSize;
    }
    return 0;
  }
}

/**
 * Create a new performance benchmark instance
 * @returns New PerformanceBenchmark instance
 */
export function createBenchmark(): PerformanceBenchmark {
  return new PerformanceBenchmark();
}

/**
 * Quick benchmark utility function
 * @param name Test name
 * @param testFn Function to benchmark
 * @param iterations Number of iterations
 * @returns Benchmark result
 */
export function quickBenchmark(
  name: string,
  testFn: () => void,
  iterations = 1000,
): BenchmarkResult {
  const benchmark = new PerformanceBenchmark();
  return benchmark.benchmark(name, testFn, { iterations, logResults: true });
}
