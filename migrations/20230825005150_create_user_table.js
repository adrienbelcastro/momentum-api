/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.uuid("id").primary();
    table.string("user_name").notNullable();
    table.string("user_email").notNullable();
    table.string("user_password").notNullable();
    table.string("phone_number").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
