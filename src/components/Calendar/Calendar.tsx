import React from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addDays, getNextWeekday } from "../../lib/frontend/utils";


interface CalendarProps {
  onChange: (date: Date) => void;
  value: Date;
  disabled?: boolean;
}

function Calender({ onChange, value, disabled }: CalendarProps) {

  const today = new Date();
  const minDate = today
  const maxDate = addDays(today, 30);

  // don't bother with this, let's allow them to schedule special events on weekend
  const dateChangeHandler = (date: Date) => {
    onChange(getNextWeekday(date));
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

  return (
    <div>
      <Calendar
        style={{
          margin: "1rem",
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: "8px",
        }
        }
        onChange={dateChangeHandler}
        value={value}
        minDate={today}
        maxDate={maxDate}
        maxDetail="month"
        prev2Label={null}
        next2Label={null}
        tileDisabled={disableDateHandler}

      />
    </div>
  );
}

export default Calender;
