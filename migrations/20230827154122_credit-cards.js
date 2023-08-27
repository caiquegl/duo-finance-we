/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('credit-cards', function (table) {
            table.increments('id');
            table.string('name').notNullable();
            table.string('flag').notNullable();
            table.string('date-clode').notNullable();
            table.string('icon');
            table.bigInteger('user_id').index().references('id').inTable('users');
            table.bigInteger('organization_id').index().references('id').inTable('organizations');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("credit-cards");
};
