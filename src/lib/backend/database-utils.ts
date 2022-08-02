/**
 * Backend databse utililty functions
 */
import knexConfig from "../../../knexfile.js";
import knexInitializer from "knex";
import { json } from "stream/consumers";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

const params = [""];
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
  console.log("get date info api call returns," + review);

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
  const languagetable = await knex("languages").where({
    name: passedLanguage,
  });
  //console.log("api call for passed language is", languagetable);
  if (!languagetable) {
    return null;
  }
  return languagetable;
}

/**
 * A function that canceles a reservation given student id and date
 * @param middID middlebury id
 * @param resDate the date of the reservation date
 * @returns A promise that resolves to the review or null if it doesn't exist.
 *
 */
export async function deleteRes(id: any): Promise<any> {
  //knex find by this date
  //set iscancelled to true
  const review = await knex("reservations")
    .where({
      id: id,
    })
    .update({ is_cancelled: true });

  if (!review) {
    return null;
  }
  return review;
}

export async function getRes(middID: any): Promise<any> {
  const resResponse = await knex("reservations").where({
    middlebury_id: middID,
    is_cancelled: false,
  });
  return resResponse;
}
