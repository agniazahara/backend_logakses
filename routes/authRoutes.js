const express = require('express')
const router = express.Router()
const db = require('../models/db')

router.post('/login', (req, res) => {

  const { username, password } = req.body

  const sql = `
    SELECT * FROM admin
    WHERE username = ? AND password = ?
  `

  db.query(sql, [username, password], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        message: 'Login berhasil'
      })
    }

    res.status(401).json({
      success: false,
      message: 'Username atau password salah'
    })

  })

})

module.exports = router