/**
 * FRIENDLY-DATES.TS
 *
 * @version 1.0.0
 * @author BleckWolf25
 *
 * @license MIT Dynamic Innovative Studio
 *
 * @description a tiny, secure, date formatting lib.
 * Converts dates into human-friendly relative phrases.
 */

// ------------ LOCALE CONFIG INTERFACE

/**
 * Locale configuration interface for i18n support
 */
export interface LocaleConfig {
  /** Time units in singular form */
  units: {
    second: string;
    minute: string;
    hour: string;
    day: string;
    week: string;
    month: string;
    year: string;
  };

  /** Time units in plural form */
  unitsPlural: {
    second: string;
    minute: string;
    hour: string;
    day: string;
    week: string;
    month: string;
    year: string;
  };

  /** Relative time phrases */
  relative: {
    just: string;
    past: string;
    future: string;
    yesterday: string;
    tomorrow: string;
    previous: string;
    next: string;
    at: string;
  };

  /** Day names */
  days: {
    short: string[];
    long: string[];
  };

  /** Month names */
  months: {
    short: string[];
    long: string[];
  };
}

// ------------ FORMAT OPTIONS

/**
 * Configuration options for formatting
 */
export interface FormatOptions {
  /** Locale to use for formatting */
  locale: LocaleConfig;

  /** Whether to include the time in the output */
  includeTime: boolean;

  /** Format for time display (12h or 24h) */
  timeFormat: "12h" | "24h";

  /** Maximum unit to use for relative formatting */
  maxUnit: "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

  /** Threshold in seconds to consider "just now" */
  justNowThreshold: number;

  /** Whether to use words for small numbers or always use digits */
  useWords: boolean;
}

// ------------ ENGLISH LOCALE

/**
 * Default English locale
 */
