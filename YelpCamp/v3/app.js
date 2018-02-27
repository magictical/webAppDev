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



// Campground.create(
//     {name: "Nawansa", 
//     image: "https://farm7.staticflickr.com/6009/6189111529_5b70b82033.jpg",
//     description: "might be a good place to rest!"
//     }, function(error, campground) {
//         if(error) {
//             console.log(error);
//         } else {
//             console.log("Add campground!");
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    // send object to campgrounds.ejs template
    // res.render("campgrounds", {campgrounds:campgrounds});
    
    //retrieve all campground from DB
    Campground.find({}, function(error, allCampgrounds) {
        if(error) {
            console.log(error)
        } else {
            // allCampgrounds is a data from DB!
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
    
})

// add POST route
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
    })
})

// new.ejs로 연결 - 이름, 이미지 주소입력을 name으로 받아서 action으로 "/campground로 넘김"
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
}) 

//SHOW - shows more info about one campground
//becaful with order of the routes! small rout have to be first! 
//like campground/new, is first than campgrounds/:id
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(error, foundCampground) {
        if(error) {
            console.log(error);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});        
        }
    })
    
})
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
})