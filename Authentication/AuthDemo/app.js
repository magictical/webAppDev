var express               = require("express"),
    passport              = require("passport"),
    bodyParser            = require("body-parse"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    mongoose              = require("mongoose");

var app = express()    
// setting for mongoose 'auth_demo_app' is db name for mongodb
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
   res.render("secret") ;
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has stated!!");
})