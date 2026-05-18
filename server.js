const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

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
});