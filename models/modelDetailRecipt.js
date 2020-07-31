const sql = require("./dbconnect")

const DetailRecipts = function(detailRecipt){
    this.SoHD = detailRecipt.SoHD;
    this.MaHDCT = detailRecipt.MaHDCT;
    this.MaSP = detailRecipt.MaSP;
    this.Soluong = detailRecipt.Soluong;
    this.Gia= detailRecipt.Gia;
    this.GhiChu = detailRecipt.GhiChu;
    
}
DetailRecipts.create =( newDetailRecipt, result)=>{
    sql.query("INSERT INTO cthd SET ?" ,newDetailRecipt,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", {...newDetailRecipt });
        result(null, { ...newDetailRecipt});
    });
}
DetailRecipts.getAll = result =>{
    sql.query("SELECT *FROM cthd ", (err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("detailRecipts : ",res );
        result(null,res);
    });
};

DetailRecipts.findById = (detailReciptId, result) => {
    sql.query(`SELECT * FROM cthd WHERE MaHDCT = '${detailReciptId}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found detailRecipt: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  DetailRecipts.updateById = (MaHDCT, detailRecipt, result) => {
      sql.query(
        "UPDATE cthd SET  Soluong = ?,Gia =? ,GhiChu = ? WHERE MaHDCT = ?",
        [detailRecipt.Soluong,detailRecipt.Gia,detailRecipt.GhiChu, MaHDCT], 
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated detailRecipt: ", {MaHDCT: MaHDCT,...detailRecipt });
          result(null,{MaHDCT: MaHDCT,...detailRecipt });
        }
      );
    };
    DetailRecipts.remove = (MaHDCT, result) => {
      sql.query("DELETE FROM cthd WHERE MaHDCT = ?", MaHDCT, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        console.log("deleted customer with id: ", MaHDCT);
        result(null, res);
      });
    };
    
    DetailRecipts.removeAll = result => {
      sql.query("DELETE FROM cthd", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
      });
    };
module.exports = DetailRecipts