import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import TextInput from "../Widgets/TextInput";
import styles from "./ReservationForm.module.scss";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import FormBox from "../FormBox";
import Calendar from "../Calendar";
import { debounceLeading, getNextWeekday, toTitleCase } from "../../lib/frontend/utils";
import Course from "../../types/Course";
import Language from "../../types/Language";
import Checkbox from "@mui/material/Checkbox";
import { Availability } from "../../types/Availability";
import API_Adaptor from "../../lib/frontend/adaptor";
import useAvailability from "../../hooks/useAvailability";
import { stringFormattedDate } from "../../lib/common/utils";
import SnackAlert from "../SnackAlert";

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
    languages: Language[],
    courses: Course[]
}
// const submitMessage = (firstnameINPUT, lastnameINPUT, course) => {
//     console.log("hangleSubmit");
//     // evt.preventDefault();
//     //submitRes();
//     // alert(
//     //   `Name = ${firstnameINPUT.toString()} and ${lastnameINPUT.toString()} , \n Course = ${course.toString()}`
//     // );
// }


interface RegistrationInfo {
    submitted: boolean;
    error: boolean;
    message: string;
}

function ReservationForm({
    languages,
    courses
}: ReservationFormProps) {

    // const defaultValues = {
    //     date: formData?.date ?? getNextWeekday(new Date())
    // };

    const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
        submitted: false,
        error: false,
        message: ""
    });

    const [showSnackbar, setShowSnackbar] = useState(false);

    const { register, handleSubmit, watch, control } = useForm({
        shouldUseNativeValidation: true,
    });

    const language: string = useWatch({
        name: "language",
        control,
        defaultValue: ''
    });
    const course: string = useWatch({
        name: "course",
        control,
        defaultValue: ''
    });
    const date: string = stringFormattedDate(watch("date"));
    const firstName: string = watch("first_name");
    const lastName: string = watch("last_name");
    const email: string = watch("email");
    const middlebury_id: string = watch("middlebury_id");


    const todayISO = stringFormattedDate(new Date());
    const WINDOW_LENGTH = 16;
    const availability = useAvailability(todayISO, language, WINDOW_LENGTH);

    const dateAvailability = availability[date] ?? "unavailable";

    const disableCalendar = !language || !course;
    const disableSubmit = !firstName || !lastName || !email || !middlebury_id || !language || !course; // || !date

    let submitText = ""
    if (disableCalendar || !date) {
        submitText = "Select Date";
    }
    else if (dateAvailability == "available") {
        submitText = "Reserve";
    } else if (dateAvailability == "unavailable") {
        submitText = "Date Unavailable";
    } else if (dateAvailability == "waitlist") {
        submitText = "Join Waitlist";
    }



    return (
        <>
            <FormBox>
                <TextInput
                    name="language"
                    label="Language"
                    title="Language"
                    autoFocusIfEmpty
                    select
                    options={languages.map((language) => { return { value: language.name, label: toTitleCase(language.name) } })}

                    register={register}
                    validation={{ required: "Please select a language" }} />
                <TextInput
                    name="course"
                    label="Course"
                    title="Course"
                    select
                    options={courses.filter((course) => course.language == language).map((course) => { return { value: course.code, label: course.name } })}
                    disabled={!language}
                    register={register}
                />
            </FormBox>
            <Controller
                name="date"
                control={control}
                defaultValue={getNextWeekday(new Date())}
                render={({ field }) => {
                    return (
                        <Calendar
                            onChange={(e) => {
                                field.onChange(e)
                            }}
                            value={field.value}
                            disabled={disableCalendar}
                            availability={availability}
                        />)
                }}
            />
            <FormBox>

                <TextInput
                    name="first_name"
                    label="First Name"
                    key="first_name"
                    register={register}
                    validation={{ required: "Please enter your first name" }}
                />
                <TextInput
                    name="last_name"
                    label="Last Name"
                    key="last_name"
                    register={register}
                    validation={{ required: "Please enter your last name" }}
                />
                <TextInput
                    name="email"
                    label="Email"
                    key="email"
                    register={register}
                    validation={{ required: "Please enter your email" }}
                />
                <TextInput
                    name="middlebury_id"
                    label="Middlebury ID"
                    key="middlebury_id"
                    register={register}
                    validation={{
                        required: "Please enter your Middlebury ID.",
                        pattern: "/^[0-9]{8}$/",
                    }}
                />
                {/* <Checkbox defaultChecked={false} title={"Save personal information"} /> */}
            </FormBox>
            <FormBox invisible>
                <Button
                    variant="contained"
                    onClick={
                        debounceLeading(
                            handleSubmit(() => {
                                console.log("submitted with:", firstName, lastName, email, language.toLowerCase(), date, course, middlebury_id);
                                setRegistrationInfo({
                                    submitted: true,
                                    error: false,
                                    message: "Reserved successfully!"
                                });
                                setShowSnackbar(true);

                            }), 1000)}
                    disabled={disableSubmit}
                >
                    {submitText}
                </Button>
            </FormBox>
            <SnackAlert
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                severity={registrationInfo.error ? "error" : "success"}
                message={registrationInfo.message}
            />

        </>
    );
}

export default ReservationForm;

