const sql = require('./dbconnect');
 
const Recipts = function(recipt){
    this.SoHD = customer.SoHD;
    this.TenHD = recipt.TenHD;
    this.MaKH = recipt.MaKH;
    this.NgayLap =recipt.NgayLap;
    this.KHHD  = recipt.KHHD;
    this.KHMSHD = recipt.KHMSHD;
    this.VAT = recipt.VAT;
}

Recipts.create =(newRecipt, result)=>{
    sql.query("INSERT INTO  hoadon SET ?",newRecipt, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", { soHD: res.insertId, ...newRecipt });
        result(null, { soHD: res.insertId, ...newRecipt });

    });
};
Recipts.findById =(reciptId ,result)=>{
    sql.query(`SELECT * FROM hoadon WHERE SoHD=${reciptId}`,(err,res)=>{
        if(err){
            console.log("error", err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found recipt:", res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not found"}, null)
    });
};
Recipts.getAll =result =>{
    sql.query("SELECT * FROM hoadon", (err,res)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("recipts :",res);
        result(null,res);
    
    });
};
Recipts.updateById =(SoHD, recipt, result)=>{
    sql.query(
        "UPDATE hoadon SET NgayLap=?,TenHD =?, KHHD =?,KHMSHD =?,VAT =? WHERE SoHD =?",
        [recipt.NgayLap,recipt.TenHD,recipt.KHHD,recipt.KHMSHD,recipt.VAT, SoHD],
        (err, res)=>{
            if(err){
                console.log("err", err);
                result(null, err);
                return;
            }
            if(res.affectedRows ==0){
                result({kind: "not_found"}, null);
                return;
            }
            console.log("update customer:",{SoHD, ...recipt});
            result(null,{SoHD: SoHD, ...recipt})
        }
    );
};
Recipts.remove = (SoHD, result) => {
    sql.query("DELETE FROM hoadon WHERE SoHD = ?", SoHD, (err, res) => {
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
  
      console.log("deleted customer with id: ", SoHD);
      result(null, res);
    });
  };
  
  Recipts.removeAll = result => {
    sql.query("DELETE FROM hoadon", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} hoadon`);
      result(null, res);
    });
  };
  
module.exports = Recipts;

