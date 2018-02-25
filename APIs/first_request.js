// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

//request 직접 만들어보기
//1. first_request.js 파일 만들기
//2. request 설치
//3. error 코드 및 body 확인하기


// var request = require('request');
// request('https://google.com', function(error, response, body) {
//     if(error) {
//         console.log("SOMETHING WENT WRONG");
//         console.log(error);
//     } else {
//         if(response.statusCode == 200) {
//             //Things worked!!
//             console.log(body);
//         }
//     }
// });

//simple weather API from yahoo weather
var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body) {
    if(!error && response.statusCode == 200) {
        console.log("sunset time on Hawii is at..")
        //parse 'body'(string) to json format
        var parseToJson = JSON.parse(body);
        //drill down to the data! at sunset time!
        console.log(parseToJson["query"]["results"]["channel"]["astronomy"]["sunset"]);
    }
});
