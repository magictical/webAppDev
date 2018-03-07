var express    = require("express"), 
    app        = express(),
// use body-parser
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    //auth APIs
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB     = require("./seeds");
    
    
//var for routes -//campgrounds, index(auth), comments also
var campgroundRoutes = require("./routes/campgrounds"),
    indexRountes     = require("./routes/index"),
    commentRoutes    = require("./routes/comments");


mongoose.connect("mongodb://localhost/yelp_camp");
// body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// __dirname은 현재 위치 정도라고 보면된다 console로보면 /home/ubontu/workspace/YelpCamp/v5 
app.use(express.static(__dirname + "/public"));
//delete all campground! and create new one
seedDB();


// PASSPORT CONFIGURATION=====
app.use(require("express-session")({
    secret: "it's time to move on now!",
    resave: false,
    saveUninitialized: false
    
}));
app.use(passport.initialize());
app.use(passport.session());
//use pasport-local
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==============================


// definde middleware for currentUser state
// app 전체에서 user state를 추적할 수 있게됨
app.use(function(req, res, next) {
  currentUser = req.user;
  next();
});


//use each route - ./routes/campgrounds, index, comments
app.use("/", indexRountes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});