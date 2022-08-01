import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import React from "react";
import styles from "./CancelReservation.module.scss";
import { useState } from "react";
export default function CancelReservation(props) {
  const [studentID, setStudentID] = useState("");
  var dateValue = props.date;
  return (
    <div className={styles.secondCol}>
      <Row className={styles.row}>
        <Col>
          <div className={styles.dateTitleClass}>
            {" "}
            Cancel Reservation for <br />
            {dateValue.toString().slice(0, 10)}
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
      </div>
    </div>
  );
}
