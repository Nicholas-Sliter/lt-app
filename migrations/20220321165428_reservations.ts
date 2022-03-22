import { Knex } from "knex";
import { languages } from "../data/constants";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reservations', table => {
        table.increments('id').primary();
        table.dateTime('date').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('middlebury_id').notNullable();
        table.dateTime('created_at').notNullable();
        table.enum("language", languages).notNullable();
        table.enum("type", ["student", "ta", "faculty", "guest"]).defaultTo("student").notNullable();
        table.boolean('is_cancelled').defaultTo(false).notNullable();
        table.boolean('on_waitlist').defaultTo(false).notNullable();
        table.boolean('attended').defaultTo(false).notNullable();

    })
    .createTable('waitlist', table => {
        table.increments("id").primary();
        table.foreign("id").references("reservations.id");
        table.integer('position').notNullable();
    });


}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('reservations').dropTable('waitlist');
}

