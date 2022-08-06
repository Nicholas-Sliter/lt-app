import { Component } from "react";
import styles from "./TextInput.module.scss";
import { TextField } from "@mui/material";

interface TextInputProps {
    name: string;
    label?: string;
    title?: string;
    register: Function;
    validation: {
        required?: string;
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        validate?: Function;
    },
    component?: Component;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    internalLabel?: boolean;

}



function TextInput({ name, label, title, register, validation, disabled = false }: TextInputProps) {

    //const Label = label ? <label htmlFor={name}>{label}</label> : null;
    const Input = <TextField
        name={name}
        label={label}
        title={title ?? ""}
        variant="outlined"
        disabled={disabled}
        size="small"
        required={Boolean(validation.required)}
        {...register(name, validation)}
    />;

    return (
        <div className={styles.container}>
            {Input}
        </div>
    );

}

export default TextInput;