/**
 * @file SETUP.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Setup file for friendly-dates tests
 *
 * @since 2025-07-25
 * @updated
 *
 * @module friendly-dates
 */

// ------------ MOCKS
/**
 * Mock implementation of `performance.now` to use system time.
 * This ensures consistent and deterministic test results for time-based logic.
 *
 * @function
 * @returns {number} - The current timestamp in milliseconds.
 */
const mockPerformanceNow = jest.fn(() => Date.now());

/**
 * Override the global `performance` object with a mock.
 * Includes mocked `now()` and `memory.usedJSHeapSize`.
 */
Object.defineProperty(global, 'performance', {
  value: {
    now: mockPerformanceNow,
    memory: {
      usedJSHeapSize: 1000000, // Simulated memory usage
    },
  },
  writable: true,
});

/**
 * Mock global `gc()` method for memory-related tests.
 * Prevents runtime errors when invoking garbage collection in tests.
 */
Object.defineProperty(global, 'gc', {
  value: jest.fn(),
  writable: true,
});

// ------------ TEST SETUP

/**
 * Set a fixed timezone for tests to ensure deterministic date outputs.
 */
process.env.TZ = 'UTC';

/**
 * Custom Jest matcher to assert that a number falls within a given range.
 *
 * @param {number} received - The actual value under test.
 * @param {number} floor - The minimum acceptable value.
 * @param {number} ceiling - The maximum acceptable value.
 * @returns {object} - Jest matcher result.
 */
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${String(received)} not to be within range ${String(floor)} - ${String(ceiling)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${String(received)} to be within range ${String(floor)} - ${String(ceiling)}`,
        pass: false,
      };
    }
  },
});

/**
 * Extend global Jest matcher types to include `toBeWithinRange`.
 */
declare module 'jest' {
  interface Matchers<R> {
    /**
     * Asserts that a number is within a specified range (inclusive).
     *
     * @param floor - Minimum expected value.
     * @param ceiling - Maximum expected value.
     * @returns Custom matcher result.
     */
    toBeWithinRange(floor: number, ceiling: number): R;
  }
}

// ------------ HOOKS
/**
 * Displays a warning if performance tests are not run in a test environment.
 */
beforeAll(() => {
  if (process.env['NODE_ENV'] !== 'test') {
    console.warn('Performance tests should be run in test environment');
  }
});

/**
 * Cleans up mocks after each test to avoid test contamination.
 */
afterEach(() => {
  jest.clearAllMocks();
  mockPerformanceNow.mockClear();
});

// ------------ EXPORT
export {};
