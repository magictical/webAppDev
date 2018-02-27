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
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


var newUser = new User({
    email: "Ian@hot.com",
    name: "Ian"
});

// //add Post to user
// newUser.posts.push({
//     title: "embed Post to User",
//     content: "do your things!"
// })


// //Add user to DB
// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(user);
//     }
// })

// var newPost = new Post({
//     title: "my first post",
//     content: "writing a post is so fun"
// });
// //Add post to DB
// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

//find Ian and add Post to User Ian
User.findOne({name: "Ian"}, function(err, user) {
    if(err) {
        console.log(err);
    } else {
        // add Post to User  'posts' 는  DB내 Post의 collection 이름
        user.posts.push({
            title: "New push",
            content: "insult Post to User OMG!!"
        })
        //save User to Db
        user.save(function (err, user) {
            if(err) {
                console.log(err)
            } else {
                console.log(user);
            }
        })
    }
});


