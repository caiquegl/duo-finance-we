/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('markets', function (table) {
            table.increments('id');
            table.string('date');
            table.string('market');
            table.string('total');
            table.string('type');
            table.string('type_payment');
            table.bigInteger('user_id').index().references('id').inTable('users');
            table.bigInteger('organization_id').index().references('id').inTable('organizations');
            table.bigInteger('credit_cards_id').index().references('id').inTable('credit-cards');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("markets");
};