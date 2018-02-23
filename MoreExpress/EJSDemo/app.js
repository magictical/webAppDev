var express = require("express");
var app = express();

//setting for default folder 'public' 
app.use(express.static("public"));
//''.ejs' will be omiitted by this setting
ap.set("view engine", "ejs");

app.get("/", function(req, res) {
    // res.send("Welcome to the home Page!");
    // change to render
    //skip the 'ejs'
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    // var thing = req.params.thing;
    // res.send("you are falling love with " + thing);
    
    //use render()
    var thing = req.params.thing;
    // send data through key-value set!
    //skip the 'ejs'
    res.render("love", {thingVar: thing} );
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "how to workout properly", author: "Ian"},
        {title: "proper warming up", author: "Ian kim"},
        {title: "Statistic for Avoiding injury", author: "Dr. Ian"}
        ];
        //skip the 'ejs'
        res.render("posts", {posts:posts});
        
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server is listening!");
});