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
  ]);
  await knex('courses').del();
  await knex('courses').insert([
    { name: "Spanish 101", code: "SPAN", language: "spanish" },
    { name: "German 101", code: "GERM", language: "german" },
    { name: "English 101", code: "ENGL", language: "english" },
  ]);
};
