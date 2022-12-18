/**
 * Backend databse utililty functions
 */

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

export async function getLanguages(): Promise<any> {
	const languages = await knex("languages");

	if (!languages) {
		return null;
	}
	return languages;
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
         updated = await knex("reservations").update({attended_at: date}).where({

			language: language.toLowerCase(),
			email: person,
			date: date,
        })
        console.log("updated:", await updated)
    }
    return updated;
}
