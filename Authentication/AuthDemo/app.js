var express               = require("express"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    mongoose              = require("mongoose"),
    User                  = require("./models/user");

var app = express();    
// setting for mongoose 'auth_demo_app' is db name for mongodb
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set('view engine', 'ejs');

//setting for express-session
app.use(require("express-session")({
    secret: "the person i've been thinking of is",
    resave: false,
    saveUninitialized: false
}));

//setting for passport 
app.use(passport.initialize());
app.use(passport.session());

//serializeUser - Encoding 과정User.js 의 passportLocalMongoose의 function이 실행됨
passport.serializeUser(User.serializeUser());
//동일함 Decoding과정
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
   res.render("secret") ;
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has stated!!");
})