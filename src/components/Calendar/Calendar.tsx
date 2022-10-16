import React from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.scss";
import { addDays, getNextWeekday } from "../../lib/frontend/utils";
import AvailabilityIndicator from "./AvailabilityIndicator";


interface CalendarProps {
  onChange: (date: Date) => void;
  value: Date;
  disabled?: boolean;
  availability?: {
    [date: string]: "available" | "unavailable" | "waitlist";
  }
}

function Calender({ onChange, value, disabled, availability }: CalendarProps) {

  const today = new Date();
  const minDate = today
  const maxDate = addDays(today, 30);

  console.log("value:", value)

  const disableDateHandler = ({ activeStartDate, date, view }: CalendarTileProperties) => {
    //true = disabled
    /** 
     * Disable weekends
     * Disable all dates if disabled is true
     */
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }
    if (availability?.date == "unavailable") {
      return true;
    } else {
      return false
    }
    return disabled ?? false;
  }


  const tileDisabled = (date: Date) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }
    if (availability?.date == "available") {
      return false;
    } else {
      return true
    }
    return disabled ?? false;
  }

  const tileStatusToClass = (status: string[]) => {
    const classes: string[] = [];
    if (status.includes("disabled")) {
      classes.push(styles.disabled);
    }
    if (status.includes("past")) {
      classes.push(styles.past);
    }
    if (status.includes("past")) {
      classes.push(styles.past);
    }
    if (status.includes("available")) {
      classes.push(styles.available);
    }
    if (status.includes("unavailable")) {
      classes.push(styles.unavailable);
    }
    if (status.includes("waitlist")) {
      classes.push(styles.waitlist);
    }
    return classes.join(" ");
  }

  const tileStatusHandler = ({ activeStartDate, date, view }: CalendarTileProperties) => {
    /** 
     * Handle both disabled and availability
     */

    const statusArray: string[] = [];

    if (tileDisabled(date)) {
      //takes precedence over all other statuses
      return ["disabled"];
    }

    if (date < today) {
      return ["past"];
    }

    if (date.getTime() === value.getTime()) {
      statusArray.push("selected");
    }

    if (availability) {
      statusArray.push(availability?.[date.toISOString()] ?? "unavailable");
    }

    return statusArray;
  }

  const tileClassNameHandler = ({ activeStartDate, date, view }: CalendarTileProperties) => {
    if (date.getTime() === value.getTime()) {
      return styles.selected;
    }
    const status = "unavailable"
    // console.log("handler avail", availability.data)
    if (date.toISOString() in availability.data) {
      status = availability.data[date.toISOString()]
    }
    // availability?.[date.toISOString()] ?? "unavailable";
    // console.log("what is status?", status)
    const className = styles[status];
    return className;
  }

  const dateChangeHandler = (date: Date) => {
    //prevent changing dates to disabled dates
    if (disableDateHandler({ activeStartDate: date, date, view: "month" })) {
      return;
    }
    onChange(date);
  }

  return (
    <div>
      <Calendar
        onChange={dateChangeHandler}
        value={value}
        minDate={today}
        maxDate={maxDate}
        maxDetail="month"
        minDetail="month"
        prev2Label={null}
        next2Label={null}
        tileDisabled={disableDateHandler}
        tileClassName={tileClassNameHandler}
        tileContent={({ date, view }) => {
          const hidden = disableDateHandler({ activeStartDate: date, date, view });
          if (hidden) {
            return null;
          }
          return (<AvailabilityIndicator availability="unavailable" />)
        }
        }

      />
    </div>
  );
}

export default Calender;