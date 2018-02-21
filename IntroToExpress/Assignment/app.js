//init setting for express
var express = require("express");
var app = express();
// 3. 3가지 route 설정하기
//     3.1 "/" route 설정하기 - "Hi there, welcome to my assignment"
app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment");
})
    
//     3.2 "speak/pig" - the pig says 'Oink'
//     3.2 "speak/cow" - the pig says 'Moo'
//     3.2 "speak/dog" - the pig says 'Woof Woof'res.send("Oink");
app.get("/speak/:animalName", function(req, res) {
    var animal = req.params.animalName;
    if(animal === "pig") {
        res.send("Oink");
    } else if (animal === "cow") {
        res.send("Moo");
    } else if (animal === "dog") {
        res.send("Woof Woof");
    }
})


//     3.3 "/repeat/hello/3" - print whatever word 'n'times
app.get("/repeat/:word/:reps", function(req, res) {
    var uWord = req.params.word;
    var uReps = req.params.reps;
    var result="";
    for(var i = 0; i < uReps; i++) {
        result += uWord + " "; 
    }
    res.send(result);
})
//     3.4 For the rest of the routes isn't defined - Sorry, page not found... What are you doing with your life?
app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
})
// setting for server (turning On!)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has just started!!");
});