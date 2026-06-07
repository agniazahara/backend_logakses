const express = require('express')
const multer = require('multer')
const db = require('../models/db')
const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const tamuController = require('../controllers/tamuController')

router.get('/', tamuController.getAllTamu)

router.get('/permohonan', (req, res) => {

  const sql = `
    SELECT *
    FROM permohonan_tamu
    ORDER BY id DESC
  `

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err)

      return res.status(500).json({
        success: false
      })
    }

    res.json(result)

  })

})

router.get('/:id', tamuController.getTamuById)

router.post(
  '/',
  upload.single('foto'),
  tamuController.createTamu
)
// FIX DISINI
router.put('/edit/:id', tamuController.updateTamu)
router.put('/keluar/:id', tamuController.keluarTamu)

router.delete('/:id', tamuController.hapusTamu)

/* =========================
   PERMOHONAN TAMU
========================= */
router.post('/permohonan', upload.single('foto'), (req, res) => {

  const {
    nama,
    nip,
    asal_tamu,
    no_hp,
    email,
    keperluan
  } = req.body

  const foto =
    req.file ? req.file.filename : null

  const sql = `
    INSERT INTO permohonan_tamu
    (
      nama,
      nip,
      asal_tamu,
      keperluan,
      no_hp,
      email,
      foto
    )
    VALUES (?,?,?,?,?,?,?)
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
      foto
    ],
    (err,result)=>{

      if(err){
        console.log(err)

        return res.status(500).json({
          success:false
        })
      }

      res.json({
        success:true,
        message:"Permohonan berhasil dikirim"
      })

    }
  )

})

router.post('/permohonan/approve/:id', (req, res) => {

  const id = req.params.id

  db.query(
    'SELECT * FROM permohonan_tamu WHERE id = ?',
    [id],
    (err, result) => {

      if (err) {
        console.log(err)

        return res.status(500).json({
          success: false
        })
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        })
      }

      const p = result[0]

      const insertSql = `
        INSERT INTO tamu
        (
          nama,
          nip,
          asal_tamu,
          keperluan,
          no_hp,
          email,
          foto
        )
        VALUES (?,?,?,?,?,?,?)
      `

      db.query(
        insertSql,
        [
          p.nama,
          p.nip,
          p.asal_tamu,
          p.keperluan,
          p.no_hp,
          p.email,
          p.foto
        ],
        (err2) => {

          if (err2) {
            console.log(err2)

            return res.status(500).json({
              success: false
            })
          }

          res.json({
            success: true
          })

        }
      )

    }
  )

})

module.exports = router