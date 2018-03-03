var express               = require("express"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    mongoose              = require("mongoose"),
    User                  = require("./models/user");

var app = express();    
// setting for mongoose 'auth_demo_app' is db name for mongodb
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set('view engine', 'ejs');

//setting for express-session
app.use(require("express-session")({
    secret: "the person i've been thinking of is",
    resave: false,
    saveUninitialized: false
}));

//setting for passport 
app.use(passport.initialize());
app.use(passport.session());
//setting for body-parser to encode the username,password from register.ejs' form
app.use(bodyParser.urlencoded({extended: true}));

//serializeUser - Encoding 과정User.js 의 passportLocalMongoose의 function이 실행됨
passport.serializeUser(User.serializeUser());
//동일함 Decoding과정
passport.deserializeUser(User.deserializeUser());


//==============
//Auth ROUTES
//==============



app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", function (req, res) {
   res.render("secret") ;
});


////Auth Routes/////

//show sign up form
app.get("/register", function(req, res) {
    res.render("register");
})

//handling user sign up
app.post("/register", function(req, res) {
    //get username, password from POST method
    //these are came from name attribute in form placed in register.ejs
    req.body.username;
    req.body.password;
    //new User로 새로운 User obj를 만들고 username을 포함시킴 이 obj는 DB에 저장될 부분
    //하지만 password는 직접적으로 DB에 저장하지 않고 따로 떨어뜨려 놓음
    //DB를 살펴보면 username만 저장되어있고 password없이 salt, hash값만 있다 salt는 hash값을 
    //decoding, encoding해서 비밀번호를 찾기위한 힌트로 사용된다. 이때 salt, hash값은 User.js의 
    //passportLocalMongoose을 이용한 결과다.
    User.register(new User({username:  req.body.username}), req.body.password, function(err,user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            //로그인후 이동할 곳
            res.redirect("/secret");
        })
    })
})


//LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
  res.render("login")  ;
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has stated!!");
})