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
export async function getDateInfo(): Promise<any> {
  const review = await knex("languages").where({ name: "Spanish" });

  if (!review) {
    return null;
  }
  return review;
}

/**
 * A function that gets informaiton about a date
 * @params
 * @returns A promise that resolves to the review or null if it doesn't exist.
 *
 */

/*
 export async function insertIntoDB(firstname:String, lastname:String, language:String, Course: String, date: Date)){
   const makeRequest = await knex("reservations").insert({
       first_name: firstname
   })
}

*/
