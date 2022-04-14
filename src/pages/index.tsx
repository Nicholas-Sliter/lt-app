import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TestComponent from "../components/TestComponent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { languages, courses } from "../../data/expConst";
import Select from "react-select";
import styles from "../styles/Home.module.scss";
import { makeRes } from "../lib/backend/database-utils";

function Home() {
  //define our states so we can access the data the user types
  const [dateValue, onDateChange] = useState(new Date());
  const [language, onChangeLang] = useState("");
  const [course, changeCourse] = useState("N/A");
  const [firstnameINPUT, onFirstnameCHANGE] = useState("");
  const [lastnameINPUT, onLastnameCHANGE] = useState("");

  //handler for submitting the form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitRes();
    console.log(
      `Name = ${firstnameINPUT.toString()} and ${lastnameINPUT.toString()} , \n Course = ${course.toString()}`
    );
  };

  //to submit a book into the database
  const submitRes = async () => {
    const response = await fetch("/api/makeRes", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstnameINPUT,
        lastName: lastnameINPUT,
        email: "dummy email",
        language: "language",
        course: "dummy course",
        middID: 1111,
        resDate: dateValue,
        type: "student",
        is_cancelled: false,
        on_waitlist: false,
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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.titleClass}>Middlebury Language Tables</div>
        <div className={styles.selectLang_and_Course}>
          <span>Language:</span>
          <span>
            {" "}
            <Select options={languages} onChange={onChangeLang} />{" "}
          </span>
        </div>
        <div className={styles.calenderClass}>
          {" "}
          <Calendar onChange={onDateChange} value={dateValue} />
        </div>
        <div className={styles.titleClass}>
          {" "}
          {dateValue.toString().slice(0, 10)} for{" "}
          {language ? language.label : "NONE"}
        </div>
        {/* Adding Getting Personel Data */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            First Name:
            <input
              type="text"
              value={firstnameINPUT}
              onChange={(e) => onFirstnameCHANGE(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastnameINPUT}
              onChange={(e) => onLastnameCHANGE(e.target.value)}
            />
          </label>

          <label>
            <span>Course Selection:</span>
            <span>
              {" "}
              <Select
                options={courses}
                onChange={changeCourse}
                className={styles.chooseCourse}
              />{" "}
            </span>
          </label>
          <label>
            <input
              type="submit"
              value="Submit"
              className={styles.submitButton}
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default Home;
