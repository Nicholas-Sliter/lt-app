import React, { useState, useEffect } from "react";
import { getCourses, getLanguages } from "../lib/backend/database-utils";
import Course from "../types/Course/index";
import Language from "../types/Language/index";
import styles from "../styles/Home.module.scss";
import ReservationForm from "../components/ReservationForm";
import PageTitle from "../components/PageTitle";

interface HomeProps {
  languages: Language[];
  courses: Course[];
}

interface SignupProps {
    languages: Language[];
    courses: Course[];
}

export async function getServerSideProps(context: any) {

  const res = await Promise.all([getLanguages(), getCourses()]);
  const languages = res[0];
  const courses = res[1];

  return {
    props: {
      languages,
      courses,
    } as HomeProps,
  };
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

function Home({ languages, courses }: HomeProps) {

  return (
    <div>
      <Signup languages={languages} courses={courses} />
    </div>
  );
}
export default Home;
