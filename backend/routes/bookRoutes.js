const express = require('express')
const router = express.Router()
const { getBooks, setBooks, updateBooks, deleteBooks } = require('../controllers/bookController')


router.route('/').get(getBooks).post(setBooks)
router.route('/:id').delete(deleteBooks).put(updateBooks)


module.exports = router 