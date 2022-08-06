/**
 * Frontend utililty functions
 */

function addDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function getNextWeekday(date: Date): Date {
    /**
     * Returns the nearest weekday of the given date.
     */

    if (date.getDay() === 0) {
        // If the date is a Sunday, return the next Monday.
        return addDays(date, 1);
    }
    if (date.getDay() === 6) {
        // If the date is a Saturday, return the next Monday.
        return addDays(date, 2);
    }

    return date;
  }

export { addDays, getNextWeekday };