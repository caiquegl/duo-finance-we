/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('products', function (table) {
            table.increments('id');
            table.string('name');
            table.integer('qtd');
            table.float('value');
            table.bigInteger('market_id').index().references('id').inTable('markets');
            table.bigInteger('category_id').index().references('id').inTable('categories');
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
        .dropTable("products");
};
