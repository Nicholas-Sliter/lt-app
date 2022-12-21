import React, { useState, useEffect } from "react";
import Signup from "../components/Signup";
import { getCourses, getLanguages } from "../lib/backend/database-utils";
import Course from "../types/Course";
import Language from "../types/Language";

interface HomeProps {
  languages: Language[];
  courses: Course[];
}


export async function getServerSideProps(context) {

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


function Home({ languages, courses }: HomeProps) {

  return (
    <div>
      <Signup languages={languages} courses={courses} />
    </div>
  );
}
export default Home;
