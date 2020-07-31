const Product = require("../models/modelProduct");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const product = new Product({
        MaSP    :req.body.MaSP,
        TenSP   :req.body.TenSP,
        DVT     :req.body.DVT,
        MSTA : req.body.MSTA
    });
  
    // Save Customer in the database
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.productId
        });
      }
    } else res.send(data);
  });
}
exports.getAllProducts = (req, res) => {
  const limit = 3
  // page number
  const page = req.query.page
  // calculate offset
  const offset = (page - 1) * limit
  Product.getAllProducts(limit,offset, (err, data) => {
    
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Customer with id ${req.query.page}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Customer with id " + req.query.page
      });
    }
  } else{ 
    var jsonResult = {
      'totalItems':data.length,
      'totalPages':3,
      'newproduct':data,
      'currentPage':offset
    }
    // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = "Products for page "+page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    
  }
});
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.productId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.productId
        });
      }
    } else res.send({ message: `productId was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all product."
      });
    else res.send({ message: `All product were deleted successfully!` });
  });
};