/**
 * BASIC-USAGE.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 *
 * @license MIT Dynamic Innovative Studio
 *
 * @description Simple basic usage of friendly-dates.
 */

// ------------ IMPORT FRIENDLY-DATES
import format, { ptBR } from '../src/friendly-dates';

// Current time for demonstration purposes
const now = new Date();
console.log('Current time:', now.toISOString());

// Basic examples
console.log('\n--- Basic Examples ---');
console.log('Just now:', format(now));

// Past examples
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
console.log('5 minutes ago:', format(fiveMinutesAgo));

const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
console.log('1 hour ago:', format(oneHourAgo));

const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
console.log('1 day ago:', format(oneDayAgo));

// Future examples
console.log('\n--- Future Examples ---');
const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
console.log('10 minutes from now:', format(tenMinutesFromNow));

const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
console.log('2 hours from now:', format(twoHoursFromNow));

const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
console.log('Tomorrow:', format(nextDay));

// Week examples
console.log('\n--- Week Examples ---');
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = now.getDay();

// Create dates for each day of this week
for (let i = 0; i < 7; i++) {
  const dayDiff = i - today;
  const date = new Date(now);
  date.setDate(date.getDate() + dayDiff);
  
  console.log(`${daysOfWeek[i]}:`, format(date));
}

// Month and Year examples
console.log('\n--- Month and Year Examples ---');
const oneMonthAgo = new Date(now);
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
console.log('One month ago:', format(oneMonthAgo));

const sixMonthsAgo = new Date(now);
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
console.log('Six months ago:', format(sixMonthsAgo));

const oneYearAgo = new Date(now);
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
console.log('One year ago:', format(oneYearAgo));

const twoYearsAgo = new Date(now);
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
console.log('Two years ago:', format(twoYearsAgo));

// Options examples
console.log('\n--- Options Examples ---');

// Without time
console.log('Without time:', format(oneHourAgo, now, { includeTime: false }));

// 24h format
console.log('24h format:', format(oneHourAgo, now, { timeFormat: '24h' }));

// No words
console.log('No words:', format(oneHourAgo, now, { useWords: false }));

// Different max unit
console.log('Max unit - hour:', format(oneDayAgo, now, { maxUnit: 'hour' }));

// Localization examples
console.log('\n--- Localization Examples ---');
console.log('English (default):', format(fiveMinutesAgo));
console.log('Portuguese (Brazil):', format(fiveMinutesAgo, now, { locale: ptBR }));

// Combined options
console.log('\n--- Combined Options Examples ---');
console.log('Combined options:', format(oneDayAgo, now, {
  locale: ptBR,
  includeTime: true,
  timeFormat: '24h',
  maxUnit: 'hour',
  useWords: false,
  justNowThreshold: 60
}));

// Error handling
console.log('\n--- Error Handling ---');
try {
  format('invalid-date');
} catch (error) {
  console.log('Error handling:', (error as Error).message);
}