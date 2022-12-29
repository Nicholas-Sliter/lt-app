/**
 * Frontend utililty functions
 */

import { Availability } from "../../types/Availability";

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

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}


/**
 * Call fn immediately, then debounce it so it can't be called again until delay ms have passed.
 * @param fn  The function to debounce
 * @param delay  The delay in ms
 */
function debounceLeading(fn: Function, delay: number) {
  let timer: any;
  return (...args: any) => {
    if (!timer) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, delay);
  };
}







export { addDays, getNextWeekday, toTitleCase, debounceLeading };
