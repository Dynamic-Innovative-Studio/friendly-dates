/**
 * @file INDEX.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Centralized locale management with
 * lazy loading support
 *
 * @since 2025-07-25
 * @updated
 *
 * @requires LocaleConfig from types
 *
 * @exports registerLocale
 * @exports loadLocale
 * @exports getAvailableLocales
 * @exports isLocaleAvailable
 * @exports clearLocaleCache
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig } from '../types';

// ------------ VARS
/**
 * Locale registry for dynamic loading
 */
const localeRegistry = new Map<string, () => Promise<LocaleConfig>>();

/**
 * Cache for loaded locales
 */
const localeCache = new Map<string, LocaleConfig>();

// ------------ EXPORTS
/**
 * Register a locale for lazy loading
 * @param id Locale identifier
 * @param loader Function that returns a promise resolving to the locale
 */
export function registerLocale(id: string, loader: () => Promise<LocaleConfig>): void {
  localeRegistry.set(id, loader);
}

/**
 * Load a locale dynamically
 * @param id Locale identifier
 * @returns Promise resolving to the locale configuration
 */
export async function loadLocale(id: string): Promise<LocaleConfig> {
  // Check cache first
  if (localeCache.has(id)) {
    const cachedLocale = localeCache.get(id);
    if (cachedLocale !== undefined) {
      return cachedLocale;
    }
  }

  // Check registry
  const loader = localeRegistry.get(id);
  if (!loader) {
    throw new Error(`Locale '${id}' not found. Available locales: ${Array.from(localeRegistry.keys()).join(', ')}`);
  }

  // Load and cache
  const locale = await loader();
  localeCache.set(id, locale);
  return locale;
}

/**
 * Get list of available locale IDs
 * @returns Array of locale identifiers
 */
export function getAvailableLocales(): string[] {
  return Array.from(localeRegistry.keys());
}

/**
 * Check if a locale is available
 * @param id Locale identifier
 * @returns True if locale is available
 */
export function isLocaleAvailable(id: string): boolean {
  return localeRegistry.has(id);
}

/**
 * Clear locale cache
 */
export function clearLocaleCache(): void {
  localeCache.clear();
}

// ------------ REGISTER LOCALES
registerLocale('en-US', async () => {
  const { enUS } = await import('./en-US');
  return enUS;
});

registerLocale('br-BR', async () => {
  const { brBR } = await import('./br-BR');
  return brBR;
});

registerLocale('pt-PT', async () => {
  const { ptPT } = await import('./pt-PT');
  return ptPT;
});

registerLocale('es-ES', async () => {
  const { esES } = await import('./es-ES');
  return esES;
});

registerLocale('fr-FR', async () => {
  const { frFR } = await import('./fr-FR');
  return frFR;
});
