const DetailRecipts = require('../models/modelDetailRecipt');

exports.create =(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can no be empty"
        });
    }
    const detailRecipts = new DetailRecipts(
        {
            SoHD    :req.body.SoHD,
            MaHDCT    :req.body.MaHDCT,
            MaSP    :req.body.MaSP,
            Soluong      :req.body.Soluong,
            Gia         :req.body.Gia,
            GhiChu : req.body.GhiChu

        });
        DetailRecipts.create(detailRecipts, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the detailRecipts."
              });
            else res.send(data);
          });
}
exports.findAll = (req, res) => {
    DetailRecipts.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving DetailRecipts."
        });
      else res.send(data);
    });
  };
exports.findOne = (req, res) => {
    DetailRecipts.findById(req.params.detailReciptId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.detailReciptId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.detailReciptId
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
  console.log(req.params.detailReciptId1)
  DetailRecipts.updateById(
    req.params.detailReciptId,
    new DetailRecipts(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found DetailRecipts with id ${req.params.detailReciptId}`
          });
        } else {
          res.status(500).send({
            message: "Error updating DetailRecipts with id " + req.params.detailReciptId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    DetailRecipts.remove(req.params.detailReciptId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.detailReciptId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.detailReciptId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    DetailRecipts.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all detailRecipt."
      });
    else res.send({ message: `All detailRecipt were deleted successfully!` });
  });
};