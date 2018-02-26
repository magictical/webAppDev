// mongoose is a interface btw mongoDB and JSP  
var mongoose = require("mongoose");
//connect to the DB - if not exist, create it
mongoose.connect("mongodb://localhost/cat_app");

//modeling the cat obj
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//define "Cat" as obj name and catSchema as a schema
var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB
// var george = new Cat({
//     name: "Mrs.Norris",
//     age:110,
//     temperament:"Evil!"
// });

// george.save(function(error, cat) {
//     if(error) {
//         console.log("something went wrong");
//     } else {
//         console.log("save succeed!!");
//         console.log(cat);
//         }
// });

// make + save = create!
Cat.create({
    name: "Snow White",
    age:  15,
    temperament: "Bland"
}, function(error, cat) {
    if(error) {
        console.log(error);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one.
Cat.find({}, function(error, cats) {
    if(error) {
        console.log("something wrorg")
    } else {
        console.log("this is the list of the cats!");
        console.log(cats);
    }
});

