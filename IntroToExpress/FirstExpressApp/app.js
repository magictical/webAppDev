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


//Tell Express to listen for requests (start server)
//send (PORT, IP) info
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});