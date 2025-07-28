/**
 * @file INDEX.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description a tiny, secure, date formatting lib.
 * Converts dates into human-friendly relative phrases.
 *
 * @since 2025-05-10
 * @updated 2025-07-25
 *
 * @exports enUS
 * @exports ptPT
 * @exports brBR
 * @exports esES
 * @exports frFR
 *
 * @module friendly-dates
 */

// ------------ RE-EXPORT FROM MAIN MODULE
export * from './friendly-dates';
export { default } from './friendly-dates';

// ------------ RE-EXPORT LOCALE SYSTEM
export * from './locales';

// ------------ CONVENIENCE EXPORTS
export { enUS as en, enUS } from './locales/en-US';
export { ptPT as pt, ptPT } from './locales/pt-PT';
export { brBR as br, brBR } from './locales/br-BR';
export { esES as es, esES } from './locales/es-ES';
export { frFR as fr, frFR } from './locales/fr-FR';

// ------------ TYPES AND VALIDATION
export * from './types';
export * from './validation';

// ------------ PERFORMANCE UTILITIES
export * from './performance';
