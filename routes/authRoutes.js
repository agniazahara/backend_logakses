const express = require('express')
const router = express.Router()
const db = require('../models/db')

/* =========================
   LOGIN
========================= */
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

/* =========================
   GANTI PASSWORD
========================= */
router.put('/change-password', (req, res) => {

  const {
    username,
    oldPassword,
    newPassword
  } = req.body

  const cekSql = `
    SELECT * FROM admin
    WHERE username = ? AND password = ?
  `

  db.query(
    cekSql,
    [username, oldPassword],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Server error'
        })
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Password lama salah'
        })
      }

      const updateSql = `
        UPDATE admin
        SET password = ?
        WHERE username = ?
      `

      db.query(
        updateSql,
        [newPassword, username],
        (err2) => {

          if (err2) {
            return res.status(500).json({
              success: false,
              message: 'Gagal update password'
            })
          }

          res.json({
            success: true,
            message: 'Password berhasil diganti'
          })

        }
      )

    }
  )

})

/* =========================
   GET ALL ADMIN
========================= */
router.get('/admins', (req, res) => {

  const sql = `
    SELECT id, username
    FROM admin
    ORDER BY id ASC
  `

  db.query(sql, (err, result) => {

    if (err) {

  console.log("ERROR TAMBAH ADMIN:", err)

  return res.status(500).json({
    success: false,
    error: err
  })

}

    res.json(result)

  })

})

/* =========================
   TAMBAH ADMIN
========================= */
router.post('/admins', (req, res) => {

  const { username, password } = req.body

  const sql = `
    INSERT INTO admin (username, password)
    VALUES (?, ?)
  `

  db.query(
    sql,
    [username, password],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: 'Gagal tambah admin'
        })
      }

      res.json({
        success: true,
        message: 'Admin berhasil ditambahkan'
      })

    }
  )

})

module.exports = router