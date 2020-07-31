var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    
  }
module.exports = app => {
    const customer = require("../controllers/controllerCustomer");
  
    // Create a new Customer
    app.post("/customers",cors(corsOptions["origin"]) ,customer.create);
  
    // Retrieve all Customers
    app.get("/customers", cors(corsOptions['methods']),customer.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId",cors(corsOptions['methods'] ), customer.findOne);
  
    // Update a Customer with customerId
    app.put("/customers/:customerId",cors(corsOptions['methods'] ), customer.update);
  
    // Delete a Customer with customerId
    app.delete("/customers/:customerId",cors(corsOptions['methods']) , customer.delete);
  
    // Create a new Customer
    app.delete("/customers", customer.deleteAll);     
 
}                                                                             