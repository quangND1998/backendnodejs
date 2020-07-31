
const XuaHoaDon = require("../models/xuathoadon");


exports.findOne = (req, res) => {
    XuaHoaDon.findById(req.params.xuatHoaDonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.xuatHoaDonId}.`
        });
        console.log(res.params.MaCQT)
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.xuatHoaDonId
        });
      }
    } else res.send(data);
  });
}
