import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../Widgets/TextInput";
import styles from "./ReservationForm.module.scss";
import { Box, Button, Checkbox } from "@mui/material";
import FormBox from "../FormBox";
import Calendar from "../Calendar"
import { getNextWeekday } from "../../lib/frontend/utils";

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
    onSubmit: (data: ReservationRequest) => void;
    formData: FormData;
}


function ReservationForm({
    onSubmit,
    formData
}: ReservationFormProps) {

    const defaultValues = {
        date: formData?.date ?? getNextWeekday(new Date()),
        language: null, //formData?.language ?? "English",
        courses: formData?.courses ?? []

    }

    const { register, handleSubmit, watch, control } = useForm({ shouldUseNativeValidation: true, defaultValues });

    const onSubmitHandler = (data) => {
        //convert formobj to reservation request
        console.log(data);
        onSubmit(data);
    }

    const language = watch("language");
    const disabled = !Boolean(language)


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
                    disabled={disabled}
                    register={register}
                    validation={{ required: "Please select a course" }} />
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
                        />)
                }}
            />
            <FormBox disabled={disabled}>
                <TextInput name="first_name" label="First Name" register={register} validation={{ required: "Please enter your first name" }} />
                <TextInput name="last_name" label="Last Name" register={register} validation={{ required: "Please enter your last name" }} />
                <TextInput name="email" label="Email" register={register} validation={{ required: "Please enter your email" }} />
                <TextInput name="middlebury_id" label="Middlebury ID" title="Middlebury ID" register={register} validation={{ required: "Please enter your Middlebury ID." }} />
                <Checkbox defaultChecked={false} title={"Save personal information"} />
            </FormBox>
            <FormBox invisible>
                <Button onClick={handleSubmit(onSubmitHandler)} disabled={disabled}>Submit</Button>
            </FormBox>
            <Button
                variant="contained"

            >
                Join Waitlist
            </Button>
        </>
    );

}


export default ReservationForm;