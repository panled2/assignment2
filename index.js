const mongoose = require('mongoose');
const book_controller = require('./controllers/book_controller');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})
express = require("express"),
app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(express.static("public"));

router = express.Router();
app.use("/", router);

router.get("/home", book_controller.index);
router.get("/book/:id", book_controller.show);
router.get("/DeleteABook", book_controller.load_page);
router.get("/addNewBook", book_controller.new);

router.post("/new_books/create", book_controller.create, book_controller.redirectView);
router.delete("/new_books/:bookId/delete", book_controller.delete, book_controller.redirectView);


app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening on port number: ${app.get("port")}`);
})