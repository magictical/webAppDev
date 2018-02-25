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


var request = require('request');
request('https://google.com', function(error, response, body) {
    if(error) {
        console.log("SOMETHING WENT WRONG");
        console.log(error);
    } else {
        if(response.statusCode == 200) {
            //Things worked!!
            console.log(body);
        }
    }
});