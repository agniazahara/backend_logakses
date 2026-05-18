const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

// 🔥 DEBUG ENV (TARUH DI SINI)
console.log("DB_HOST =", process.env.DB_HOST)
console.log("DB_USER =", process.env.DB_USER)
console.log("DB_NAME =", process.env.DB_NAME)

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())

// IMPORT ROUTES
const tamuRoutes = require('./routes/tamuRoutes')

// PAKAI ROUTES
app.use('/tamu', tamuRoutes)

// TEST ROOT
app.get('/', (req, res) => {
  res.send('Server jalan Rara 🚀')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running di port ${PORT}`);
})