var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Bumusa", image: "https://farm3.staticflickr.com/2222/5763171257_b604848409.jpg"},
        {name: "Nawansa", image: "https://farm7.staticflickr.com/6009/6189111529_5b70b82033.jpg"},
        {name: "Sinan", image: "https://farm8.staticflickr.com/7254/13876685593_19feb04904.jpg"}
    ]
    // send object to campgrounds.ejs template
    res.render("campgrounds", {campgrounds:campgrounds});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
})