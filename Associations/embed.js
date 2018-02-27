var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
//User에 포함된 관계일땐 미리 정의하고 userSchema에서 사용되어야 한다.
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

//User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name : String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


var newUser = new User({
    email: "charie@as.com",
    name: "charie"
});

// //Add user to DB
// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(user);
//     }
// })

var newPost = new Post({
    title: "my first post",
    content: "writing a post is so fun"
});
//Add post to DB
newPost.save(function(err, post) {
    if(err) {
        console.log(err);
    } else {
        console.log(post);
    }
});

//1-N relationship
