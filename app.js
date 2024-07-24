const express = require('express');;  
const logger = require('./middlewares/logger') 
const {notFound, errorHandler} = require('./middlewares/errors')
require('dotenv').config();
const connectToDB = require('./config/db');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

connectToDB();

// Create an express app
const app = express();

// static folder
app.use(express.static(path.join(__dirname, 'images'))); // Middleware to serve static files

app.use(express.json()); // Middleware to parse the request body
app.use(express.urlencoded({ extended: false })); // Middleware to parse the request body
app.use(logger)


// Helmet middleware
app.use(helmet());


// Cors policy
app.use(cors());

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/upload', require('./routes/upload'));
app.use('/password', require('./routes/password'));

// Error Handler middleware
app.use(notFound)
app.use(errorHandler)



// Port
const port = process.env.PORT;
// Running the server 
app.listen(port,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});