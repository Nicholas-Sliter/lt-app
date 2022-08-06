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
  const review = await knex("reservations").where({
    date: datePassed,
    language: languagePassed,
  });

  if (!review) {
    return null;
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
export async function getLanguageInfo(passedLanguage): Promise<any> {
  const languagetable = await knex("languages").where({ name: passedLanguage });

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