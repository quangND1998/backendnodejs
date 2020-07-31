var cors = require('cors')
var corsOptions = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
}
module.exports = app => {
    const product = require("../controllers/controllerProducts");
  
    // Create a new Customer
    app.post("/products",cors(corsOptions["origin"]), product.create);
  
    // Retrieve all Customers
    app.get("/products",cors(corsOptions['methods']), product.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/products/:productId",cors(corsOptions['methods']), product.findOne);
    app.get("/productPagse",cors(corsOptions['methods']), product.getAllProducts);
  
    // Update a Customer with customerId
    app.put("/products/:productId",cors(corsOptions['methods']), product.update)
  
    // Delete a Customer with customerId
    app.delete("/products/:productId", cors(corsOptions['methods']),product.delete);
  
    // Create a new Customer
    app.delete("/products", product.deleteAll);      
}                                                                             