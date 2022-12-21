/////MUST ME .MJS FILE EXTENSION!!
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("languages", (table) => {
      table.string("name").primary();
      table.integer("reserved_seats").defaultTo(0).notNullable();
      table.integer("tablesOf6").defaultTo(0).notNullable();
      table.integer("tablesOf8").defaultTo(0).notNullable();
    })
    .createTable("courses", (table) => {
      table.string("code").primary();
      table.string("name").notNullable();
      table.string("language").notNullable();
      table.foreign("language").references("languages.name");
    })
    .createTable("faculty", (table) => {
      table.string("language").notNullable();
      table.foreign("language").references("languages.name");
      table.string("contact_email").notNullable();
      table.boolean("daily_reports").defaultTo(false).notNullable();
      table.boolean("weekly_reports").defaultTo(false).notNullable();
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("faculty").dropTable("courses").dropTable("languages");
};
