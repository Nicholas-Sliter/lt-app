/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("languages").del();
  await knex("languages").insert([
    { name: "spanish", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
    { name: "german", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
    { name: "english", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
    { name: "french", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
  ]);
  await knex('courses').del();
  await knex('courses').insert([
    { name: "Spanish 101", code: "SPAN101", language: "spanish" },
    { name: "German 101", code: "GERM101", language: "german" },
    { name: "English 101", code: "ENGL101", language: "english" },
  ]);
  await knex('reservations').del();
  await knex('reservations').insert([
    { id: "3", first_name: "a", last_name: "b", email: "a", course: "SPAN101", middlebury_id: 0, created_at: "no", language: "spanish", date: "2022-10-24T04:00:00.000Z" }
  ]);
};
