# Data Flow Architecture in Friendly-Dates

This document explains the internal architecture and data flow of the Friendly-Dates library, providing insights for contributors and maintainers.

## Overview

Friendly-Dates is a date formatting library that converts timestamps into human-readable, relative time expressions. The library's design focuses on:

1. Performance optimization
2. Internationalization support
3. Flexibility in formatting options
4. Type safety with TypeScript
5. Zero external dependencies

## Core Components

### 1. Input Processing

**Entry point**: `format()` function

```graph
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Date Object │     │ ISO String  │     │ Timestamp   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────┬───────┴───────────┬───────┘
                   ▼                   ▼
           ┌───────────────────────────────────┐
           │          Input Validation         │
           └───────────────────┬───────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Normalized Date     │
                    │ Objects             │
                    └─────────┬───────────┘
                              │
                              ▼
```

### 2. Time Difference Calculation

Once the input dates are normalized, the library calculates the time difference:

```graph
┌─────────────────────┐     ┌─────────────────────┐
│ Target Date         │     │ Reference Date      │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           └───────────┬───────────────┘
                       │
                       ▼
         ┌───────────────────────────────┐
         │ Calculate Difference in ms    │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │ Convert to Appropriate Units  │
         └───────────────┬───────────────┘
                         │
                         ▼
```

### 3. Formatting Decision Tree

The library uses a hierarchical decision process to determine the appropriate formatting:

```graph
                    ┌───────────────────┐
                    │ Time Difference   │
                    └─────────┬─────────┘
                              │
                              ▼
          ┌────────────────────────────────────┐
          │ Is within justNowThreshold?        │
          └──────────┬─────────────┬───────────┘
                     │             │
                     ▼             ▼
      ┌─────────────────────┐    ┌─────────────────────┐
      │ Return "Just now"   │    │ Continue processing │
      └─────────────────────┘    └──────────┬──────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │ Check for special day cases │
                             └─────────────┬───────────────┘
                                           │
                                           ▼
                             ┌─────────────────────────────┐
                             │ Yesterday/Today/Tomorrow?   │
                             └┬────────────────┬───────────┘
                              │                │
                              ▼                ▼
     ┌───────────────────────────────┐     ┌───────────────────────────┐
     │ Format with special day name  │     │ Continue to next check    │
     └───────────────────────────────┘     └────────────┬──────────────┘
                                                        │
                                                        ▼
                                        ┌───────────────────────────────┐
                                        │ Within same week?            │
                                        └┬──────────────────┬───────────┘
                                         │                  │
                                         ▼                  ▼
           ┌─────────────────────────────────┐    ┌────────────────────────────┐
           │ Format with day of week         │    │ Apply unit-based formatting│
           └─────────────────────────────────┘    └────────────────────────────┘
```

### 4. Unit Selection Process

For dates beyond a week, the library selects the appropriate time unit:

```graph
┌─────────────────────┐
│ maxUnit Setting     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Time Difference     │     │ Available Units     │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           └───────────┬───────────────┘
                       │
                       ▼
         ┌───────────────────────────────┐
         │ Find Best Matching Unit       │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │ Apply Locale-Specific Format  │
         └───────────────┬───────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │ Final Formatted String        │
         └───────────────────────────────┘
```

## Locale System Architecture

The locale system uses a flexible configuration pattern:

```graph
┌─────────────────────┐     ┌─────────────────────┐
│ Default Locale (EN) │     │ Custom Locale       │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           └───────────┬───────────────┘
                       │
                       ▼
         ┌───────────────────────────────┐
         │ LocaleConfig Interface        │
         └───────────────┬───────────────┘
                         │
                         ▼
┌───────────────┐  ┌────────────────┐  ┌───────────────┐
│ Units         │  │ Relative       │  │ Day/Month     │
│ Definitions   │  │ Time Phrases   │  │ Names         │
└───────┬───────┘  └───────┬────────┘  └───────┬───────┘
        │                  │                   │
        └──────────┬───────┴─────────┬────────┘
                   │                 │
                   ▼                 ▼
```

## Performance Considerations

1. **Time Calculations**:
   - Direct timestamp comparison instead of multiple Date object creations
   - Minimal mathematical operations for unit conversions

2. **Memory Usage**:
   - No caching mechanism (stateless operation)
   - No intermediate data structures created during formatting

3. **Function Calls**:
   - Helper functions for specific formatting tasks
   - Optimized decision tree to minimize function calls

## Error Handling

The library implements several error handling mechanisms:

1. **Input Validation**:
   - Checks for invalid date inputs (throws Error)
   - Handles non-Date objects by converting them

2. **Edge Cases**:
   - Handles dates with different timezones correctly
   - Manages extreme time differences gracefully

## Extensibility Points

Contributors can extend the library in these key areas:

1. **New Locales**:
   - Implement additional `LocaleConfig` objects
   - Follow existing locale patterns (enUS, ptBR)

2. **Formatting Options**:
   - Extend the `FormatOptions` interface
   - Update the formatter to handle new options

3. **Time Units**:
   - Modify the `TIME_UNITS` constant for different granularity
   - Adjust the unit selection logic

## Implementation Notes

1. The `getNumeric()` function converts numbers to words for small values, enhancing readability.
2. The `formatTime()` function handles 12h/24h time formatting based on user preferences.
3. The `isSameDay()` function compares dates for special cases (yesterday, today, tomorrow).
4. Unit selection prioritizes larger units first, then falls back to smaller units if needed.

## Future Architecture Considerations

1. **Caching mechanism** for frequently formatted dates with the same options
2. **Custom formatter plugins** to allow user-defined formatting rules
3. **Browser-specific optimizations** for high-performance environments
4. **Tree-shakable locale modules** to reduce bundle size further
