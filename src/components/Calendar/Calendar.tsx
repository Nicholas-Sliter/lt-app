import React from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.scss";
import { addDays, getNextWeekday } from "../../lib/frontend/utils";
import AvailabilityIndicator from "./AvailabilityIndicator";
import { Availability } from "../../types/Availability";
import { stringFormattedDate } from "../../lib/common/utils";

interface CalendarProps {
	onChange: (date: Date) => void;
	value: Date;
	disabled?: boolean;
	availability: Availability;
}


function getDateAvailability(date: Date, availability: Availability) {
	return availability[stringFormattedDate(date)];
}



function Calender({ onChange, value, disabled, availability }: CalendarProps) {
	const today = new Date();
	const minDate = getNextWeekday(today);
	const maxDate = addDays(today, 16);

	//this is because we need to change from Year-Month-Day to Month-Day-Year (https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off)
	// const newDate = new Date(
	// 	value.toString().slice(5, 7) +
	// 	"-" +
	// 	value.toString().slice(8, 10) +
	// 	"-" +
	// 	value.toString().slice(0, 4)
	// );

	// console.log("in calender object passed with", value, "new date:", newDate);

	const getDateClass = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {
		/**
		 * Disable weekends
		 * Disable all dates if disabled is true
		 */

		if (date.getDay() === 0 || date.getDay() === 6) {
			return "unavailable";
			//return true;
		}

		return getDateAvailability(date, availability);
	};
	// how we know wether to disable date or not
	const tileDisabled = (date: Date) => {


		if (disabled) {
			return true;
		}

		if (date.getDay() === 0 || date.getDay() === 6) {
			return true;
		}
		if (
			["available", "waitlist"].includes(getDateAvailability(date, availability))
		) {
			return false;
		}
		return true;
	};


	// sets classes based on availability
	const tileClassNameHandler = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {

		if (tileDisabled(date)) {
			return styles.disabled;
		}

		if (date.getTime() === value.getTime()) {
			return styles.selected;
		}
		let status = "unavailable";
		status = getDateAvailability(date, availability);

		const className = styles[status];
		return className;
	};

	// handles if we can click on a date or not
	const dateChangeHandler = (date: Date) => {
		//prevent changing dates to disabled dates
		if (tileDisabled(date)) {
			return;
		}
		onChange(date);
	};

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
				//tileDisabled={disableDateHandler}
				tileClassName={tileClassNameHandler}
				tileContent={({ date, view }) => {

					if (tileDisabled(date)) {
						return null;
					}

					const status = getDateClass({
						activeStartDate: date,
						date,
						view,
					});
					return <AvailabilityIndicator availability={status} />;
				}}
			/>
		</div>
	);
}

export default Calender;
