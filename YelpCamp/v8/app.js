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

// definde middleware for currentUser state
// app 전체에서 user state를 추적할 수 있게됨
app.use(function(req, res, next) {
  currentUser = req.user;
  next();
});


//delete all campground! and create new one
// seedDB();

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
            console.log(req.user);
            // allCampgrounds is a data from DB!
            // send currentUser state
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
//use middleware - isLogedIn to check user login state
app.get("/campgrounds/:id/comments/new", isLogedIn, function(req, res) {
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
//use middleware - isLogedIn to check user login state
app.post("/campgrounds/:id/comments", isLogedIn, function(req, res) {
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

//handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
      //에러발생시 /register로 이동
      if(err) {
          console.log(err);
          return res.redirect("/register");
      }
      //이상없으면 auth 완료하고 /campground로이동
      passport.authenticate("local")(req, res, function() {
          res.redirect("/campgrounds")
      });
    });
});

// show login form
app.get("/login", function(req, res) {
    res.render("login");
});

//handling the login form - use middleware (passport.authenticate)
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),
    function(req, res) {
});

//log logout
app.get("/logout", function(req,res) {
    req.logout();
    res.redirect("/campgrounds");
});


//define middleware
function isLogedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});