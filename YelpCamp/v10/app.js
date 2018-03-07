var express    = require("express"), 
    app        = express(),
// use body-parser
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    //use method-override
    methodOverride = require("method-override"),
    
    //auth APIs
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB     = require("./seeds");
    

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
//connect to DB
mongoose.connect("mongodb://localhost/yelp_camp_v8");
// body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
// __dirname은 현재 위치 정도라고 보면된다 console로보면 /home/ubontu/workspace/YelpCamp/v5 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//setting for method-override
app.use(methodOverride("_method"));


// PASSPORT CONFIGURATION
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


// definde middleware for currentUser state
// app 전체에서 user state를 추적할 수 있게됨
app.use(function(req, res, next) {
  currentUser = req.user;
  next();
});


//delete all campground! and create new one
// seedDB();

//define routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});