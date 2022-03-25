/**
 * Backend databse utililty functions
 */
import knex from "knex";
import knexConfig from "../../../knexfile";
import knexInitializer from "knex";

/**
 * A function that gets informaiton about a date
 * @param reviewId The id of the review to get.
 * @returns A promise that resolves to the review or null if it doesn't exist.
 *
 */
export async function getDateInfo(id: string): Promise<any> {
  const review = await knex("reservations");

  if (!review) {
    return null;
  }

  return review;
}
