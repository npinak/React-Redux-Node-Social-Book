const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

//@desc Get Books
//@route GET /api/posts
//@access Private 
const getPosts = asyncHandler(async (req,res) => {
    const posts = await Post.find({ user: req.user.id})
    // const posts = await Post.find() -- maybe keep this to display all posts 

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
    text:req.body.text,
    user: req.user.id, 
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

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the user in the post json object
    if(post.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')

    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedPost)
})


//@desc Delete Books
//@route Delete /api/posts/:id
//@access Private
const deletePosts = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)
    const post = await Post.findById(req.params.id)

    
    if (!user) { // Check for user
        res.status(401)
        throw new Error('User not found')
    } else if (post.user.toString() !== user.id) { //Make sure the logged in user matches the user in the post json object
        res.status(401)
        throw new Error('User not authorized')
    } else {
        await Post.deleteOne({ _id: { $eq: req.params.id } }).then(function () {
            console.log("Data deleted")
        }).catch(function (error) {
            console.log(error)
        })
    }

    
    




    // res.status(200).json({ id: post })
    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getPosts,
    setPosts,
    updatePosts,
    deletePosts
}