var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Welcome to the home Page!");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening!");
})