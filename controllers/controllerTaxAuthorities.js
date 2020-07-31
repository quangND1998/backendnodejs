const TaxAuthoritie = require("../models/modelTaxAuthoritie");

// Create and Save a new Customer
exports.create =async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const taxAuthoritie = new TaxAuthoritie({
        MaCQT : req.body.MaCQT,
        TenCQT   :req.body.TenCQT,
      
    });
  
    // Save Customer in the database
    TaxAuthoritie.create(taxAuthoritie,async (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the TaxAuthoritie."
        });
      else await res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll =async (req, res) => {
    TaxAuthoritie.getAll(async(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipt."
      });
    else await res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = async (req, res) => {

    TaxAuthoritie.findById(req.params.taxAuthoritieId,async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.taxAuthoritieId}.`
        });
        console.log(res.params.MaCQT)
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.taxAuthoritieId
        });
      }
    } else await res.send(data);
  });
}

// Update a Customer identified by the customerId in the request
exports.update =async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TaxAuthoritie.updateById(req.params.taxAuthoritieId,new TaxAuthoritie(req.body),async(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found recipt with id ${req.params.taxAuthoritieId}.`

          });
          console.log()
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.taxAuthoritieId
          });
        }
      } else await res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = async(req, res) => {
    TaxAuthoritie.remove(req.params.taxAuthoritieId,async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.taxAuthoritieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.taxAuthoritieId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll =async (req, res) => {
    TaxAuthoritie.removeAll(async(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipt."
      });
    else res.send({ message: `All recipts were deleted successfully!` });
  });
};