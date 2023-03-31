const asyncHandler = require('express-async-handler')

//@desc Get Books
//@route GET /api/books
//@access Private 
const getBooks = asyncHandler(async (req,res) => {
    res.status(200).json({ message: 'Get books' })
})


//@desc Set Books
//@route POST /api/books
//@access Private
const setBooks = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')

    }
    res.status(200).json({ message: 'Set books' })
})

//@desc Update Books
//@route PUT /api/books/:id
//@access Private
const updateBooks = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}` })
})

//@desc Delete Books
//@route Delete /api/books/:id
//@access Private
const deleteBooks = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}` })
})

module.exports = {
    getBooks,
    setBooks,
    updateBooks,
    deleteBooks
}