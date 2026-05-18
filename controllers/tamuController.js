// ambil semua data tamu
const db = require('../models/db')

const getAllTamu = (req, res) => {
  const sql = 'SELECT * FROM tamu ORDER BY id DESC'

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err })
    }

    res.json(results)
  })
}

// ambil data tamu by id
const getTamuById = (req, res) => {
  const id = req.params.id

  const sql = 'SELECT * FROM tamu WHERE id = ?'

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err })

    if (result.length === 0) {
      return res.status(404).json({ message: 'Tamu tidak ditemukan' })
    }

    res.json(result[0])
  })
}

// tambah data tamu
const createTamu = (req, res) => {
  const {
    nama,
    nip,
    asal_tamu,
    keperluan,
    no_hp,
    email
  } = req.body

  const foto = req.file ? req.file.filename : null

  const jam_masuk = new Date()
  const status = 'DI DALAM'

  const sql = `
    INSERT INTO tamu
    (nama, nip, asal_tamu, keperluan, no_hp, email, foto, jam_masuk, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      nama,
      nip,
      asal_tamu,
      keperluan,
      no_hp,
      email,
      foto,
      jam_masuk,
      status
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err })
      }

      res.json({
        message: 'Data tamu berhasil disimpan ke database'
      })
    }
  )
}

// tombol keluar tamu
const keluarTamu = (req, res) => {
  const id = req.params.id

  const jam_keluar = new Date()
  const status = 'SELESAI'

  const sql = `
    UPDATE tamu
    SET jam_keluar = ?, status = ?
    WHERE id = ?
  `

  db.query(sql, [jam_keluar, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err })
    }

    res.json({
      message: 'Tamu berhasil keluar'
    })
  })
}

// hapus data
const hapusTamu = (req, res) => {
  const id = req.params.id

  const sql = 'DELETE FROM tamu WHERE id = ?'

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err })
    }

    res.json({
      message: 'Data berhasil dihapus'
    })
  })
}

// update data
const updateTamu = (req, res) => {
  const id = req.params.id

  const {
  nama,
  nip,
  asal_tamu,
  keperluan,
  no_hp,
  email
} = req.body

const foto = req.file ? req.file.filename : null

  const sql = `
  UPDATE tamu
  SET nama = ?, nip = ?, asal_tamu = ?, keperluan = ?, no_hp = ?, email = ?
  WHERE id = ?
  ` 

  db.query(
    sql,
    [
      nama,
      nip,
      asal_tamu,
      keperluan,
      no_hp,
      email,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err })
      }

      res.json({
        message: 'Data tamu berhasil diperbarui'
      })
    }
  )
}

// export
module.exports = {
  getAllTamu,
  getTamuById,
  createTamu,
  keluarTamu,
  hapusTamu,
  updateTamu
}