import mysql from 'mysql2'
import * as dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log("🚀 ~ file: db_config.js ~ line 7 ~ process.env.DB_HOST", process.env.DB_HOST)

db.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

export default db
