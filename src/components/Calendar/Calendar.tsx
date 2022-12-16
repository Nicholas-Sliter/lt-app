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
	};
}

function Calender({ onChange, value, disabled, availability }: CalendarProps) {
	console.log("in calender: got: ", availability);
	var newAvail = {};
	if (availability != null && availability?.data != null) {
		console.log("availabiltiy is not null: ", availability);
		for (let [key, value] of Object.entries(availability.data)) {
			console.log("log:", key, value);
			newAvail[key + "T05:00:00.000Z"] = value;
		}
		//		var availability = newAvail;
		console.log(
			"newAvail: ",
			newAvail,
			"new availability object",
			availability
		);
	}

	const today = new Date();
	const minDate = today;
	const maxDate = addDays(today, 30);

	//this is because we need to change from Year-Month-Day to Month-Day-Year (https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off)
	const newDate = new Date(
		value.toString().slice(5, 7) +
			"-" +
			value.toString().slice(8, 10) +
			"-" +
			value.toString().slice(0, 4)
	);

	console.log("in calender object passed with", value, "new date:", newDate);

	const getDateClass = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {
		//true = disabled
		/**
		 * Disable weekends
		 * Disable all dates if disabled is true
		 */
		//	console.log("in disableDateHandler with date:", date.toISOString());
		/*	console.log(
			"newAvail[date.toIsoshit] is ",
			newAvail[date.toISOString()]
		);
	 */
		if (date.getDay() === 0 || date.getDay() === 6) {
			return "unavailable";
			//return true;
		}
		if (newAvail[date.toISOString()] == "unavailable") {
			return "unavailable";
			//return true;
		}
		if (
			newAvail[date.toISOString()] == "available" ||
			newAvail[date.toISOString()] == "waitlist"
		) {
			return "available";
			//return false;
		}

		return "unavailable";
	};
	// how we know wether to disable date or not
	const tileDisabled = (date: Date) => {
		// false = enabled. true = disabled
		return true;
		if (date.getDay() === 0 || date.getDay() === 6) {
			return true;
		}
		if (
			newAvail[date.toISOString()] == "available" ||
			newAvail[date.toISOString()] == "waitlist"
		) {
			return false;
		} else {
			return true;
		}
		return disabled ?? true;
	};
	/*
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
	};
 */
	/*
	const tileStatusHandler = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {
	//	
		// Handle both disabled and availability
		 //

		const statusArray: string[] = [];
		if (tileDisabled(date)) {
			//takes precedence over all other statuses
			return ["disabled"];
		}

		if (date < today) {
			return ["past"];
		}

		if (date.getTime() === newDate.getTime()) {
			statusArray.push("selected");
		}

		if (availability) {
			statusArray.push(newAvail[date.toISOString()] ?? "unavailable");
		}

		return statusArray;
	};
	*/

	// sets classes based on availability
	const tileClassNameHandler = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {
		if (date.getTime() === newDate.getTime()) {
			return styles.selected;
		}
		let status = "unavailable";
		if (date.toISOString() in newAvail) {
			status = newAvail[date.toISOString()];
			//console.log("date in newAvail");
			status = newAvail[date.toISOString()];
		}
		/*		console.log(
			"availability.data: ",
			availability?.data,
			", and",
			newAvail[date.toISOString()],
			"for date: ",
			date.toISOString()
		);
 */
		const className = styles[status];
		return className;
	};

	// handles if we can click on a date or not
	const dateChangeHandler = (date: Date) => {
		//prevent changing dates to disabled dates
		if (getDateClass == "unavailable") {
			//	console.log("disableDate handler returned true");
			return;
		} else {
			//	console.log("disableDate handler returned false");
		}
		onChange(date);
	};

	return (
		<div>
			<Calendar
				onChange={dateChangeHandler}
				value={newDate}
				minDate={today}
				maxDate={maxDate}
				maxDetail="month"
				minDetail="month"
				prev2Label={null}
				next2Label={null}
				//				tileDisabled={disableDateHandler}
				tileClassName={tileClassNameHandler}
				tileContent={({ date, view }) => {
					const hidden = getDateClass({
						activeStartDate: date,
						date,
						view,
					});
					//}
//					console.log("what is hidden?", hidden);
					return <AvailabilityIndicator availability={hidden} />;
				}}
			/>
		</div>
	);
}

export default Calender;
