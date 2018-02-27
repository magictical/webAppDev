var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name : String
});
var User = mongoose.model("User", userSchema);


//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var postModel = mongoose.model("Post", postSchema);

var newUser = new User({
    email: "charie@as.com",
    name: "charie"
});
newUser.save(function(err, user) {
    if(err) {
        console.log(err)
    } else {
        console.log(user);
    }
})