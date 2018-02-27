var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

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

// Post.create({
//     title: "asdasdasdasdasm",
//     content: "sadasdadasdasda"
// }, function(err, post) {
//         User.findOne({email: "law@gmail.com"}, function(err, foundUser) {
//         if(err) {
//             console.log(err)
//       } else {
//           console.log("found the user " + foundUser)
//             foundUser.posts.push(post._id);
//             foundUser.save(function(err, data) {
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });    
    
// });

//Find user and reference the post array by _id
//find all posts for that user
User.findOne({email: "law@gmail.com"}).populate("posts").exec(function(err, post) {
    if(err) {
        console.log(err);
    } else {
        console.log(post);
    }
})


// User.create({
//     email: "law@gmail.com",
//     name: "Mashial Law"
// });




