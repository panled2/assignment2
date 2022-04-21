const mongoose = require("mongoose"),
bookSchema = mongoose.Schema({
    name: String, 
    author: String,
    web: String
});
const Books = mongoose.model("bookSc", bookSchema);
module.exports= Books;
