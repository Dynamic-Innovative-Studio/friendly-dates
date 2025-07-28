/**
 * @file fr-FR.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description French (France) locale
 *
 * @translated by CyberChaton/Envity
 *
 * @since 2025-05-10
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 *
 * @exports frFR
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig } from '../types';

// ------------ LOCALE FRENCH
/**
 * Default French locale
 */
export const frFR: LocaleConfig = {
  id: 'fr-FR',
  name: 'Français (France)',
  direction: 'ltr',
  numberFormat: {
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },

  units: {
    millisecond: 'milliseconde',
    second: 'seconde',
    minute: 'minute',
    hour: 'heure',
    day: 'jour',
    week: 'semaine',
    month: 'mois',
    quarter: 'quart',
    year: 'année',
    decade: 'décénnie',
  },

  unitsPlural: {
    millisecond: 'millisecondes',
    second: 'secondes',
    minute: 'minutes',
    hour: 'heures',
    day: 'jours',
    week: 'semaines',
    month: 'mois',
    quarter: 'quarts',
    year: 'années',
    decade: 'décénnies',
  },

  relative: {
    just: 'à l\'instant',
    past: 'il y a',
    future: 'dans',
    yesterday: 'Hier',
    tomorrow: 'Demain',
    previous: 'Dernier',
    next: 'Prochain',
    at: 'à',
    about: 'environ',
    thisWeek: 'cette semaine',
    lastWeek: 'la semaine dernière',
    nextWeek: 'la semaine prochaine',
    thisMonth: 'ce mois',
    lastMonth: 'le dernier mois',
    nextMonth: 'le prochain mois',
    thisYear: 'cette année',
    lastYear: 'l\'année dernière',
    nextYear: 'l\'année prochaine',
  },

  days: {
    short: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    long: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
  },

  months: {
    short: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Jui',
      'Jui',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    long: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ],
  },
};

// ------------ EXPORT
export default frFR;
