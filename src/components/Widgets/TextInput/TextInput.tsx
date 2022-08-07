import { Component } from "react";
import styles from "./TextInput.module.scss";
import { TextField, MenuItem } from "@mui/material";

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
    select?: boolean;
    options?: {
        value: string | number;
        label: string;
    }[];
    autoFocus?: boolean;
    autoFocusIfEmpty?: boolean;

}



function TextInput({ name, label, title, register, validation, disabled = false, select = false, options = [], autoFocus = false, autoFocusIfEmpty }: TextInputProps) {
    const formFields = register(name, validation)

    const Input = <TextField
        name={name}
        label={label}
        title={title ?? ""}
        defaultValue={formFields?.defaultValue ?? null}
        variant="outlined"
        disabled={disabled}
        size="small"
        select={select}
        autoFocus={autoFocus || (autoFocusIfEmpty && !formFields?.ref.current?.value)}
        required={Boolean(validation.required)}
        {...formFields}
    >
        {select && options.map((option, index) =>
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        )}
    </TextField>;

    return (
        <div className={styles.container}>
            {Input}
        </div>
    );

}

export default TextInput;