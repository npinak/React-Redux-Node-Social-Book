const express = require('express')
const router = express.Router()
const { getPosts, setPosts, updatePosts, deletePosts } = require('../controllers/bookController')


router.route('/').get(getPosts).post(setPosts)
router.route('/:id').delete(deletePosts).put(updatePosts)


module.exports = router 