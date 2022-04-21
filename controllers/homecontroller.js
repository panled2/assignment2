const Books = require("../models/book");

exports.initialReq = (req, res) => {
    Books.find( {}, (err, info) => {
        if (info) res.render("home", {book: info});
    });
};

exports.sendBookreq = (req, res) => {
    let book = req.params.bookNumber;
    Books.find( {}, (err, info) => {
        if (info) res.render(book, {book: info[book-1]});
    });
};

exports.addBook = (req, res) => {
    res.render("addnewbook")
}

exports.deleteBook = (req, res) => {
    res.render("deleteabook")
}
exports.bookAdd = (req, res) => {
    const book = new Books({
        name: req.body.name,
        author: req.body.author,
        web: req.body.web
    });
    book.save();
    res.redirect("/addnewbook")
    return res.json({ status: "Book has been added"})
}

exports.bookDelete = (req, res, next) => {
    const bookData = req.params.bookData;
    console.log(bookData);
    Book.findOneAndDelete({
        bookTitle: bookData,
    }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Book: ", docs);
            return res.json({ status:"Book has been deleted"})
        }
    });
}