const mysql = require('mysql2')

console.log("ENV CHECK DB_HOST:", process.env.DB_HOST)
console.log("ENV CHECK DB_USER:", process.env.DB_USER)
console.log("ENV CHECK DB_NAME:", process.env.DB_NAME)

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
})

db.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err)
  } else {
    console.log('Koneksi database berhasil 💾')
  }
})

module.exports = db