var express = require("express");
var router  = express.Router({mergeParams: true});  // Param을 못가져올때는 Router({mergeParams: true})를 추가해준다
var Campground = require("../models/campground");
var Comment = require("../models/comment")
//파일명이 index이므로 middleware/index.js까지 지정할 필요가 없다.
var middlewareObj = require("../middleware");

//Comments NEW
//use middleware - isLogedIn to check user login state
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
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
router.post("/", middlewareObj.isLoggedIn, function(req, res) {
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
                    req.flash("error", "Something went wrong!");
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
                    req.flash("success", "You've created a Campground!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EditCommentRoute
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res) {
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
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res) {
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

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res) {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "You've deleted your comment!");
            res.redirect("/campgrounds/" + req.params.id);        
        }
    })
    
})

module.exports = router;