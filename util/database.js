const Pool = require("pg-pool");

const pool = new Pool({
  host: process.env.POSTRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  database: process.env.POSTGRESQL_DB,
  port: process.env.POSTGRESQL_PORT,
  password: process.env.POSTGRESQL_PASSWORD,
});

module.exports = pool;
