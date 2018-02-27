var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//define dummy array
var data =[
    {
        name: "deserted space",
        image: "https://d2r2jvvtffo57h.cloudfront.net/assets/img/strains/SnowDome-live_09e84188f2d857bb8f54b3a2af489dd34b96ea87d21db102632638be5e3cac9c.jpg",
        description: "you should see this rfor real!!"        
    },
    {
        name: "honey space",
        image: "http://www.outdoornews.co.kr/news/photo/201105/2026_5666_4043.jpg",
        description: "you should see this rfor real!!"        
    },
    {
        name: "my space",
        image: "http://www.mikebartonphoto.com/images/large/CUBoulderFlatirons2.jpg",
        description: "you can do this!!"        
    }
]

//delete previous data and create new one
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment._id);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;


