const books = require("../models/books");

module.exports = {
    index: (req, res) => {
        books.find({})
            .then(books => {
                res.render("home", {
                    data: books
            })
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`)
            res.redirect("/home");
        });
    },
    load_page: (req, res) => {
        books.find({})
            .then(books => {
                res.render("DeleteABook", {
                    data: books
            })
        })
        .catch(error => {
            console.log(`Error fetching users: ${error.message}`)
            res.redirect("/home");
        });
    },
    new: (req, res) => {
        res.render("addNewBook");
    },


    create: (req, res, next) => {
        let bookParams = {
            name: req.body.name,
            author: req.body.author,
            web: req.body.web
        };

        books.create(bookParams)
            .then(user => {
                res.locals.redirect = "/home";
                res.locals.books;
                next(); 
            })
            .catch(error => {
                console.log(`Error adding defined book: ${error.message}`);
                next(error);
            });
    },

    show: (req,res, next) => {
        let bookId = req.params.id;
        books.findById(bookId)
            .then(book => {
                res.render("books", {
                    data: book
                })            
            })
            .catch(error => {
                console.log(`error fetching book by name: ${error.message}`);
                res.redirect ("/home");
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    delete: (req, res, next) => {
        let bookId = req.params.bookId;
        books.findOneAndDelete({book:bookId})
            .then(() => {
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error deleting defined book: ${error.message}`);
                next();
            });
    }
};