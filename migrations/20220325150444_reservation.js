const { languages } = require("../data/constants");

exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("reservations", (table) => {
      table.increments("id").primary();
      table.string("date").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("middlebury_id").notNullable();
      table.string("created_at").notNullable();
      table.enum("language", languages).notNullable();
      table
        .enum("type", ["student", "ta", "faculty", "guest"])
        .defaultTo("student")
        .notNullable();
      table.boolean("is_cancelled").defaultTo(false).notNullable();
      table.boolean("on_waitlist").defaultTo(false).notNullable();
      table.boolean("attended").defaultTo(null);
      table.string("cancelled_at").defaultTo(null);
      table.string("attended_at").defaultTo(null);
      table.boolean("is_required").defaultTo(false).notNullable();

    })
    .createTable("waitlist", (table) => {
      table.increments("id").primary();
      table.foreign("id").references("reservations.id");
      table.integer("position").notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.string("added_at").notNullable();
      table.string("removed_at").defaultTo(null);
      table.string("accepted_at").defaultTo(null);
      table.string("rejected_at").defaultTo(null);
      table.string("accepted_by").defaultTo(null);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("reservations").dropTable("waitlist");
};
