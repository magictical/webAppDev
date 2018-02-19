console.log("===============================")
console.log("=====WELCOME TO MY SHOP!!!=====")
console.log("===============================")


var faker = require("faker");

var productName = faker.commerce.productName;
var productPrice = faker.commerce.price;
for (var i = 0; i < 10; i++) {
    console.log(productName() + " " + productPrice());    
}

