var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/MoneyList');

var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

// Define a schema
var userSchema = new mongoose.Schema({
    Category: String,
    Amount: Number,
    Info: String,
    Date: Date
});

// Define a model
var User = mongoose.model('User', userSchema);

app.post("/add", async (req, res) => {
    try {
        var category_select = req.body.category_select;
        var amount_input = req.body.amount_input;
        var info = req.body.info;
        var date_input = req.body.date_input;

        var data = new User({
            Category: category_select,
            Amount: amount_input,
            Info: info,
            Date: date_input
        });

        await data.save(); // Save method now returns a promise
        console.log("Record Inserted Successfully");
        res.status(200).send("Record Inserted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting record.");
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});
