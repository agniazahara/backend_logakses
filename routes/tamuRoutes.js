const express = require('express')
const multer = require('multer')
const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage()
})

const tamuController = require('../controllers/tamuController')

router.get('/', tamuController.getAllTamu)
router.get('/:id', tamuController.getTamuById)

router.post(
  '/',
  upload.single('foto'),
  tamuController.createTamu
)

router.put('/edit/:id', tamuController.updateTamu)
router.put('/keluar/:id', tamuController.keluarTamu)

router.delete('/:id', tamuController.hapusTamu)

module.exports = router