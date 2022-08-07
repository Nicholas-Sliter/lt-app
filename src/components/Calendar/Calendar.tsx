import React from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.scss";
import { addDays, getNextWeekday } from "../../lib/frontend/utils";


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

  const dateChangeHandler = (date: Date) => {
    console.log(date)
    onChange(date);
  }

  const disableDateHandler = ({ activeStartDate, date, view }: CalendarTileProperties) => {
    /** 
     * Disable weekends
     * Disable all dates if disabled is true
     */
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }
    return disabled ?? false;
  }

  const tileClassNameHandler = ({ activeStartDate, date, view }: CalendarTileProperties) => {
    const status = availability?.[date.toISOString()] ?? "unavailable";
    const className = styles[status];
    return className;
  }

  return (
    <div>
      <Calendar
        onChange={dateChangeHandler}
        value={value}
        minDate={today}
        maxDate={maxDate}
        maxDetail="month"
        prev2Label={null}
        next2Label={null}
        tileDisabled={disableDateHandler}
        tileClassName={tileClassNameHandler}

      />
    </div>
  );
}

export default Calender;
