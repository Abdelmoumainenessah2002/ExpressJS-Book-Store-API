const express = require('express');
const router = express.Router();
const { getAllAuthors, getAuthorByID, createNewAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.route("/") // Route for all authors
    .get(getAllAuthors)
    .post(verifyTokenAndAdmin, createNewAuthor);

router.route("/:id") // Route for a specific author
    .get(getAuthorByID)
    .put(verifyTokenAndAdmin, updateAuthor)
    .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router; // Export the router
