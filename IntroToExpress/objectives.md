#Introduction to Express

* What is a framework? How is it different from a library?
    : framework is collection of functions looks like lib. 
    but it's defferent with lib. it request fill the form to user whereas
    lib is called by user.
    simply, framework is incompleted form which ask to user to fill it and 
    once form is completed, it gets powerful performance!
* What is Express?  
    :Express is framework for Node.js
* Why are we using Express?
*   :it's popular, light-weight, easy-to-learn

#Our First Express App!!!!!

* Review an existing app (DogDemo)
    : the flow of DogDemo 
        * 3 different routes
            - "/", "/bye", "dog"  
        *server side commend (listen for request)
            -app.listen(process.env.PORT, process.env.IP, function() {}
        *once server on, it's ready to listen the requests, according to 
        the requests("/", "/dog") it shows its result on the browser.

* Review HTTP response/request lifecycle
    :
        1.after turning on the server user sends get request with argument
        2. server check the argument as a route and respond as sending a message
* Create our own simple Express app!

#NPM Init and Package.json

* Use the `--save` flag to install packages
* Explain what the package.json file does
* Use `npm init` to create a new package.json


# More Routing!

* Show the `*` route matcher
* Write routes containing route parameters
* Discuss route order