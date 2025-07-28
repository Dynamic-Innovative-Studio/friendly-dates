/**
 * @file EN-US.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT (c) Dynamic Innovative Studio
 *
 * @description English (United States) locale
 *
 * @translated by Damion/Anonmancer
 *
 * @since 2025-05-10
 * @updated
 *
 * @requires LocaleConfig from friendly-dates
 *
 * @exports enUS
 *
 * @module friendly-dates
 */

// ------------ IMPORTS
import { LocaleConfig } from '../types';

// ------------ LOCALE ENGLISH
/**
 * Default English locale
 */
export const enUS: LocaleConfig = {
  id: 'en-US',
  name: 'English (United States)',
  direction: 'ltr',
  numberFormat: {
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },

  units: {
    millisecond: 'millisecond',
    second: 'second',
    minute: 'minute',
    hour: 'hour',
    day: 'day',
    week: 'week',
    month: 'month',
    quarter: 'quarter',
    year: 'year',
    decade: 'decade',
  },

  unitsPlural: {
    millisecond: 'milliseconds',
    second: 'seconds',
    minute: 'minutes',
    hour: 'hours',
    day: 'days',
    week: 'weeks',
    month: 'months',
    quarter: 'quarters',
    year: 'years',
    decade: 'decades',
  },

  relative: {
    just: 'Just now',
    past: 'ago',
    future: 'in',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    previous: 'Last',
    next: 'Next',
    at: 'at',
    about: 'about',
    thisWeek: 'this week',
    lastWeek: 'last week',
    nextWeek: 'next week',
    thisMonth: 'this month',
    lastMonth: 'last month',
    nextMonth: 'next month',
    thisYear: 'this year',
    lastYear: 'last year',
    nextYear: 'next year',
  },

  days: {
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },

  months: {
    short: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    long: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
};

// ------------ EXPORT
export default enUS;
