var mongoose = require("mongoose");
var Campground = require("./models/campground");

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

function seedDB() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("campground has removed!!");
        }
        data.forEach(function(seed) {
            Campground.create(seed, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });
    });
}    

module.exports = seedDB;


