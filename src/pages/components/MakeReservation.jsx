import Head from "next/head";
import Image from "next/image";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { languages, courses } from "./../../../data/expConst";
import Select from "react-select";
import styles from "./MakeReservation.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

import "react";

export default function MakeReservation(props) {
  var dateValue = props.date;
  //define our states so we can access the data the user types
  const [studentEmail, setStudentEmail] = useState("");
  //use spanish as the default language
  const defaultLanguage = languages[3];
  const [language, onChangeLang] = useState(defaultLanguage);
  const [studentID, setStudentID] = useState("");
  const [course, changeCourse] = useState("");
  const [firstnameINPUT, onFirstnameCHANGE] = useState("");
  const [lastnameINPUT, onLastnameCHANGE] = useState("");
  const [availabilitiy, setavailabilitiy] = useState("");
  const [isAvail, setIsAvail] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  //handler for submitting the reservation
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitRes();
    //make alert
    Swal.fire({
      title: "Thank you for your submittion!",
      text: `${firstnameINPUT.toString()} ${lastnameINPUT.toString()} , in class ${course.label.toString()} 
      has registered for the ${language.label} table for ${dateValue
        .toString()
        .slice(0, 10)}
      ${isAvail ? "" : " You are on the waitlist!"}`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  //actually make api request to submit reservation
  const submitRes = async () => {
    const response = await fetch("/api/makeRes", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstnameINPUT,
        lastName: lastnameINPUT,
        email: studentEmail,
        language: language.label,
        course: course,
        middID: studentID,
        resDate: dateValue,
        type: "student",
        is_cancelled: false,
        on_waitlist: !isAvail,
        attended: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    //getAvail call to update the number of seats remaining
    getAvailability();
  };

  //function that checks the availability of the chosen date
  const getAvailability = async () => {
    console.log(language, dateValue);
    const response = await fetch("/api/checkAvail", {
      method: "POST",
      body: JSON.stringify({
        date: dateValue,
        language: language.label,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json().then((retuend) => {
      console.log(retuend);
      //need a record of the availability
      setavailabilitiy(retuend.data);
      //boolean of if there are available seats or not
      if (retuend.data > 0) {
        setIsAvail(true);
      } else {
        setIsAvail(false);
      }
    });
  };

  //check if a user can submit
  function checkCanSubmit() {
    if (
      studentID != "" &&
      course != "" &&
      firstnameINPUT != "" &&
      lastnameINPUT != "" &&
      isAvail &&
      studentEmail != ""
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }

  useEffect(() => {
    getAvailability();
  }, [language, dateValue]);

  useEffect(() => {
    checkCanSubmit();
  }, [studentID, firstnameINPUT, lastnameINPUT, studentEmail, course, isAvail]);
  return (
    <div className={styles.container}>
      {/* make reservation options */}
      <div className={styles.secondCol}>
        <Row className={styles.row}>
          <Col>
            <div className={styles.dateTitleClass}>
              {" "}
              Make Reservation for <br />
              {dateValue.toString().slice(0, 10)}
              {/* {language ? language.label : "NONE"} */}
            </div>
          </Col>
        </Row>
        <div className={styles.languageRow}>
          <div>Language:</div>
          <div>
            {" "}
            <span>
              <Select
                options={languages}
                onChange={onChangeLang}
                placeholder={defaultLanguage.label}
              />
            </span>
          </div>
        </div>

        {/* Adding Getting Personel Data */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameRow}>
            <div className={styles.nameText}>Name: {"   "}</div>
            <div>
              <input
                placeholder="First..."
                className={styles.nameInput}
                type="text"
                value={firstnameINPUT}
                onChange={(e) => onFirstnameCHANGE(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <input
                placeholder="Last..."
                className={styles.nameInput}
                type="text"
                value={lastnameINPUT}
                onChange={(e) => onLastnameCHANGE(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.idRow}>
            <div className={styles.nameText}>Student email:</div>
            <div>
              <input
                placeholder="...@middlebury.edu"
                type="text"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.idRow}>
            <div className={styles.nameText}>StudentID:</div>
            <div>
              <input
                placeholder="00......"
                type="text"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
              />
            </div>
          </div>
          <Row className={styles.row}>
            <Col>
              <span>Course Selection:</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <Select
                options={courses[language.label]}
                onChange={changeCourse}
                className={styles.chooseCourse}
              />
            </Col>
          </Row>
          <Row>
            <div className={styles.submittionArea}>
              <div>
                {/* I dont love this */}
                {canSubmit ? (
                  <input
                    type="submit"
                    value="Submit"
                    onSubmit={handleSubmit}
                    className={styles.submitButton}
                  />
                ) : (
                  <input
                    type="submit"
                    value="Submit"
                    onSubmit={handleSubmit}
                    className={styles.submitButton}
                    disabled
                  />
                )}
              </div>
              <div
                className={
                  parseInt(availabilitiy) < 1 ? styles.notAvail : styles.Avail
                }
              >
                {parseInt(availabilitiy) < 1
                  ? "0 seats remaining"
                  : availabilitiy + " seats left "}
              </div>
            </div>
          </Row>
        </form>
      </div>
    </div>
  );
}
