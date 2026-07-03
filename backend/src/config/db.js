import mysql from 'mysql2'
import  dotenv from 'dotenv';
dotenv.config();

const resolvedPort = Number(
  process.env.RENDER_DB_PORT ||
  process.env.RENDER_MYSQL_PORT ||
  process.env.RLWY_DB_PORT ||
  process.env.DB_PORT ||
  process.env.MYSQLPORT ||
  3306
);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number.isFinite(resolvedPort) ? resolvedPort : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
