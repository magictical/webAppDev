var mongoose = require("mongoose");
//connect to the DB
mongoose.connect("mongodb://localhost/cat_app");

//modeling the cat obj
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    tomperament: String
});

//define "Cat" as obj name and catSchema as a schema
var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

//retrieve all cats from the DB and console.log each one.