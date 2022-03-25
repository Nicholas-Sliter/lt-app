const { languages } = require("../data/constants");

exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("reservations", (table) => {
      table.increments("id").primary();
      table.dateTime("date").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("middlebury_id").notNullable();
      table.dateTime("created_at").notNullable();
      table.enum("language", languages).notNullable();
      table
        .enum("type", ["student", "ta", "faculty", "guest"])
        .defaultTo("student")
        .notNullable();
      table.boolean("is_cancelled").defaultTo(false).notNullable();
      table.boolean("on_waitlist").defaultTo(false).notNullable();
      table.boolean("attended").defaultTo(false).notNullable();
    })
    .createTable("waitlist", (table) => {
      table.increments("id").primary();
      table.foreign("id").references("reservations.id");
      table.integer("position").notNullable();
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("reservations").dropTable("waitlist");
};
