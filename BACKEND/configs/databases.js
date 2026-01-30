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

// แก้ภาษาต่างดาว
connection.on('connection', function (connection) {
  connection.query('SET NAMES "utf8"');            
});

// สำหรับเก็บ logs ลงฐานข้อมกูลบน docker
const logDB = mysql.createPool({
  host      : process.env.THPH_LOG_HOST,
  user      : process.env.THPH_LOG_USER,
  password  : process.env.THPH_LOG_PASS,
  database  : process.env.THPH_LOG_DATABASES,
  charset   : process.env.THPH_LOG_CHARSET,
  port      : process.env.THPH_LOG_PORT
})
logDB.on('connection',  c => c.query('SET NAMES utf8mb4'));

/* ===== สร้าง table lab_logs ถ้ายังไม่มี ===== */
const createLogTableSQL = `
CREATE TABLE IF NOT EXISTS lab_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50),
  action VARCHAR(100) NOT NULL,
  detail TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

logDB.query(createLogTableSQL, err => {
  if (err) {
    console.error('❌ Create lab_logs table failed:', err);
  } else {
    console.log('✅ lab_logs table ready');
  }
});

module.exports = {connection, logDB};