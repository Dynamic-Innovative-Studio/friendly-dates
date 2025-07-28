/**
 * @file FRIENDLY-DATES.TEST.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Automated locale validation tests
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires brBR from index
 * @requires enUS from index
 * @requires esES from index
 * @requires format from index
 * @requires frFR from index
 * @requires ptPT from index
 * @requires validateLocale from validation
 * @requires TimeUnit from types
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { brBR, enUS, esES, format, frFR, ptPT } from '../index';
import { validateLocale } from '../validation';
import { TimeUnit } from '../types';

// ------------ TESTS
describe('Locale Validation', () => {
  const allLocales = [enUS, brBR, esES, frFR, ptPT];
  const requiredTimeUnits: TimeUnit[] = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'quarter',
    'year',
    'decade',
  ];

  describe('Built-in locale completeness', () => {
    test.each(allLocales)('$name should have all required properties', (locale) => {
      const validation = validateLocale(locale);

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      // Check basic structure
      expect(locale.id).toBeDefined();
      expect(locale.name).toBeDefined();
      expect(locale.relative).toBeDefined();
      expect(locale.units).toBeDefined();
    });

    test.each(allLocales)('$name should have all required relative terms', (locale) => {
      expect(locale.relative.just).toBeDefined();
      expect(locale.relative.past).toBeDefined();
      expect(locale.relative.future).toBeDefined();
      expect(locale.relative.about).toBeDefined();

      // Should be non-empty strings
      expect(locale.relative.just.trim()).not.toBe('');
      expect(locale.relative.past.trim()).not.toBe('');
      expect(locale.relative.future.trim()).not.toBe('');
      expect(locale.relative.about.trim()).not.toBe('');
    });

    test.each(allLocales)('$name should have all required time units', (locale) => {
      requiredTimeUnits.forEach(unit => {
        const unitConfig = locale.units[unit as keyof typeof locale.units];
        expect(unitConfig).toBeDefined();

        if (unitConfig && typeof unitConfig === 'object' && 'singular' in unitConfig && 'plural' in unitConfig) {
          const typedUnitConfig = unitConfig as { singular: string; plural: string };
          expect(typedUnitConfig.singular).toBeDefined();
          expect(typedUnitConfig.plural).toBeDefined();

          // Should be non-empty strings
          if (typeof typedUnitConfig.singular === 'string') {
            expect(typedUnitConfig.singular.trim()).not.toBe('');
          }
          if (typeof typedUnitConfig.plural === 'string') {
            expect(typedUnitConfig.plural.trim()).not.toBe('');
          }
        }
      });
    });

    test.each(allLocales)('$name should have consistent unit naming', (locale) => {
      // Singular and plural should be different for most languages (except some edge cases)
      if (locale.id !== 'ar-SA') { // Arabic might have special rules
        // At least some units should have different singular/plural forms
        const hasDifferentForms = requiredTimeUnits.some(u => {
          const unitSingular = locale.units[u as keyof typeof locale.units];
          const unitPlural = locale.unitsPlural[u as keyof typeof locale.unitsPlural];
          if (unitSingular && unitPlural &&
              typeof unitSingular === 'string' &&
              typeof unitPlural === 'string') {
            return unitSingular !== unitPlural;
          }
          return false;
        });
        expect(hasDifferentForms).toBe(true);
      }
    });

    test.each(allLocales)('$name should have proper direction setting', (locale) => {
      if (locale.direction) {
        expect(['ltr', 'rtl']).toContain(locale.direction);
      }
    });

    test.each(allLocales)('$name should have valid number formatting if specified', (locale) => {
      if (locale.numberFormat) {
        expect(locale.numberFormat.thousandsSeparator).toBeDefined();
        expect(locale.numberFormat.decimalSeparator).toBeDefined();

        // Separators should be different
        expect(locale.numberFormat.thousandsSeparator).not.toBe(locale.numberFormat.decimalSeparator);
      }
    });
  });

  describe('Locale consistency checks', () => {
    test('all locales should have unique IDs', () => {
      const ids = allLocales.map(locale => locale.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    test('all locales should have unique names', () => {
      const names = allLocales.map(locale => locale.name);
      const uniqueNames = new Set(names);

      expect(uniqueNames.size).toBe(names.length);
    });

    test('locale IDs should follow proper format', () => {
      allLocales.forEach(locale => {
        // Should be in format like 'en-US', 'pt-BR', etc.
        expect(locale.id).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
      });
    });

    test('locale names should be descriptive', () => {
      allLocales.forEach(locale => {
        expect(locale.name.length).toBeGreaterThan(5);
        expect(locale.name).toMatch(/[A-Z]/); // Should contain at least one uppercase letter
      });
    });
  });

  describe('Translation quality checks', () => {
    test('relative terms should not be identical across different locales', () => {
      const englishTerms = enUS.relative;

      // Other locales should have different terms (translations)
      [brBR, esES, frFR, ptPT].forEach(locale => {
        const hasTranslations =
          locale.relative.just !== englishTerms.just ||
          locale.relative.past !== englishTerms.past ||
          locale.relative.future !== englishTerms.future ||
          locale.relative.about !== englishTerms.about;

        expect(hasTranslations).toBe(true);
      });
    });

    test('time unit translations should not be identical to English', () => {
      const englishUnits = enUS.units;
      const englishUnitsPlural = enUS.unitsPlural;

      [brBR, esES, frFR, ptPT].forEach(locale => {
        let hasTranslations = false;

        requiredTimeUnits.forEach(unit => {
          const localeUnit = locale.units[unit as keyof typeof locale.units];
          const localeUnitPlural = locale.unitsPlural[unit as keyof typeof locale.unitsPlural];
          const englishUnit = englishUnits[unit as keyof typeof englishUnits];
          const englishUnitPlural = englishUnitsPlural[unit as keyof typeof englishUnitsPlural];

          if (localeUnit && englishUnit && localeUnitPlural && englishUnitPlural &&
              typeof localeUnit === 'string' && typeof englishUnit === 'string' &&
              typeof localeUnitPlural === 'string' && typeof englishUnitPlural === 'string') {
            if (localeUnit !== englishUnit || localeUnitPlural !== englishUnitPlural) {
              hasTranslations = true;
            }
          }
        });

        expect(hasTranslations).toBe(true);
      });
    });

    test('translations should not contain obvious placeholders', () => {
      allLocales.forEach(locale => {
        const unitStrings: string[] = [];
        requiredTimeUnits.forEach(unit => {
          const unitSingular = locale.units[unit as keyof typeof locale.units];
          const unitPlural = locale.unitsPlural[unit as keyof typeof locale.unitsPlural];
          if (unitSingular && typeof unitSingular === 'string') {
            unitStrings.push(unitSingular);
          }
          if (unitPlural && typeof unitPlural === 'string') {
            unitStrings.push(unitPlural);
          }
        });

        const allStrings = [
          locale.relative.just,
          locale.relative.past,
          locale.relative.future,
          locale.relative.about,
          ...unitStrings,
        ];

        allStrings.forEach(str => {
          expect(str.toLowerCase()).not.toContain('todo');
          expect(str.toLowerCase()).not.toContain('fixme');
          expect(str.toLowerCase()).not.toContain('placeholder');
          expect(str).not.toContain('XXX');
          expect(str).not.toContain('???');
        });
      });
    });
  });

  // RTL locale specific tests removed (no RTL locales in codebase)

  describe('Locale validation edge cases', () => {
    test('should detect missing required properties', () => {
      const incompleteLocale = {
        id: 'test',
        name: 'Test',
        relative: {
          just: 'now',
          past: 'ago',
          // Missing future and about
        },
        units: {
          second: { singular: 'second', plural: 'seconds' },
          // Missing other units
        },
      };

      const validation = validateLocale(incompleteLocale as any);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });

    test('should detect empty strings', () => {
      const localeWithEmptyStrings = {
        ...enUS,
        relative: {
          ...enUS.relative,
          just: '', // Empty string
        },
      };

      const validation = validateLocale(localeWithEmptyStrings);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.some(error => error.includes('empty'))).toBe(true);
    });

    test('should detect invalid direction values', () => {
      const localeWithInvalidDirection = {
        ...enUS,
        direction: 'invalid' as unknown,
      };

      const validation = validateLocale(localeWithInvalidDirection);
      expect(validation.isValid).toBe(false);
      expect(validation.errors.some(error => error.includes('direction'))).toBe(true);
    });
  });

  describe('Performance of locale validation', () => {
    test('validation should be fast for all locales', () => {
      const start = performance.now();

      allLocales.forEach(locale => {
        validateLocale(locale);
      });

      const end = performance.now();
      const duration = end - start;

      // Should validate all locales in less than 10ms
      expect(duration).toBeLessThan(10);
    });

    test('validation should handle repeated calls efficiently', () => {
      const start = performance.now();

      for (let i = 0; i < 100; i++) {
        allLocales.forEach(locale => {
          validateLocale(locale);
        });
      }

      const end = performance.now();
      const duration = end - start;

      // 100 iterations of all locales should complete quickly
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Locale integration tests', () => {
    test('all locales should work with format function', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const oneHourAgo = new Date(now.getTime() - 3600000);

      allLocales.forEach(locale => {
        expect(() => {
          const result = format(oneHourAgo, now, { locale });
          expect(result).toBeDefined();
          expect(typeof result).toBe('string');
          expect(result.length).toBeGreaterThan(0);
        }).not.toThrow();
      });
    });

    test('all locales should produce different outputs', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const oneHourAgo = new Date(now.getTime() - 3600000);

      const results = allLocales.map(locale =>
        format(oneHourAgo, now, { locale }),
      );

      // Should have at least some different results
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });
});
