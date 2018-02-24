var express = require("express");
var app = express();

// send, render에서 ejs 파일 불러올때 확장자명 생략하는 설정
app.set("view engine", "ejs");

// set default route
app.get("/", function(req, res) {
//   home.ejs로 연결
   res.render("home") 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started!!");
});