var express = require("express");
var app = express();
// use body-parser
var bodyParser = require("body-parser");

// body-parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Bumusa", image: "https://farm3.staticflickr.com/2222/5763171257_b604848409.jpg"},
        {name: "Nawansa", image: "https://farm7.staticflickr.com/6009/6189111529_5b70b82033.jpg"},
        {name: "Sinan", image: "https://farm8.staticflickr.com/7254/13876685593_19feb04904.jpg"},
        {name: "Bumusa", image: "https://farm3.staticflickr.com/2222/5763171257_b604848409.jpg"},
        {name: "Nawansa", image: "https://farm7.staticflickr.com/6009/6189111529_5b70b82033.jpg"},
        {name: "Sinan", image: "https://farm8.staticflickr.com/7254/13876685593_19feb04904.jpg"}
    ];


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    // send object to campgrounds.ejs template
    res.render("campgrounds", {campgrounds:campgrounds});
})

// add POST route
app.post("/campgrounds", function(req, res) {
    //get name and imgUrl new.ejs from form at new.ejs
    var name = req.body.name;
    var imgUrl = req.body.image;
    var newCampground = {name:name, image:imgUrl};
    //update campground
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

// new.ejs로 연결 - 이름, 이미지 주소입력을 name으로 받아서 action으로 "/campground로 넘김"
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
}) 
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
})