const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    nationality:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    image:{
        type: String,
        default: 'default-avatar.jpg'
    }
},
{
    timestamps: true
});


const Author = mongoose.model('Author', authorSchema);


// Validate Create Author
function validateCreateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).trim().required(),
        lastName: Joi.string().min(3).max(50).trim().required(),
        nationality: Joi.string().min(3).max(50).trim().required(),
        image: Joi.string().min(3).max(50).trim()
    });
    return schema.validate(obj);
}


// Validate Update Author
function validateUpdateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).trim(),
        lastName: Joi.string().min(3).max(50).trim(),
        nationality: Joi.string().min(2).max(50).trim(),
        image: Joi.string().min(3).max(50).trim()
    });
    return schema.validate(obj);
}

module.exports = {Author, validateCreateAuthor, validateUpdateAuthor};