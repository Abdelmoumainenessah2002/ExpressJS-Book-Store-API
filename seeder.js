const {Book} = require('./models/Book');
const {Author} = require('./models/Author');
const {books,authors } = require('./data');
const connectToDB = require('./config/db');
require('dotenv').config();

// connect to the database
connectToDB();

// import books (seeding data base)
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log('Books imported successfully');
    } catch (error) {
        console.error('Error importing books', error);
        process.exit(1);
    }
}

// import books (seeding data base)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log('Authors imported successfully');
    } catch (error) {
        console.error('Error importing books', error);
        process.exit(1);
    }
}


// remove books
const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log('Books removed successfully');
    } catch (error) {
        console.error('Error removing books', error);
        process.exit(1);
    }
}

// remove authors
const removeAuthors = async () => {
    try {
        await Author.deleteMany();
        console.log('Authors removed successfully');
    } catch (error) {
        console.error('Error removing authors', error);
        process.exit(1);
    }
}

// check if the user wants to import or remove books
if (process.argv[2] === '-import') {
    importBooks();
}

else if (process.argv[2] === '-remove') {
    removeBooks();
    removeAuthors();
}

else if (process.argv[2] === '-import-authors') {
    importAuthors();
}

else {
    console.log('Please provide a valid command');
    process.exit(1);
}




