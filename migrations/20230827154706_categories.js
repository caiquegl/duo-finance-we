/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('categories', function (table) {
            table.increments('id');
            table.string('name');
            table.boolean('is_primary');
            table.bigint('sub_category');
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
        .dropTable("categories");
};
