const Recipt = require("../models/modelRecipts");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const recipt = new Recipt({
        SoHD    :req.body.SoHD,
        MaKH : req.body.MaKH,
        NgayLap : req.body.NgayLap,
        TenHD   :req.body.TenHD,
        KHHD    :req.body.KHHD,
        KHMSHD   :req.body.KHMSHD,
        VAT: req.body.VAT
    });
  
    // Save Customer in the database
    Recipt.create(recipt, (err, data) => {
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
  Recipt.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipt."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Recipt.findById(req.params.reciptId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.reciptId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.reciptId
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

  Recipt.updateById(
    req.params.reciptId,
    new Recipt(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found recipt with id ${req.params.reciptId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.reciptId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Recipt.remove(req.params.reciptId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.reciptId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.reciptId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Recipt.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipt."
      });
    else res.send({ message: `All recipts were deleted successfully!` });
  });
};