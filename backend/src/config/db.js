import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

export default pool;
