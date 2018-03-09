var express       = require("express");
var router        = express.Router();
var Campground    = require("../models/campground");
var middlewareObj = require("../middleware");

// INDEX route
router.get("/", middlewareObj.isLogedIn, function(req, res) {
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

// POST route
router.post("/", function(req, res) {
    //get name and imgUrl new.ejs from form at new.ejs
    var name = req.body.name;
    var imgUrl = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //save input to obj
    var newCampground = {name:name, image:imgUrl, description: desc, author: author};
    //create Campground obj and save to DB
    Campground.create(newCampground, function(error, newlyCreated) {
        if(error) {
            console.log(error);
        } else {
            //shows the added campground
            console.log("campground has added!!");
            console.log("new Post!" + newlyCreated)
            //move to /campgrounds
            res.redirect("/campgrounds");
        }
    });
});

// new.ejs로 연결 - 이름, 이미지 주소입력을 name으로 받아서 action으로 "/campground로 넘김"
router.get("/new", middlewareObj.isLogedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW route- shows more info about one campground
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});    
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
      if(err) {
          console.log(err);
          res.redirect("/campgrounds")
      }  else {
          res.redirect("/campgrounds/" + req.params.id);
      }
    });
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds")
        }
    });
})

//exports router
module.exports = router;