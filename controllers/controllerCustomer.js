const Customer = require("../models/modelCustomer");

// Create and Save a new Customer
exports.create = async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const customer =  new Customer({
        MaKH    :req.body.MaKH,
        TenKH   :req.body.TenKH,
        DiaChiB :req.body.DiaChiB,
        MaSTB   :req.body.MaSTB,
        ChuKySo :req.body.ChuKySo,
        ChuKyDT :req.body.ChuKyDT
    });
  
    // Save Customer in the database
    Customer.create(customer,async(err, data) => {
     
      if (err)
      await res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else
        await res.send(data);
        

    });
  };

// Retrieve all Customers from the database.
exports.findAll =async (req, res) => {

  Customer.getAll(async(err, data) => {
   
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else await res.send(data);
         
  });
};

// Find a single Customer with a customerId
exports.findOne = async(req, res) => {
  Customer.findById(req.params.customerId,async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else await res.send(data);
  });
}

// Update a Customer identified by the customerId in the request
exports.update = async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
   async (err, data) => {
      
      if (err) {
        res.header("Access-Control-Allow-Origin", "*");
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else await res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete =async (req, res) => {
  Customer.remove(req.params.customerId, async(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = async(req, res) => {
  Customer.removeAll(async(err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};