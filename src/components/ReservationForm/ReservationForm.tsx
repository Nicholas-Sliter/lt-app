import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../Widgets/TextInput";
import styles from "./ReservationForm.module.scss";
import { Box } from "@mui/material";

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

    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });

    const onSubmitHandler = (data) => {
        //convert formobj to reservation request
        console.log(data);
        onSubmit(data);
    }


    return (
        <Box className={styles.container}>
            <TextInput name="language" label="Language" title="Language" register={register} validation={{ required: "Please select a language" }} />
            <TextInput name="first_name" label="First Name" register={register} validation={{ required: "Please enter your first name" }} />
            <TextInput name="last_name" label="Last Name" register={register} validation={{ required: "Please enter your last name" }} />
            <TextInput name="email" label="Email" register={register} validation={{ required: "Please enter your email" }} />
            <TextInput name="middlebury_id" label="Middlebury ID" title="Middlebury ID" register={register} validation={{ required: "Please enter your Middlebury ID." }} />
        </Box>
    );

}


export default ReservationForm;