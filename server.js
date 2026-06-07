const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const db = require('./models/db') // 🔥 PENTING TAMBAH INI

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors({
  origin: "*"
}))

// 🔥 DEBUG ENV
console.log("DB_HOST =", process.env.DB_HOST)
console.log("DB_USER =", process.env.DB_USER)
console.log("DB_NAME =", process.env.DB_NAME)


// 🔥 AUTO CREATE TABLE (TARUH DI SINI)
const createTable = `
CREATE TABLE IF NOT EXISTS tamu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100),
  nip VARCHAR(50),
  asal_tamu VARCHAR(100),
  keperluan VARCHAR(255),
  no_hp VARCHAR(20),
  email VARCHAR(100),
  foto VARCHAR(255),
  jam_masuk DATETIME,
  jam_keluar DATETIME,
  status VARCHAR(50)
)
`

db.query(createTable, (err) => {
  if (err) {
    console.log("❌ Gagal create table:", err)
  } else {
    console.log("✅ Table tamu ready")
  }
})

const createPermohonanTable = `
CREATE TABLE IF NOT EXISTS permohonan_tamu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100),
  nip VARCHAR(50),
  asal_tamu VARCHAR(100),
  keperluan VARCHAR(255),
  no_hp VARCHAR(20),
  email VARCHAR(100),
  foto VARCHAR(255),

  status VARCHAR(50) DEFAULT 'MENUNGGU',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

db.query(createPermohonanTable, (err) => {
  if (err) {
    console.log("❌ Gagal create table permohonan:", err)
  } else {
    console.log("✅ Table permohonan_tamu ready")
  }
})

// IMPORT ROUTES
const tamuRoutes = require('./routes/tamuRoutes')
const authRoutes = require('./routes/authRoutes')

// PAKAI ROUTES
app.use('/tamu', tamuRoutes)
app.use('/auth', authRoutes)

// TEST ROOT
app.get('/', (req, res) => {
  res.send('Server jalan Rara 🚀')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running di port ${PORT}`);
})