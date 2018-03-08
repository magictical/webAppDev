var express = require("express");
var router  = express.Router({mergeParams: true});  // Param을 못가져올때는 Router({mergeParams: true})를 추가해준다
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments NEW
//use middleware - isLogedIn to check user login state
router.get("/new", isLogedIn, function(req, res) {
    //find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            //NEW가 campground NEW와 중복되므로 폴더로 따로 만든다 - "comments/ 에 생성"    
            res.render("comments/new", {campground: campground});        
        }
    });
    
});

//Comments Create
//use middleware - isLogedIn to check user login state
router.post("/", isLogedIn, function(req, res) {
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            console.log("!!!!!!!!req.params.body.comment is!!");
            console.log(req.body.comment);
            console.log("!!!!!!!!req.params.body.comment is!!");
            //create new Comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //print out user name 
                    //save comment to 
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EditCommentRoute
router.get("/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});        
            console.log(req.params.id);
            console.log(foundComment);
        }
    });
    
});

// COMMENT UPDATE
router.put("/:comment_id", function(req, res) {
    //find and update the correct campground
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
      if(err) {
          console.log(err);
          res.redirect("back");
      }  else {
          res.redirect("/campgrounds/" + req.params.id);
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

module.exports = router;