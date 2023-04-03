const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')

//@desc Get Books
//@route GET /api/posts
//@access Private 
const getPosts = asyncHandler(async (req,res) => {
    const posts = await Post.find()

    res.status(200).json(posts)
})


//@desc Set Books
//@route POST /api/posts
//@access Private
const setPosts = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')

    }
const post = await Post.create({
    text:req.body.text
})

    res.status(200).json(post)
})

//@desc Update Books
//@route PUT /api/posts/:id
//@access Private
const updatePosts = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)

    if(!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    console.log(post)

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedPost)
})


//@desc Delete Books
//@route Delete /api/posts/:id
//@access Private
const deletePosts = asyncHandler(async (req, res) => {

    delete_id = {}

    await Post.deleteOne({ _id: { $eq: req.params.id}}).then(function(){
        console.log("Data deleted")
    }).catch(function(error){
        console.log(error)
    })


    // res.status(200).json({ id: post })
    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getPosts,
    setPosts,
    updatePosts,
    deletePosts
}