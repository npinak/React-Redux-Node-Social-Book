const express = require('express')
const router = express.Router()
const { getPosts, setPosts, updatePosts, deletePosts } = require('../controllers/bookController')

const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getPosts).post(protect, setPosts) // may have to not protect getposts to make public posts
router.route('/:id').delete(protect, deletePosts).put(protect, updatePosts)


module.exports = router 