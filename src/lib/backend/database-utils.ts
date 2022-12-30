/**
 * Backend databse utililty functions
 */

import { Availability } from "../../types/Availability";
import Reservation from "../../types/Reservation";
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
    console.log(
        "in getdate info in database Utils",
        datePassed,
        languagePassed
    );
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

    return languages;
}



/**
 * function to delete a persons reservation
 *

 */
export async function deleteReservation(
    person: string,
    language: string,
    date: string
) {
    const current = await knex("reservations").where({
        language: language.toLowerCase(),
        email: person,
        date: date,
    });
	var updated;
	updated = await knex("reservations").where({
		language: language.toLowerCase(),
		email: person,
		date: date,
	}).del()

    return updated;
}
/**
 * function to update the status of a persons reservation
 *
 *
 */
export async function changeStatus(
    person: string,
    language: string,
    date: string
) {
    const current = await knex("reservations").where({
        language: language.toLowerCase(),
        email: person,
        date: date,
    });
    console.log("current got:", await current);
    var updated;
    if ((await current[0].on_waitlist) == 1) {
        updated = await knex("reservations").update({ on_waitlist: 0 }).where({
            language: language.toLowerCase(),
            email: person,
            date: date,
        });
        console.log("updated:", await updated)
    } else {
        updated = await knex("reservations").update({ attended_at: date }).where({

            language: language.toLowerCase(),
            email: person,
            date: date,
        })
        console.log("updated:", await updated)
    }
    return updated;
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
        .whereIn("date", dates.map(date => date.toISOString().split("T")[0]))
        .andWhere({ language })
        .groupBy("date", "language")
        .count("* as count");

    const languageInfo = await knex("languages")
        .select(["name", "reserved_seats", "tablesOf6", "tablesOf8"])
        .where({ name: language });

		console.log("langaugeReservation called with:", dates, ", langages:", language, "reservations: ", reservations)
    const availabilities: Availability = {};
    for (const date of dates) {
        const dateISOString = stringFormattedDate(date);
        const reservationCount = +(reservations.find(reservation => reservation.date === dateISOString)?.count ?? 0);
        const reservedSeats = languageInfo[0].reserved_seats;

        const tablesOf6 = languageInfo[0].tablesOf6;
        const tablesOf8 = languageInfo[0].tablesOf8;

        const totalSeats = tablesOf6 * 6 + tablesOf8 * 8;
        const availableSeats = totalSeats - reservedSeats - reservationCount;

        //availabilities[dateISOString] = availableSeats > 0 ? "available" : "waitlist";
		console.log("available seats:", availableSeats, "reservation count:", reservationCount, "for date", date)
        availabilities[dateISOString] = availableSeats > 20 ? "available" : "waitlist";

    }

    return availabilities;
}


export async function getReservation(email: string, dateString: string): Promise<any> {
    const reservation = await knex("reservations")
        .select(["email", "date", "language"])
        .where({ email, date: dateString })
        .first();

    return reservation;
}

export async function getReservations(emails: string[], dates: Date[], languages: string[]): Promise<any> {
    const reservations = await knex("reservations")
        .select(["email", "date", "language"])
        .whereIn("email", emails)
        .whereIn("date", dates.map(date => stringFormattedDate(date)))
        .whereIn("language", languages);


    return reservations;
}


export async function createReservation(reservation: Reservation) {

    const res = await knex("reservations").insert({
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        email: reservation.email,
        middlebury_ID: reservation.middlebury_id,
        language: reservation.language,
        course: reservation.course,
        type: reservation.type,
        date: reservation.date,
        is_cancelled: reservation.is_cancelled,
        on_waitlist: reservation.on_waitlist,
        attended: reservation.attended,
        created_at: reservation.created_at,
    })
        .returning("*");

    if (!res) {
        return null;
    }

//	console.log("inside createReservation. res is: ", await res); 
   // return res[0].id;
	return res;




}
