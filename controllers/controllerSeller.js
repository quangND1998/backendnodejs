const Seller = require("../models/modelSeller");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const seller = new Seller({
        MSTA   :req.body.MSTA,
        TenA    :req.body.TenA,
        DiaChiA : req.body.DiaChiA,
        CKSA    : req.body.CKSA,
        CKDTA   : req.body.CKDTA,
        MaCQT   :req.body.MaCQT
    });
  
    // Save Customer in the database
    Seller.create(seller, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Seller."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Seller.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Seller."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Seller.findById(req.params.sellerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.sellerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.sellerId
        });
      }
    } else res.send(data);
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

  Seller.updateById(
    req.params.sellerId,
    new Seller(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found recipt with id ${req.params.sellerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.sellerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Seller.remove(req.params.sellerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.sellerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.sellerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Seller.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipt."
      });
    else res.send({ message: `All recipts were deleted successfully!` });
  });
};