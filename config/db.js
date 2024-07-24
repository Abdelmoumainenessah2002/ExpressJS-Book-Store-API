const mongoose = require('mongoose');


async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...')
    } catch (error) {
        console.error('Could not connect to MongoDB', error)
    }
}

module.exports = connectToDB;