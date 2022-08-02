import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import React from "react";
import styles from "./CancelReservation.module.scss";
import { useState } from "react";
export default function CancelReservation(props) {
  const [studentID, setStudentID] = useState("");
  const [reservations, setReservations] = useState([]);

  //actually make api request to get reservations
  const makeGetRes = async () => {
    const response = await fetch("/api/getRes", {
      method: "POST",
      body: JSON.stringify({
        middID: studentID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const returnedData = await response.json();
    setReservations(returnedData.data);
    console.log(returnedData.data);
  };

  const makeCancelRes = async (id) => {
    const response = await fetch("/api/cancelRes", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const returnedData = await response.json();
    setReservations(returnedData.data);
    console.log(returnedData.data);
  };

  var dateValue = props.date;
  return (
    <div className={styles.secondCol}>
      <Row className={styles.row}>
        <Col>
          <div className={styles.dateTitleClass}>
            {" "}
            Cancel Reservation
            {/* for <br />
            {dateValue.toString().slice(0, 10)} */}
            {/* {language ? language.label : "NONE"} */}
          </div>
        </Col>
      </Row>
      <div className={styles.languageRow}>
        <div>Enter Student ID</div>
        <input
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        ></input>
        <button onClick={(e) => makeGetRes()}> Search </button>
      </div>
      <div>
        {reservations.map((reservation) => {
          return (
            <div key={reservation.id} className={styles.reservationList}>
              <div>{new Date(reservation.date).toDateString()} </div>
              <div> {reservation.language} </div>
              {new Date(reservation.date) > new Date() ? (
                <div>
                  <button onClick={(e) => makeCancelRes(reservation.id)}>
                    {" "}
                    Cancel{" "}
                  </button>
                </div>
              ) : (
                <div> no </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
