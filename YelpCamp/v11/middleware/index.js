//all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

 //check authorization
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //check logged in?
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                //is user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();   
                } else {
                    res.redirect("back");            
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

// check comment auth

//check authorization
middlewareObj.checkCommentOwnership = function(req, res, next) {
    //check logged in?
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                //is user own the campground?
                console.log(foundComment.author.id)
                if(foundComment.author.id.equals(req.user._id)) {
                    next();   
                } else {
                    res.redirect("back");            
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


//check logged in
middlewareObj.isLogedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    //flash message는 /login 라우트로 이동할때 "error"로 보내지고 
    //이 값을 /login라우트와 login.ejs에서 처리한다. 항상 redirect전에 사용할것
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}




module.exports = middlewareObj;