export const enUS: LocaleConfig = {
  /** Singular Units */
  units: {
    second: "second",
    minute: "minute",
    hour: "hour",
    day: "day",
    week: "week",
    month: "month",
    year: "year",
  },

  /** Plural Units */
  unitsPlural: {
    second: "seconds",
    minute: "minutes",
    hour: "hours",
    day: "days",
    week: "weeks",
    month: "months",
    year: "years",
  },

  /** Relative Units */
  relative: {
    just: "Just now",
    past: "ago",
    future: "in",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    previous: "Last",
    next: "Next",
    at: "at",
  },

  /** Days */
  days: {
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    long: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },

  /** Months */
  months: {
    short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};

// ------------ PT&BR LOCALE

/**
 * Portuguese (Portugal) and (Brazil) locale
 */
export const ptBR: LocaleConfig = {
  /** Singular Units */
  units: {
    second: "segundo",
    minute: "minuto",
    hour: "hora",
    day: "dia",
    week: "semana",
    month: "mês",
    year: "ano",
  },

  /** Plural Units */
  unitsPlural: {
    second: "segundos",
    minute: "minutos",
    hour: "horas",
    day: "dias",
    week: "semanas",
    month: "meses",
    year: "anos",
  },

  /** Relative Units */
  relative: {
    just: "Agora mesmo",
    past: "atrás",
    future: "em",
    yesterday: "Ontem",
    tomorrow: "Amanhã",
    previous: "Último",
    next: "Próximo",
    at: "às",
  },

  /** Days */
  days: {
    short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    long: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
  },

  /** Months */
  months: {
    short: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    long: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  },
};

// ------------ DEFAULT OPTIONS

// Default options
const DEFAULT_OPTIONS: FormatOptions = {
  locale: enUS,
  includeTime: true,
  timeFormat: "12h",
  maxUnit: "year",
  justNowThreshold: 30,
  useWords: true,
};

// ------------ TIME UNITS

/**
 * Time units in seconds for calculations
 */
const TIME_UNITS = {
  // 1 Second
  second: 1,

  // 1 Minute
  minute: 60,

  // 1 Hour
  hour: 3600,

  // 1 Day
  day: 86400,

  // 1 Week
  week: 604800,

  // 30 days
  month: 2592000,

  // 365 days
  year: 31536000,
};

// ------------ HELPER FUNCTIONS

/**
 * Get numeric value with appropriate formatting
 * @param n Number to format
 * @param useWords Whether to use words for small numbers
 * @returns Formatted number
 */
function getNumeric(n: number, useWords: boolean): string {
  if (!useWords) return n.toString();

  switch (n) {
    case 1:
      return "a";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    case 10:
      return "ten";
    default:
      return n.toString();
  }
}

/**
 * Format a time string based on the provided options
 * @param date Date to format
 * @param options Formatting options
 * @returns Formatted time string
 */
function formatTime(date: Date, options: Required<FormatOptions>): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format minutes with leading zero
  const paddedMinutes = minutes.toString().padStart(2, "0");

  if (options.timeFormat === "24h") {
    return `${hours}:${paddedMinutes}`;
  } else {
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${paddedMinutes} ${period}`;
  }
}

/**
 * Check if two dates are on the same day
 * @param date1 First date
 * @param date2 Second date
 * @returns True if dates are on the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Format a date into a human-friendly string
 * @param date Date to format (Date object, ISO string, or timestamp)
 * @param referenceDate Reference date to calculate relative time from (defaults to now)
 * @param options Formatting options
 * @returns Human-friendly formatted date string
 */
export function format(
  date: Date | string | number,
  referenceDate: Date | string | number = new Date(),
  options: Partial<FormatOptions> = {},
): string {
  // Check for Date objects
  const targetDate = date instanceof Date ? date : new Date(date);
  const reference =
    referenceDate instanceof Date ? referenceDate : new Date(referenceDate);

  // Validate input dates
  if (isNaN(targetDate.getTime()) || isNaN(reference.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Merge default options with provided options
  const fullOptions: Required<FormatOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const { locale, includeTime, justNowThreshold, useWords } = fullOptions;

  // Calculate time difference in seconds
  const diffMs = targetDate.getTime() - reference.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const isInPast = diffSeconds < 0;
  const absoluteDiffSeconds = Math.abs(diffSeconds);

  // Check if the time difference is within the "just now" threshold
  if (absoluteDiffSeconds < justNowThreshold) {
    return locale.relative.just;
  }

  // Create a new date object for today, yesterday, and tomorrow comparisons
  const today = new Date(reference);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const targetDay = new Date(targetDate);
  targetDay.setHours(0, 0, 0, 0);

  // Handle special cases: yesterday, today, tomorrow
  if (isSameDay(targetDay, yesterday)) {
    if (includeTime) {
      return `${locale.relative.yesterday} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
    }
    return locale.relative.yesterday;
  }

  if (isSameDay(targetDay, today)) {
    // For today, use relative time based on hours/minutes
    if (absoluteDiffSeconds < 60) {
      const unit =
        absoluteDiffSeconds === 1
          ? locale.units.second
          : locale.unitsPlural.second;
      return isInPast
        ? `${getNumeric(absoluteDiffSeconds, useWords)} ${unit} ${locale.relative.past}`
        : `${locale.relative.future} ${getNumeric(absoluteDiffSeconds, useWords)} ${unit}`;
    }

    if (absoluteDiffSeconds < 3600) {
      const minutes = Math.round(absoluteDiffSeconds / 60);
      const unit =
        minutes === 1 ? locale.units.minute : locale.unitsPlural.minute;
      return isInPast
        ? `${getNumeric(minutes, useWords)} ${unit} ${locale.relative.past}`
        : `${locale.relative.future} ${getNumeric(minutes, useWords)} ${unit}`;
    }

    const hours = Math.round(absoluteDiffSeconds / 3600);
    const unit = hours === 1 ? locale.units.hour : locale.unitsPlural.hour;
    return isInPast
      ? `${getNumeric(hours, useWords)} ${unit} ${locale.relative.past}`
      : `${locale.relative.future} ${getNumeric(hours, useWords)} ${unit}`;
  }

  if (isSameDay(targetDay, tomorrow)) {
    if (includeTime) {
      return `${locale.relative.tomorrow} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
    }
    return locale.relative.tomorrow;
  }

  // Check if dates are within the same week
  const dayDiff = Math.round(
    Math.abs(targetDay.getTime() - today.getTime()) / TIME_UNITS.day / 1000,
  );

  if (dayDiff < 7) {
    const targetDayOfWeek = targetDate.getDay();
    const dayName = locale.days.long[targetDayOfWeek];

    if (isInPast) {
      if (includeTime) {
        return `${locale.relative.previous} ${dayName} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
      }
      return `${locale.relative.previous} ${dayName}`;
    } else {
      if (includeTime) {
        return `${locale.relative.next} ${dayName} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
      }
      return `${locale.relative.next} ${dayName}`;
    }
  }

  /**
   * For dates beyond a week
   * Find appropriate unit based
   * on maxUnit and difference
   */
  const units: Array<keyof typeof TIME_UNITS> = [
    "year",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
  ];
  const maxUnitIndex = units.indexOf(fullOptions.maxUnit);

  for (let i = maxUnitIndex; i < units.length; i++) {
    const unit = units[i];
    const unitInSeconds = TIME_UNITS[unit];

    if (absoluteDiffSeconds >= unitInSeconds || i === units.length - 1) {
      const count = Math.round(absoluteDiffSeconds / unitInSeconds);
      const unitName =
        count === 1 ? locale.units[unit] : locale.unitsPlural[unit];

      if (unit === "month" || unit === "year") {
        // For months and years, use the calendar date format
        const monthName = locale.months.long[targetDate.getMonth()];

        if (
          unit === "year" &&
          Math.abs(targetDate.getFullYear() - reference.getFullYear()) > 1
        ) {
          if (includeTime) {
            return `${monthName} ${targetDate.getDate()}, ${targetDate.getFullYear()} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
          }
          return `${monthName} ${targetDate.getDate()}, ${targetDate.getFullYear()}`;
        }

        if (includeTime) {
          return `${monthName} ${targetDate.getDate()} ${locale.relative.at} ${formatTime(targetDate, fullOptions)}`;
        }
        return `${monthName} ${targetDate.getDate()}`;
      }

      return isInPast
        ? `${getNumeric(count, useWords)} ${unitName} ${locale.relative.past}`
        : `${locale.relative.future} ${getNumeric(count, useWords)} ${unitName}`;
    }
  }

  // Fallback for any other case
  return targetDate.toLocaleDateString();
}

// ------------ EXPORT DEFAULT
export default format;
