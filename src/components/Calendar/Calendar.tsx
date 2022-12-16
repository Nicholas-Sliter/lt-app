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

	const disableDateHandler = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {
		//true = disabled
		/**
		 * Disable weekends
		 * Disable all dates if disabled is true
		 */
		if (date.getDay() === 0 || date.getDay() === 6) {
			return true;
		}
		if (newAvail[date.toISOString()] == "unavailable") {
			return true;
		} else {
			return false;
		}

		return disabled ?? false;
	};

	const tileDisabled = (date: Date) => {
		if (date.getDay() === 0 || date.getDay() === 6) {
			return true;
		}
		if (newAvail[date.toISOString()]= "available") {
			return false;
		} else {
			return true;
		}
		return disabled ?? false;
	};

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

	const tileStatusHandler = ({
		activeStartDate,
		date,
		view,
	}: CalendarTileProperties) => {
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

		if (date.getTime() === newDate.getTime()) {
			statusArray.push("selected");
		}

		if (availability) {
			statusArray.push(
				newAvail[date.toISOString()] ?? "unavailable"
			);
		}

		return statusArray;
	};

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
		}
		console.log(
			"availability.data: ",
			availability?.data,
			", and",
			newAvail[date.toISOString()],
			"for date: ",
			date.toISOString()
		);

		const className = styles[status];
		return className;
	};

	const dateChangeHandler = (date: Date) => {
		//prevent changing dates to disabled dates
		if (
			disableDateHandler({ activeStartDate: date, date, view: "month" })
		) {
			return;
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
				tileDisabled={disableDateHandler}
				tileClassName={tileClassNameHandler}
				tileContent={({ date, view }) => {
					const hidden = disableDateHandler({
						activeStartDate: date,
						date,
						view,
					});
					if (hidden) {
						return null;
					}
					return <AvailabilityIndicator availability="unavailable" />;
				}}
			/>
		</div>
	);
}

export default Calender;
