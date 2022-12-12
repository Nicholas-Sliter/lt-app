import React, { useState } from "react";
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
    const [currentLang, setCurrentLang] = useState(null);

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

    // const onSubmitHandler = (data: {
    //     first_name: string;
    //     last_name: string;
    //     email: string;
    //     language: string;
    //     date: Date;
    //     course: string;
    //     middlebury_id: string;
    // }) => {
    //     //convert formobj to reservation request
    //     console.log("onSubmitHandler", data);
    //     makeReservation(
    //         data.first_name,
    //         data.last_name,
    //         data.email,
    //         data.language.toLowerCase(),
    //         data.date,
    //         data.course,
    //         data.middlebury_id
    //     );
    // };

    const catchChange = async (curLang: string) => {
        console.log("language change");
        // var curData = getAvail("2022-10-18T04:00:00.000Z", curLang.toLowerCase()).then(res => console.log("res", res))
        //  console.log("got:", curData)
    };

    // const language = watch("language");

    // if (language != null && language != currentLang) {
    //     setCurrentLang(language);
    //     catchChange(language);
    //     getAvail(language).then((result: { [key: string]: string }) =>
    //         setAvail(result)
    //     );
    // }

    // const disabled = !Boolean(language);

    // //TODO: make this into a fucntion
    // const languages = (useLanguages() ?? []).map((l) => ({
    //     value: l,
    //     label: l,
    // }));
    // // const courses = (useCourses(language) ?? []).map(c => ({ value: c.name, label: c.name }));
    // const courses = useCourses("language").map((l) => ({ value: l, label: l }));
    // console.log(languages);
    // console.log("courses:", courses);

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
            selectedDate,
            selectedCourse,
            ID
        );
    };
    // console.log(var1.toISOString())
    return (
        <>
            <FormBox>
                <TextField
                    name="language"
                    label="Language"
                    title="Language"
                    defaultValue={languages[0].value ?? null}
                    autoFocusIfEmpty
                    variant="outlined"
                    // disabled={disabled}
                    size="small"
                    select
                    // options={languages}
                    // register={register}
                    validation={{ required: "Please select a language" }}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedLanguage(e.target.value);
                    }}
                >
                    {languages.map((option, index) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    name="course"
                    label="Course"
                    title="Course"
                    defaultValue={null}
                    autoFocusIfEmpty
                    variant="outlined"
                    size="small"
                    select
                    onChange={(e) => {
                        console.log("changed the course: ", e.target.value);
                        setSelectedCourse(e.target.value);
                    }}
                >
                    {selectedLanguage &&
                        courses[selectedLanguage].map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </TextField>
            </FormBox>
            <Calendar
                value={selectedDate}
                availability={avail}
                language={selectedLanguage}
                onChange={(e) => {
                    console.log("e:", e.toISOString().split("T")[0]);
                    setSelectedDate(e.toISOString().split("T")[0]);
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
                    {true ? "Reserve" : "Join Waitlist"}
                </Button>
            </FormBox>
        </>
    );
}

export default ReservationForm;
