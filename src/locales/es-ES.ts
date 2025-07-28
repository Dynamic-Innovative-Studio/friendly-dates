/**
 * @file es-ES.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Spanish (Spain) locale
 *
 * @translated by BleckWolf
 *
 * @since 2025-05-10
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 *
 * @exports esES
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig } from '../types';

// ------------ LOCALE SPANISH
/**
 * Default Spanish locale
 */
export const esES: LocaleConfig = {
  id: 'es-ES',
  name: 'Español (España)',
  direction: 'ltr',
  numberFormat: {
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },

  units: {
    millisecond: 'milisegundo',
    second: 'segundo',
    minute: 'minuto',
    hour: 'hora',
    day: 'día',
    week: 'semana',
    month: 'mes',
    quarter: 'trimestre',
    year: 'año',
    decade: 'década',
  },

  unitsPlural: {
    millisecond: 'milisegundos',
    second: 'segundos',
    minute: 'minutos',
    hour: 'horas',
    day: 'días',
    week: 'semanas',
    month: 'meses',
    quarter: 'trimestres',
    year: 'años',
    decade: 'décadas',
  },

  relative: {
    just: 'Ahora mismo',
    past: 'hace',
    future: 'en',
    yesterday: 'Ayer',
    tomorrow: 'Mañana',
    previous: 'El pasado',
    next: 'El próximo',
    at: 'a las',
    about: 'hace aproximadamente',
    thisWeek: 'esta semana',
    lastWeek: 'la semana pasada',
    nextWeek: 'la próxima semana',
    thisMonth: 'este mes',
    lastMonth: 'el mes pasado',
    nextMonth: 'el próximo mes',
    thisYear: 'este año',
    lastYear: 'el año pasado',
    nextYear: 'el próximo año',
  },

  days: {
    short: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    long: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
  },

  months: {
    short: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    long: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
  },
};

// ------------ EXPORT
export default esES;
