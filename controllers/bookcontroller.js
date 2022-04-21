const Book = require("../models/book");

exports.getAllBooks = (req, res, next) => {
    Book.find({}, (error, book) =>{
        if (error) next(error);
        req.data = book;
        next();
    });
};
