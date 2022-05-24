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
 * @param reviewId The id of the review to get.
 * @returns A promise that resolves to the review or null if it doesn't exist.
 *
 */
export async function getDateInfo(datePassed): Promise<any> {
  const review = await knex("reservations").where({ date: datePassed });

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
