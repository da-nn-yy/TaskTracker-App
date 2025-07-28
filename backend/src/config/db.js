import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

export default pool;
