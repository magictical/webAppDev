var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
//User에 포함된 관계일땐 미리 정의하고 userSchema에서 사용되어야 한다.
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

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

var User = mongoose.model("User", userSchema);




