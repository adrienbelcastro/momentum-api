require("dotenv").config();
//Update with config settings

/**
 * @type {Object.<string, import("knex").Knex.Config>}
 */
module.exports = {
  client: "mysql",
  connection: process.env.DATABASE_URL,
};
