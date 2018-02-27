var express    = require("express"), 
    app        = express(),
// use body-parser
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
// body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
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
            console.log(foundCampground);
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});