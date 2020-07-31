var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    
  }
module.exports = app => {
    const RegisterLogin = require("../models/modelRegisterandLogin");
  
    // Create a new Customer
   
    app.post("/usersRegister",cors(corsOptions["origin"]) ,RegisterLogin.register);
    // Retrieve all Customers
    app.post("/userLogin", cors(corsOptions['methods']), RegisterLogin.login);
       
}                                                                             