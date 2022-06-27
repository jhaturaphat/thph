require('dotenv').config();
const mysql = require('mysql');
const connection  = mysql.createPool({
//   connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_DATABASES,
  charset         : process.env.DB_CHARSET,
  port            : process.env.DB_PORT
});

module.exports = connection;