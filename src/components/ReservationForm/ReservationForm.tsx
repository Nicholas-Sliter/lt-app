import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../Widgets/TextInput";
import styles from "./ReservationForm.module.scss";
import { Box, Button, Checkbox, MenuItem, TextField } from "@mui/material";
import FormBox from "../FormBox";
import Calendar from "../Calendar";
import { getNextWeekday } from "../../lib/frontend/utils";
import useCourses from "../../hooks/useCourses";
import useLanguages from "../../hooks/useLanguages";
import { courses, languages } from "../../../data/expConst";
import Swal from "sweetalert2";
interface ReservationRequest {
	date: Date;
	first_name?: string;
	last_name?: string;
	email?: string;
	language?: string;
	middlebury_id?: string;
	course?: string;
}

/* Contains any preset values */
interface FormData extends ReservationRequest {
	date: Date;
	language: string;
	courses?: string[];
}

interface ReservationFormProps {
	onSubmit: any;
	formData: FormData;
	submitFunction: any;
	makeReservation: any;
	getAvail: any;
}

function ReservationForm({
	formData,
	getAvail,
	makeReservation,
}: ReservationFormProps) {
	const defaultValues = {
		date: formData?.date ?? getNextWeekday(new Date()),
		language: null, //formData?.language ?? "English",
		courses: formData?.courses ?? [],
	};

	const { register, handleSubmit, watch, control } = useForm({
		shouldUseNativeValidation: true,
		defaultValues,
	});
	const [avail, setAvail] = useState({});
	const [currentDateAvail, setCurrentDateAvail] = useState("available");
	const [selectedLanguage, setSelectedLanguage] = useState(
		languages[0].value
	);
	const [selectedCourse, setSelectedCourse] = useState();
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [ID, setID] = useState();
	const [courseVal, setCourseVal] = useState(courses['Spanish'][0]);

	const catchChange = async (curLang: string) => {
		console.log("language change");
	};

	const coursesObj = courses;
	const submitButton = (e) => {
		console.log(
			"submitted with:",
			firstName,
			lastName,
			email,
			selectedLanguage.toLowerCase(),
			selectedDate,
			selectedCourse,
			ID
		);
		makeReservation(
			firstName,
			lastName,
			email,
			selectedLanguage.toLowerCase(),
			selectedCourse,
			ID,
			selectedDate,
			"student",
			false,
            currentDateAvail,
			false
		);
		
		getAvailability(selectedLanguage)
	};

	const getAvailability = async (newLanguage) => {
		console.log("newLanguage");
		var returnedAvail = await getAvail(newLanguage);
		console.log("returns New avail:", await returnedAvail);
		setAvail(await returnedAvail);
	};

	useEffect(() => {
		getAvailability("spanish")
	}, [])
		/*
	useEffect(() => {
		var tempLang = selectedLanguage;
		//tempLang[0] = tempLang[0].toUpperCase() 
		var tempClass = courses[tempLang]
		setDefaultVal("G100")
	}, [selectedLanguage])
		*/
	return (
		<>
			<FormBox>
				<div className={styles.language}>
					<div className={styles.courseTitle}>Langauge:</div>
					<TextField
						name="language"
						label=""
						title=""
						defaultValue={languages[0].value ?? null}
						variant="outlined"
						// disabled={disabled}
						size="small"
						select
						// options={languages}
						// register={register}
						validation={{ required: "Please select a language" }}
						onChange={(e) => {
							console.log("changed langauge:", e.target.value);
							setSelectedLanguage(e.target.value);
							getAvailability(e.target.value);
							console.log("trying to change defVal", courses[e.target.value][0])
							setCourseVal(courses[e.target.value][0])
						}}
					>
						{languages.map((option, index) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</div>
				<div className={styles.courseName}>
					<div className={styles.courseTitle}>Course</div>
					<TextField
						name="course"
						label=""
						title=""
						defaultValue={courseVal}
						value = {courseVal}
						variant="outlined"
						classes={styles.textTest}
						size="small"
						placeholder="P"
						fullWidth
						select
						onChange={(e) => {
							console.log("changed the course: ", e.target.value);
							setSelectedCourse(e.target.value);
							setCourseVal(e.target.value)
						}}
					>
						{selectedLanguage &&
							courses[selectedLanguage].map((option, index) => (
								<MenuItem key={index} value={option}>
									{option}
								</MenuItem>
							))}
					</TextField>
				</div>
			</FormBox>
			<Calendar
				value={selectedDate}
				availability={avail}
				language={selectedLanguage}
				onChange={(e) => {
					console.log("e:", e.toISOString());
					setSelectedDate(e.toISOString().split("T")[0]);
					console.log("availability: ", avail);
					console.log(
						"avail test, ",
						avail.data?.[e.toISOString().split("T")[0]]
					);
                    setCurrentDateAvail(avail.data?.[e.toISOString().split("T")[0]])
					//if (
						//avail.data?.[e.toISOString().split("T")[0]] == "waitlist" 
					//) {
					//	setCurrentDateAvail("waitlist");
					//}
				}}
			/>
			<FormBox>
				<div className={styles.InputContainer}>
					<TextField
						name="first_name"
						label="First Name"
						size="small"
						onChange={(e) => {
							// console.log("first name: ", e);
							setFirstName(e.target.value);
						}}
						validation={{
							required: "Please enter your first name",
						}}
					/>
				</div>

				<div className={styles.InputContainer}>
					<TextField
						name="last_name"
						label="Last Name"
						size="small"
						validation={{ required: "Please enter your last name" }}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
				</div>
				<div className={styles.InputContainer}>
					<TextField
						name="email"
						label="Email"
						size="small"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						// register={register}
						validation={{ required: "Please enter your email" }}
					/>
				</div>
				<div className={styles.InputContainer}>
					<TextField
						name="middlebury_id"
						label="Middlebury ID"
						title="Middlebury ID"
						size="small"
						onChange={(e) => {
							setID(e.target.value);
						}}
						validation={{
							required: "Please enter your Middlebury ID.",
							pattern: "/^[0-9]{8}$/",
						}}
					/>
				</div>
				{/* <Checkbox defaultChecked={false} title={"Save personal information"} /> */}
			</FormBox>
			<FormBox invisible>
				<Button
					variant="contained"
					// onClick={handleSubmit(onSubmitHandler)}
					onClick={submitButton}
					// disabled={disabled}
				>
					{currentDateAvail == "available"
						? "Reserve"
						: currentDateAvail == "waitlist"
						? "Join Waitlist"
						: "Reserve"}
				</Button>
			</FormBox>
		</>
	);
}

export default ReservationForm;
