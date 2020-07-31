var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    
  }
module.exports = app => {
    const detailRecipt = require("../controllers/controllerDetailRecipt");
  
    // Create a new Customer
    app.post("/detailRecipts",cors(corsOptions["origin"]), detailRecipt.create);
  
    // Retrieve all Customers
    app.get("/detailRecipts", cors(corsOptions['methods']), detailRecipt.findAll);
  
    //Retrieve a single Customer with customerId
    app.get("/detailRecipts/:detailReciptId", cors(corsOptions['methods']), detailRecipt.findOne);
  
    // Update a Customer with customerId
    app.put("/detailRecipts/:detailReciptId", cors(corsOptions['methods']), detailRecipt.update)
  
    // Delete a Customer with customerId
    app.delete("/detailRecipts/:detailReciptId", cors(corsOptions['methods']), detailRecipt.delete);
  
    // Create a new Customer
    app.delete("/detailRecipts", detailRecipt.deleteAll);      
}                                                                             