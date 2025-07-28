/**
 * @file pt-PT.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description Portuguese (Portugal) locale
 *
 * @translated by BleckWolf
 *
 * @since 2025-05-10
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 *
 * @exports ptPT
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig } from '../types';

// ------------ LOCALE Portuguese
/**
 * Default Portuguese (Portugal) locale
 */
export const ptPT: LocaleConfig = {
  id: 'pt-PT',
  name: 'Português (Portugal)',
  direction: 'ltr',
  numberFormat: {
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },

  units: {
    millisecond: 'milissegundo',
    second: 'segundo',
    minute: 'minuto',
    hour: 'hora',
    day: 'dia',
    week: 'semana',
    month: 'mês',
    quarter: 'trimestre',
    year: 'ano',
    decade: 'década',
  },

  unitsPlural: {
    millisecond: 'milissegundos',
    second: 'segundos',
    minute: 'minutos',
    hour: 'horas',
    day: 'dias',
    week: 'semanas',
    month: 'meses',
    quarter: 'trimestres',
    year: 'anos',
    decade: 'décadas',
  },

  relative: {
    just: 'Agora mesmo',
    past: 'atrás',
    future: 'dentro de',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    previous: 'Anterior',
    next: 'Seguinte',
    at: 'às',
    about: 'cerca de',
    thisWeek: 'esta semana',
    lastWeek: 'semana passada',
    nextWeek: 'próxima semana',
    thisMonth: 'este mês',
    lastMonth: 'mês passado',
    nextMonth: 'próximo mês',
    thisYear: 'este ano',
    lastYear: 'ano passado',
    nextYear: 'próximo ano',
  },

  days: {
    short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    long: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
  },

  months: {
    short: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    long: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  },
};

// ------------ EXPORT
export default ptPT;
