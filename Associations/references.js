var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

//import post module
var Post = require("./models/post");
var User = require("./models/user")

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




