import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../Widgets/TextInput";
import styles from "./ReservationForm.module.scss";
import { Box, Button, Checkbox } from "@mui/material";
import FormBox from "../FormBox";
import Calendar from "../Calendar"
import { getNextWeekday } from "../../lib/frontend/utils";
import useCourses from "../../hooks/useCourses";
import useLanguages from "../../hooks/useLanguages";

const languages = [{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }, { value: "French", label: "French" }];


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
    submitFunction,
}


function ReservationForm({
    onSubmit,
    formData,
    submitFunction
}) {

    const defaultValues = {
        date: formData?.date ?? getNextWeekday(new Date()),
        language: null, //formData?.language ?? "English",
        courses: formData?.courses ?? []

    }

    const { register, handleSubmit, watch, control } = useForm({ shouldUseNativeValidation: true, defaultValues });
    const [isAvail, setIsAvail] = useState(true);
    const onSubmitHandler = (data) => {
        //convert formobj to reservation request
        console.log("onSubmitHandler", data);
        onSubmit()
    }

    const language = watch("language");
    const disabled = !Boolean(language)

    //TODO: make this into a fucntion
    const languages = (useLanguages() ?? []).map(l => ({ value: l, label: l }));
    // const courses = (useCourses(language) ?? []).map(c => ({ value: c.name, label: c.name }));
    const courses = useCourses(language).map(l => ({ value: l, label: l }))
    console.log(languages);
    console.log(courses);

    var tempDate = new Date()
    var var1 = "2022-10-18T04:00:00.000Z"
    var testAvail = {};
    testAvail[var1] = "available"
    // console.log(var1.toISOString())
    return (
        // <Box className={styles.container}>
        //     <TextInput name="language" label="Language" title="Language" register={register} validation={{ required: "Please select a language" }} />
        //     <TextInput name="first_name" label="First Name" register={register} validation={{ required: "Please enter your first name" }} />
        //     <TextInput name="last_name" label="Last Name" register={register} validation={{ required: "Please enter your last name" }} />
        //     <TextInput name="email" label="Email" register={register} validation={{ required: "Please enter your email" }} />
        //     <TextInput name="middlebury_id" label="Middlebury ID" title="Middlebury ID" register={register} validation={{ required: "Please enter your Middlebury ID." }} />
        // </Box>
        <>
            <FormBox>
                <TextInput
                    name="language"
                    label="Language"
                    title="Language"
                    autoFocusIfEmpty
                    select
                    options={languages}
                    register={register}
                    validation={{ required: "Please select a language" }} />
                <TextInput
                    name="course"
                    label="Course"
                    title="Course"
                    select
                    options={courses}
                    disabled={disabled || !courses.length}
                    register={register}
                />
            </FormBox>
            <Controller
                name="date"
                control={control}
                render={({ field }) => {
                    return (
                        <Calendar
                            onChange={field.onChange}
                            value={field.value}
                            disabled={disabled}
                            availability={testAvail}
                        />)
                }}
            />
            <FormBox disabled={disabled}>
                <TextInput name="first_name" label="First Name" register={register} validation={{ required: "Please enter your first name" }} />
                <TextInput name="last_name" label="Last Name" register={register} validation={{ required: "Please enter your last name" }} />
                <TextInput name="email" label="Email" register={register} validation={{ required: "Please enter your email" }} />
                <TextInput
                    name="middlebury_id"
                    label="Middlebury ID"
                    title="Middlebury ID"
                    register={register}
                    validation={{
                        required: "Please enter your Middlebury ID.",
                        pattern: "/^[0-9]{8}$/"
                    }} />
                <Checkbox defaultChecked={false} title={"Save personal information"} />
            </FormBox>
            <FormBox invisible>
                <Button variant="contained" onClick={handleSubmit(onSubmitHandler)} disabled={disabled}>{true ? "Reserve" : "Join Waitlist"}</Button>
            </FormBox>
        </>
    );

}


export default ReservationForm;