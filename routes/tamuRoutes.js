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

module.exports = router