var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");

//Root route
router.get("/", function(req, res) {
    res.render("landing");
});


// PASSPORT CONFIGURATION
//================
// AUTH ROUTES ===
//================

//show the register form
router.get("/register", function(req, res) {
    res.render("register");
})

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
      //에러발생시 /register로 이동
      if(err) {
          req.flash("error", err.message);
          return res.redirect("/register");
      }
      //이상없으면 auth 완료하고 /campground로이동
      passport.authenticate("local")(req, res, function() {
          req.flash("success", "Welcome to YELPCAMP!!" + user.username);
          res.redirect("/campgrounds")
      });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling the login form - use middleware (passport.authenticate)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),
    function(req, res) {
});

//log logout
router.get("/logout", function(req,res) {
    req.logout();
    req.flash("success", "You've Logged out!!");
    res.redirect("/campgrounds");
});


module.exports = router;