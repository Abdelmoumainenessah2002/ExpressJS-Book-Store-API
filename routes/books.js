const express = require("express");
const router = express.Router();
const { getAllBooks, getBookByID, CreateNewBook, updateBook, deleteBook } = require("../controllers/bookController");
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');

router.route("/").get(getAllBooks)
                 .post(verifyTokenAndAdmin,CreateNewBook);
router.route("/:id").get(getBookByID)
                    .put(verifyTokenAndAdmin,updateBook)
                    .delete(verifyTokenAndAdmin,deleteBook);


module.exports = router; // Export the router