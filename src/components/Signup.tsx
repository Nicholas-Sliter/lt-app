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


    return (
        <div className={styles.container}>
            <PageTitle title="LT Reservation Form" />
            <ReservationForm
                languages={languages}
                courses={courses}
            />
        </div>
    );
}

export default Signup;
