const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number
    },
    genre: {
        type: String
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
}, { timestamps: true });


module.exports = mongoose.model('book', bookSchema);