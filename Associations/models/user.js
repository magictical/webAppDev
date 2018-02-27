var mongoose = require("mongoose");

//User - email, name, posts //1-N(posts) relationship
var userSchema = new mongoose.Schema({
    email: String,
    name : String,
    posts: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

//export module - User model
module.exports = mongoose.model("User", userSchema);