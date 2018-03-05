// ===================================
// COMMENTS ROUTES //=================
// ===================================
//use middleware - isLogedIn to check user login state
app.get("/campgrounds/:id/comments/new", isLogedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            //NEW가 campground NEW와 중복되므로 폴더로 따로 만든다 - "comments/ 에 생성"    
            res.render("comments/new", {campground: campground});        
        }
    })
    
});
//use middleware - isLogedIn to check user login state
app.post("/campgrounds/:id/comments", isLogedIn, function(req, res) {
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // console.log("!!!!!!!!req.params.body.comment is!!");
            console.log(req.body.comment);
            // console.log("!!!!!!!!req.params.body.comment is!!");
            //create new Comment
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //connect comment to campground
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})