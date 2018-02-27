var mongoose = require("mongoose");

//POST - title, content
//User에 포함된 관계일땐 미리 정의하고 userSchema에서 사용되어야 한다.
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//export the module -  Post model
module.exports = mongoose.model("Post", postSchema) ;
