import React, { useState, useEffect } from "react";
import Head from "next/head";
import Select from "react-select";
import styles from "../styles/Home.module.scss";
import ReservationForm from "../components/ReservationForm";
import Language from "../types/Language";
import Course from "../types/Course";
import PageTitle from "./PageTitle";

interface SignupProps {
    languages: Language[];
    courses: Course[];
}

function Signup({ languages, courses }: SignupProps) {


    //to submit a book into the database
    const submitRes = async (
        fname,
        lname,
        email,
        language,
        course,
        id,
        resDate,
        type,
        isCancel,
        on_waitlist,
        attended
    ) => {
        const response = await fetch("/api/makeRes", {
            method: "POST",
            body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                email: email,
                language: language,
                course: course,
                middID: id,
                resDate: resDate,
                type: "student",
                is_cancelled: false,
                on_waitlist: on_waitlist,
                attended: false,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
    };


    const defaultOption = languages[0];

    return (
        <div className={styles.container}>
            <PageTitle title="LT Reservation Form" />
            <ReservationForm
                makeReservation={submitRes}
                languages={languages}
                courses={courses}
            />
        </div>
    );
}

export default Signup;
