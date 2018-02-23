var express = require("express");
var app = express();

//setting for default folder 'public' 
app.use(express.static("public"));

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
    // send data through key-value set!
    res.render("love.ejs", {thingVar: thing} );
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "how to workout properly", author: "Ian"},
        {title: "proper warming up", author: "Ian kim"},
        {title: "Statistic for Avoiding injury", author: "Dr. Ian"}
        ];
        res.render("posts.ejs", {posts:posts});
        
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening!");
});