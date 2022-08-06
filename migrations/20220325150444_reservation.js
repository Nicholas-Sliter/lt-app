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
      table.boolean("attended").defaultTo(null);
      table.dateTime("cancelled_at").defaultTo(null);
      table.dateTime("attended_at").defaultTo(null);
      
    })
    .createTable("waitlist", (table) => {
      table.increments("id").primary();
      table.foreign("id").references("reservations.id");
      table.integer("position").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.dateTime("added_at").notNullable();
      table.dateTime("removed_at").defaultTo(null);
      table.dateTime("accepted_at").defaultTo(null);
      table.dateTime("rejected_at").defaultTo(null);
      table.dateTime("accepted_by").defaultTo(null);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("reservations").dropTable("waitlist");
};
