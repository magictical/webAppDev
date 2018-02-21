//take all contents from the express and save in the var 'express'
var express = require("express");
// execute the express
var app = express();


// "/" => "Hi there!"
app.get("/", function(req, res) {
    res.send("you've entered '/' !");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
    res.send("Goobysasdasde!!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    res.send("i can speak human!")
    console.log("a request has sent!");
})

// use ':' as a define category of the route. not the string!
// ':' 이 사용된 route는 string자체가 아닌 param으로서 route를 받아 들인다
// 즉 /:name 은 주소로서 ':name을 찾는게 아닌' 카테고리로 :name에 들어온 값을 param으로 인식한다.
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    // tracking route
    console.log(req.params);
    // store subredditName in the var
    var subName =  req.params.subredditName;
    // store id
    var id = req.params.id;
    // store title
    var title = req.params.title;
    // more dry code for result!
    res.send("Welcome To The " + subName.toUpperCase() + " SubReddit " + id 
    + " Your title is " + title);
    // res.send("WELCOME TO THE COMMENTS PAGE!");
    
})

// tracking route's param
// req자체를 arg로 쓸경우 req의 모든 값을 볼 수 있다.
app.get("/r/:subredditName", function(req, res) {
    // tracking route
    console.log(req.params);
    res.send("WELCOME TO A SUBREDDIT!");
})


//this routes includes all the routes from user except the routes defined above.
// !!important!! : order of the routes are matter! 
app.get("*", function(req, res) {
    res.send("YOU ARE THE STAR!");
})




//Tell Express to listen for requests (start server)
//send (PORT, IP) info
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});