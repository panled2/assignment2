const mongoose = require("mongoose");
const bookSc = require("./models/book");
const bookController = require("./controllers/bookcontroller");
const homeController = require("./controllers/homecontroller");
const express = require("express"), 
app= express();
const router=express.Router();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);



require("dotenv").config();
const uri = process.env.ATLAS_URI;

console.log(uri);

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})

app.get('/', (req,res)=>{
    res.render('home')
});

app.get("/home", homeController.initialReq);
app.get("/book/:bookNumber", homeController.sendBookreq);
app.get("/addnewbook", homeController.addBook);
app.get("/deleteabook", bookController.getAllBooks, (req, res, next) => {
    res.render("deleteabook", {
        books: req.data
    });
});
app.post("/book/create", homeController.bookAdd);
app.get("/book/:bookData", homeController.bookDelete);

app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
});