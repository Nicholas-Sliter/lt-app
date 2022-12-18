import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { NextPage } from "next";
import Head from "next/head";
import { languages, courses } from "../../data/expConst";
import Select from "react-select";
import styles from "../styles/Home.module.scss";
import Swal from "sweetalert2";
import Calender from "../components/Calendar";
import ReservationForm from "../components/ReservationForm";

function Home() {
    //define our states so we can access the data the user types
    const [dateValue, onDateChange] = useState(new Date());
    const [studentEmail, setStudentEmail] = useState("");
    const [language, onChangeLang] = useState(languages[0].label);
    const [studentID, setStudentID] = useState("");
    const [course, changeCourse] = useState("N/A");
    const [firstnameINPUT, onFirstnameCHANGE] = useState("");
    const [lastnameINPUT, onLastnameCHANGE] = useState("");
    const [availabilitiy, setavailabilitiy] = useState("");
//    const [goOnWaitlist, setGoOnWaitlist] = useState(false)

    //handler for submitting the form
    const handleSubmit = () => {
        console.log("hangleSubmit")
       // evt.preventDefault();
        //submitRes();
        // alert(
        //   `Name = ${firstnameINPUT.toString()} and ${lastnameINPUT.toString()} , \n Course = ${course.toString()}`
        // );

        Swal.fire({
            title: "Thank you for your submittion!",
            text: `You have registered for ${firstnameINPUT.toString()} and ${lastnameINPUT.toString()} , \n Course = ${course.label.toString()}`,
            // This app is intended to be used as a platform to calculate "who pays who what". This app was inspired by watching family members struggle to calculate the amount of $ owed after family vacations.
            showClass: {
                popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp",
            },
        });
    };

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
       // handleSubmit();
       Swal.fire(
  'Good job!',
  'You clicked the button!',
  'success'
)
        console.log(data);
    };

    //function that checks the availability of the chosen date
    const getAvailability = async (availLang) => {
        // console.log("in getAvailability, with", availDate, availLang);
        const response = await fetch("/api/checkAvail", {
            method: "POST",
            body: JSON.stringify({
                language: availLang,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    };

    const defaultOption = languages[0];

    useEffect(() => {
        //getAvailability();
    }, [language, dateValue]);

    function testSubmit() {
        console.log("wft");
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>LT Reservation</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}
            </Head>
            <ReservationForm
                getAvail={getAvailability}
                makeReservation={submitRes}
            />
        </div>
    );
}

export default Home;
