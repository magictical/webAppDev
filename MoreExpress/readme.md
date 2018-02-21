#Rendering HTML and Templates

* Use res.render() to render HTML(from an EJS file)
* Explain what EJS is and why we use it
    : EJS helps express to display html file (text, img etc..)
* Pass variables to EJS templates
    : to pass the variable from app.js to xx.ejs, use JSP expression <%= varName %>
    ex> in the app.js - var thing = req.params.thing <== thing은 :route 임
                        res.render("love.ejs", {thingVar: thing});
                xx.ejs에서 <%= thingVar %> 사용시 thingVar의 value인 thing이 참조됨.


#EJS Control Flow

* Show examples of control flow in EJS templates
* Write if statements in an EJS file
* Write loops in an EJS file

#Styles And Partials

* Show how to properly include public assets
* Properly configure our app to use EJS
* Use partials to dry up our code!



#Post Requests!!!

* Write post routes, and test them with Postman
* Use a form to send a post request
* Use body parser to get form data