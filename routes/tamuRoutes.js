const express = require('express')
const multer = require('multer')
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

module.exports = router