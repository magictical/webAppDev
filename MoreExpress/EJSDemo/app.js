var express = require("express");
var app = express();

app.get("/", function(req, res) {
    // res.send("Welcome to the home Page!");
    // change to render
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    // var thing = req.params.thing;
    // res.send("you are falling love with " + thing);
    
    //use render()
    var thing = req.params.thing;
    res.render("love.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening!");
});