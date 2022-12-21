/**
 * Backend databse utililty functions
 */

import { Availability } from "../../types/Availability";
import Course from "../../types/Course";
import Language from "../../types/Language";
import { stringFormattedDate } from "../common/utils";
import knex from "./knex";

/**
 * A function that gets informaiton about a date
 * @param datePassed The date of the reservations to get.
 * @returns the table of reservations.
 *
 */
export async function getDateInfo(datePassed, languagePassed): Promise<any> {
    console.log("in getdate info in database Utils", datePassed, languagePassed);
    const review = await knex("reservations").where({
        date: datePassed,
        language: languagePassed.toLowerCase(),
    });
    // console.log("in get date info and got", review, "with:", datePassed.toISOString(), languagePassed)
    if (!review) {
        return [];
    }
    return review;
}

/**
 * A function that makes a reservation about a date
 * @params
 * @returns A promise that resolves to the review or null if it doesn't exist.
 *
 */
export async function makeRes(
    firstName: any,
    lastName: any,
    email: any,
    language: any,
    course: any,
    middID: any,
    resDate: any,
    type: any,
    is_cancelled: any,
    on_waitlist: any,
    attended: any
): Promise<any> {
    const review = await knex("reservations").insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        middlebury_ID: middID,
        language: language,
        type: "student",
        date: resDate,
        is_cancelled: is_cancelled,
        on_waitlist: on_waitlist,
        attended: attended,
        created_at: resDate,
    });

    if (!review) {
        return null;
    }
    return review;
}

/**
 * A function that gets informaiton about a date
 * @param passedLanguage The language info to get
 * @returns the language info
 *
 */
export async function getLanguageInfo(passedLanguage: string): Promise<any> {
    console.log("in passed language:", passedLanguage);
    const languagetable = await knex("languages").where({
        name: passedLanguage.toLowerCase(),
    });
    // console.log("did search get any info?", languagetable)
    if (!languagetable) {
        return null;
    }
    return languagetable;
}

export async function getLanguages(): Promise<Language[]> {
    const languages = await knex("languages")
        .select(["name"]);

    if (!languages) {
        return [];
    }
    return languages;
}


export async function getCourses(): Promise<Course[]> { //Record<string, Course[]>
    const courses = await knex("courses")
        .select(["name", "language", "code"]);

    if (!courses) {
        return [];
    }

    // const coursesByLanguage: Record<string, Course[]> = {};
    // for (const course of courses) {
    //     if (!coursesByLanguage[course.language]) {
    //         coursesByLanguage[course.language] = [];
    //     }
    //     coursesByLanguage[course.language].push(course);
    // }

    return courses;
}



export async function getDateAvailabilities(dates: Date[], language: string): Promise<Availability> {
    const reservations = await knex("reservations")
        .select(["date", "language"])
        .whereIn("date", dates.map(date => date.toISOString()))
        .andWhere({ language })
        .groupBy("date", "language")
        .count("* as count");

    const languageInfo = await knex("languages")
        .select(["name", "reserved_seats", "tablesOf6", "tablesOf8"])
        .where({ name: language });

    const availabilities: Availability = {};
    for (const date of dates) {
        const dateISOString = stringFormattedDate(date);
        const reservationCount = +(reservations.find(reservation => reservation.date === dateISOString)?.count ?? 0);
        const reservedSeats = languageInfo[0].reserved_seats;

        const tablesOf6 = languageInfo[0].tablesOf6;
        const tablesOf8 = languageInfo[0].tablesOf8;

        const totalSeats = tablesOf6 * 6 + tablesOf8 * 8;
        const availableSeats = totalSeats - reservedSeats - reservationCount;

        availabilities[dateISOString] = availableSeats > 0 ? "available" : "waitlist";

    }

    return availabilities;
}