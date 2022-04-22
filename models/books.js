const mongoose = require("mongoose"),
bookSchema = mongoose.Schema({
    name: String, 
    author: String,
    web: String
});
const Books = mongoose.model("Books", bookSchema);
module.exports= Books;
