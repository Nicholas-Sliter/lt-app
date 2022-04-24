/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("languages").del();
  await knex("languages").insert([
    { name: "Spanish", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
    { name: "German", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
    { name: "French", reserved_seats: 1, tablesOf6: 1, tablesOf8: 2 },
  ]);
};
