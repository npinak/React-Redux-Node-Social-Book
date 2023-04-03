 const mongoose = require('mongoose')

 const postSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add a text value'],
    },
    likes:{
        type: Number,
        required: false,
    },
    comments: {
        type:[String],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false,
    },
 }, {
    timestamps: true, 
 })

 module.exports = mongoose.model('Post', postSchema)