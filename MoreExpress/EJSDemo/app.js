var express = require("express");
var app = express();

app.get("/", function(req, res) {
    // res.send("Welcome to the home Page!");
    // change to render
    res.render("home.ejs");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening!");
})