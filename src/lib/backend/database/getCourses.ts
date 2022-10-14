import knex from "../knex";
import { courses } from "../../../../data/expConst.js"


interface Course {
    name: string;
    code: string;
}


async function getCourses(language: string): Promise<Course[]> {
    console.log("getCOuses with lang: ", language)
    var posCourses = courses[language]
    console.log("pos", posCourses)
    // const courses = await knex("courses")
    //     .where("language", language)
    //     .select("courses.name", "courses.code");

    if (!posCourses) {
        return [];
    }
    return posCourses;
}


export default getCourses;