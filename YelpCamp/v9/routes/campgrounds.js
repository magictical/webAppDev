var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");

//INDEX route
router.get("/", isLogedIn, function(req, res) {
    // send object to campgrounds.ejs template
    // res.render("campgrounds", {campgrounds:campgrounds});
    
    //retrieve all campground from DB
    Campground.find({}, function(error, allCampgrounds) {
        if(error) {
            console.log(error)
        } else {
            // console.log(req.user);
            // allCampgrounds is a data from DB!
            // send currentUser state
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    
});

//POST route
router.post("/", function(req, res) {
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
router.get("/new", isLogedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW route- shows more info about one campground
//becaful with order of the routes! small rout have to be first! 
//like campground/new, is first than campgrounds/:id
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if(error) {
            console.log(error);
        } else {
            // console.log("!!!!!!!!found camp!!");
            // console.log(foundCampground);
            // console.log("!!!!!!!!found camp!!");
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});        
        }
    });
});

//define middleware
function isLogedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//exports router
module.exports = router;