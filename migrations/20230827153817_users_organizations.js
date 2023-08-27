/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('users_organization', function (table) {
            table.increments('id');
            table.bigInteger('organization_id').index().references('id').inTable('organizations');
            table.bigInteger('user_id').index().references('id').inTable('users');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("users_organization");
};
