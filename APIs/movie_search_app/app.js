var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(req, res) {
    request('http://www.omdbapi.com/?s=star&apikey=thewdb', function(error, response, body) {
        if(!error && response.statusCode == 200) {
        //parse 'body'(string) to json format
        var parseToJson = JSON.parse(body);
        //drill down to the data
        //json은 대소문자 구분해야한다!
        res.send(parseToJson["Search"][0]["Title"]);
        console.log(parseToJson["Search"][0]["Title"]);
        }
    });
    
    
});
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Movie App has started!!") ;
});
   
