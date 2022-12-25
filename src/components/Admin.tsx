import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Calender from "./Calendar";
// import TextInput from "../components/Widgets/TextInput";
import styles from "./Admin.module.scss";
import { MenuItem, TextField } from "@mui/material";
//import {getLanguages } from "../lib/backend/database-utils.ts"
//import Language from "../types/Language";
import moment from "moment"

const languages = [
	{ value: "English", label: "English" },
	{ value: "Spanish", label: "Spanish" },
	{ value: "French", label: "French" },
];

function Admin() {
	const [reservations, setReservations] = useState([]);
	const [selectedDate, setDate] = useState(

		new Date().toISOString().split("T")[0]
			);
	const [currentLanguage, setCurrentLanguage] = useState("");
	const { register, handleSubmit, watch, control } = useForm({});
	const [avail, setAvail] = useState({});

	const language = watch("language");

	if (language != null && language != currentLanguage) {
		setCurrentLanguage(language);
	}

	//handle change of the date
	function changeFunction(val) {
		console.log(
			"change function, origional val:",
			val,
			"new date:",
			new Date(val.toDateString()).toISOString().split("T")[0]
		);
		let temp = val
		setDate(temp.toISOString())
		getReservation(temp, currentLanguage);
		console.log("value in current language", currentLanguage);
	}

	//function to get the current reservations
	const getReservation =  (date:any, language:string) => {
		setDate(date)
		console.log("unparsedDate:", date)
		//possibility of no date selected/OR current date is invalid:	
		//if NOT a weeked, make api call
		let m = moment(date, 'YYYY-MM-DD')
		let tempM = new Date(m.format())
		console.log("tempDate:",tempM, tempM.getDay())
		if (tempM.getDay() !== 0 && tempM.getDay() !== 6) {
			fetch("/api/getDateInfo", {
				method: "POST",
				body: JSON.stringify({
					language: language,
					date: date.toISOString().split("T")[0],
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((promiseResponse) => {
					// console.log("resy:", promiseResponse.json());
					return promiseResponse.json();
				})
				.then((parsedReaponse) => {
					console.log(parsedReaponse.data);
					setReservations(parsedReaponse.data);
				});

		} else {
			console.log("weekend")
		}
	};

	const changeStatus = (person, date) => {
		console.log("changing status of: ", person, date);
		fetch("/api/changeStatus", {
			method: "POST",
			body: JSON.stringify({
				language: currentLanguage,
				date: date,
				person: person,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((promiseResponse) => {
				return promiseResponse.json();
			})
			.then((parsedResponse) => {
				console.log("parsedResponse resy: ", parsedResponse);
				getReservation(selectedDate, currentLanguage);
			});
	};

	const deleteReservation = (person, date) => {
		console.log("deleting reservation: ", person, date);
		fetch("/api/deleteRes", {
			method: "POST",
			body: JSON.stringify({
				language: currentLanguage,
				date: date,
				person: person,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((promiseResponse) => {
				return promiseResponse.json();
			})
			.then((parsedResponse) => {
				console.log("parsedResponse resy: ", parsedResponse);
				getReservation(selectedDate, currentLanguage);
			});
	}

	const [currency, setCurrency] = useState("EUR");

	const handleChange = (event) => {
		setCurrentLanguage(event.target.value);
		console.log(
			"changed, calling getReservation with date:",
			selectedDate,
			"language:",
			event.target.value
		);

		getReservation(selectedDate, event.target.value);
	};

	return (
		<div>
			<div className={styles.LangHolder}>
				<TextField
					id="languaeSelect"
					select
					label="Select"
					value={currentLanguage}
					onChange={handleChange}
					helperText="Please select language"
				>
					{languages.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</div>
			<div className={styles.CalHolder}>
				<div className={styles.Cal}>
					<Calender
						onChange={changeFunction}
						availability={avail}
						value = {new Date(selectedDate)}
						page = {"admin"}
					/>
				</div>
			</div>
			<div>
				{reservations.length > 0 ? (
					<div className={styles.reservations}>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Language</th>
									<th>Date</th>
									<th>Waitlist</th>
									<th>Change</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{reservations.map((res) => (
									<tr
										key={res.id}
										className={
											res.attended_at != null
												? styles.attended
												: styles.notAttended
										}
									>
										<td>
											{res.first_name} {res.last_name}
										</td>
										<td>{res.email}</td>
										<td>{res.language}</td>
										<td>{res.date}</td>
										<td>{res.on_waitlist}</td>
										<td>
											<button className = {styles.changeButton}
												onClick={() => {
													changeStatus(
														res.email,
														res.date
													);
												}}
											>
												{res.on_waitlist == 1 ? (
													<span>off waitlist </span>
												) : res.attended_at != null ? (
													<span>attended</span>
												) : (
													<span>here</span>
												)}
											</button>
										</td>
										<td>
											<button className = {styles.changeButton}
												onClick={() => {
													deleteReservation(
														res.email,
														res.date
													);
												}}
											>delete</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className={styles.noResy}>
						No reservations for selected day/language
					</div>
				)}
			</div>
		</div>
	);
}

export default Admin;
