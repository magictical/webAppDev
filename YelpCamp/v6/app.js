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
// PASSPORT CONFIGURATION
    
    
mongoose.connect("mongodb://localhost/yelp_camp");
// body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
// __dirname은 현재 위치 정도라고 보면된다 console로보면 /home/ubontu/workspace/YelpCamp/v5 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


//delete all campground! and create new one
seedDB();

//Root route
app.get("/", function(req, res) {
    res.render("landing");
});

//INDEX route
app.get("/campgrounds", function(req, res) {
    // send object to campgrounds.ejs template
    // res.render("campgrounds", {campgrounds:campgrounds});
    
    //retrieve all campground from DB
    Campground.find({}, function(error, allCampgrounds) {
        if(error) {
            console.log(error)
        } else {
            // allCampgrounds is a data from DB!
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    
});

//POST route
app.post("/campgrounds", function(req, res) {
    //get name and imgUrl new.ejs from form at new.ejs
    var name = req.body.name;
    var imgUrl = req.body.image;
    var desc = req.body.description;
    //save input to obj
    var newCampground = {name:name, image:imgUrl, description: desc};
    //create Campground obj and save to DB
    Campground.create(newCampground, function(error, newCampground) {
        if(error) {
            console.log(error);
        } else {
            //shows the added campground
            console.log("campground has added!!");
            console.log(newCampground);
            //move to /campgrounds
            res.redirect("/campgrounds");
        }
    });
});

// new.ejs로 연결 - 이름, 이미지 주소입력을 name으로 받아서 action으로 "/campground로 넘김"
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

//SHOW route- shows more info about one campground
//becaful with order of the routes! small rout have to be first! 
//like campground/new, is first than campgrounds/:id
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if(error) {
            console.log(error);
        } else {
            // console.log("!!!!!!!!found camp!!");
            console.log(foundCampground);
            // console.log("!!!!!!!!found camp!!");
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});        
        }
    });
});



// ===================================
// COMMENTS ROUTES //=================
// ===================================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            //NEW가 campground NEW와 중복되므로 폴더로 따로 만든다 - "comments/ 에 생성"    
            res.render("comments/new", {campground: campground});        
        }
    })
    
});

app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // console.log("!!!!!!!!req.params.body.comment is!!");
            console.log(req.body.comment);
            // console.log("!!!!!!!!req.params.body.comment is!!");
            //create new Comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //connect comment to campground
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

//================
// AUTH ROUTES ===
//================

//show the register form
app.get("/register", function(req, res) {
    res.render("register");
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});