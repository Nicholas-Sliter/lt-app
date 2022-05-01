/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("courses").del();
  await knex("courses").insert([
    { name: "Spanish Class 1", code: "122", language: "Spanish" },
  ]);
};
