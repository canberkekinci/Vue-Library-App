import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: process.env.PASSWORD,
  host: "localhost",
  database: process.env.DATABASE,
  port: process.env.DBPORT,
});

export default pool;
