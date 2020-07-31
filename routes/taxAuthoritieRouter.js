var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    
  }
module.exports = app => {
    var TaxAuthorities  = require("../controllers/controllerTaxAuthorities");
  
    // Create a new Customer
    app.post("/TaxAuthorities",cors(corsOptions["origin"]), TaxAuthorities.create);
  
    // Retrieve all Customers
    app.get("/TaxAuthorities", cors(corsOptions['methods']),TaxAuthorities.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/TaxAuthorities/:taxAuthoritieId",cors(corsOptions['methods']), TaxAuthorities.findOne);
  
    // Update a Customer with customerId
    app.put("/TaxAuthorities/:taxAuthoritieId", cors(corsOptions['methods']),TaxAuthorities.update)
  
    // Delete a Customer with customerId
    app.delete("/TaxAuthorities/:taxAuthoritieId",cors(corsOptions['methods']), TaxAuthorities.delete);
  
    // Create a new Customer
    app.delete("/dTaxAuthorities", TaxAuthorities.deleteAll);      
}                                                                             