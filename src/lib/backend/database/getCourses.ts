import knex from "../knex";

interface Course {
    name: string;
    code: string;
}


async function getCourses(language: string): Promise<Course[]> {
    const courses = await knex("courses")
        .where("language", language)
        .select("courses.name", "courses.code");

    if (!courses) {
        return [];
    }
    return courses;
}


export default getCourses;