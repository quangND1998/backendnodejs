var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
}
module.exports = app => {
    const recipts = require("../controllers/controllerRecipt");
  
    // Create a new Customer
    app.post("/recipts",cors(corsOptions["origin"]), recipts.create);
  
    // Retrieve all Customers
    app.get("/recipts",cors(corsOptions['methods']), recipts.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/recipts/:reciptId", cors(corsOptions['methods']),recipts.findOne);
  
    // Update a Customer with customerId
    app.put("/recipts/:reciptId", cors(corsOptions['methods']),recipts.update)
  
    // Delete a Customer with customerId
    app.delete("/recipts/:reciptId", cors(corsOptions['methods']),recipts.delete);
  
    // Create a new Customer
    app.delete("/recipts", recipts.deleteAll);      
}                                                                             