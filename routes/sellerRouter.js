var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    
  }
module.exports = app => {
    const sellers = require("../controllers/controllerSeller");
  
    // Create a new Customer
    app.post("/sellers",cors(corsOptions["origin"]), sellers.create);
  
    // Retrieve all Customers
    app.get("/sellers", cors(corsOptions['methods']),sellers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/sellers/:sellerId",cors(corsOptions['methods']), sellers.findOne);
  
    // Update a Customer with customerId
    app.put("/sellers/:sellerId", cors(corsOptions['methods']),sellers.update)
  
    // Delete a Customer with customerId
    app.delete("/sellers/:sellerId",cors(corsOptions['methods']), sellers.delete);
  
    // Create a new Customer
    app.delete("/sellers", sellers.deleteAll);      
}                                                                             