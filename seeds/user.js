/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex("user").del();
  return knex("user").insert([
    {
      id: "0bae167c-42e5-11ee-be56-0242ac120002",
      user_name: "test",
      user_email: "test@email.com",
      uswer_password: "1234",
      phone_number: "905-456-3214",
    },
  ]);
};
