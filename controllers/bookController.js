const asyncHandler = require('express-async-handler');
const {Book, validateCreateBook, validateUpdateBook} = require("../models/Book")



/** 
  * @desc Get all books
  * @route /api/books
  * @method GET
  * @access public 
**/
// Get all books
const getAllBooks = asyncHandler(
    async (req,res)=>{
        const {minPrice, maxPrice} = req.query;
        console.log(minPrice, maxPrice);
        let books;

        if (minPrice && maxPrice){
            books = await Book.find({price: {$gte: minPrice , $lte: maxPrice}}).populate("author", ["_id","firstName","lastName"]);
        } else {
            books = await Book.find().populate("author", ["_id","firstName","lastName"]);
        }

        res.status(200).json(books);
    }
)




/** 
  * @desc Get book by ID
  * @route /api/books/:id
  * @method GET
  * @access public 
**/
const getBookByID = asyncHandler(
    async (req,res)=>{
        const book = await Book.findById(req.params.id).populate("author",["_id","firstName","lastName"]);
        if (book){
            res.status(200).json(book);
        }
        else{
            res.status(404).json({message: `Book with id ${req.params.id} not found`});
        }
    }
);





/** 
  * @desc Create new book
  * @route /api/books
  * @method POST
  * @access private (only admin)
**/

const CreateNewBook = asyncHandler(
    async (req,res) => {

    
        const {error} = validateCreateBook(req.body);
        
    
        if (error){
            return res.status(400).json({message: error.details[0].message});
        }
    
        const book = new Book ({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        });
    
        const result = await book.save();
        res.status(201).json(result); // 201: Created Successfully
    }
);


/** 
  * @desc Update a Book
  * @route /api/books/:id
  * @method PUT
  * @access private (only admin) 
**/
const updateBook = asyncHandler(
    async (req,res)=>{
        const {error} = validateUpdateBook(req.body);
    
        if (error){
            return res.status(400).json({message: error.details[0].message});
        }
    
        const updatedBook = await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover
            }

        }, {new: true});

        res.status(200).json (updatedBook)
    }
);


/** 
  * @desc Delete a Book
  * @route /api/books/:id
  * @method DELETE
  * @access private (only admin) 
**/

const deleteBook =  asyncHandler(
    async(req,res)=>{

        const book = Book.findById(req.params.id)
        if (book){
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Book Deleted Successfully"});
        }
        else{
            res.status(404).json({message: "Book not found"})
        }
    }
)

module.exports = {getAllBooks, getBookByID, CreateNewBook, updateBook, deleteBook }; // Export the functions