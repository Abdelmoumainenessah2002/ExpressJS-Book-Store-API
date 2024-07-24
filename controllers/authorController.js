const asyncHandler = require('express-async-handler');
const { Author, validateCreateAuthor, validateUpdateAuthor } = require('../models/Author');

/**
 * @desc Get all authors 
 * @route /api/authors
 * @method GET
 * @access public
**/
const getAllAuthors = asyncHandler(async (req, res) => {
    const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
    const authorsPerPage = 2;
    const authorList = await Author.find()
        // .skip((pageNumber - 1) * authorsPerPage)
        // .limit(authorsPerPage);
    res.status(200).json(authorList);
});

/**
 * @desc Get Author By ID 
 * @route /api/authors/:id
 * @method GET
 * @access public
**/
const getAuthorByID = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);

    if (author) {
        console.log(author);
        res.status(200).json(author);
    } else {
        console.log(`Author with id ${req.params.id} not found`);
        res.status(404).json({ message: `Author with id ${req.params.id} not found` });
    }
});



/**
 * @desc Add New Author 
 * @route /api/authors/
 * @method POST
 * @access private (only admin)
**/

const createNewAuthor = asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    });
    const result = await author.save();
    res.status(201).json(result);
});

/**
 * @desc Update Author By ID
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
**/
const updateAuthor = asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const author = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
        }
    }, { new: true });
    res.status(200).json(author);
});

/**
 * @desc Delete Author By ID
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
**/
const deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Author Deleted Successfully" });
    } else {
        res.status(404).json({ message: "Author not found" });
    }
});

module.exports = { getAllAuthors, getAuthorByID, createNewAuthor, updateAuthor, deleteAuthor };
