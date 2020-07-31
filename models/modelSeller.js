const sql = require('./dbconnect');



const Sellers = function(seller){
    this.MSTA = seller.MSTA;
    this.TenA  = seller.TenA;
    this.DiaChiA= seller.DiaChiA;
    this.CKSA = seller.CKSA;
    this.CKDTA = seller.CKDTA
    this.MaCQT = seller.MaCQT
}

Sellers.create =(newSeller, result)=>{
    sql.query("INSERT INTO benban SET ?",newSeller, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", { ...newSeller });
        result(null, { ...newSeller });

    });
};
Sellers.findById =(sellerId ,result)=>{
    sql.query(`SELECT * FROM benban WHERE MSTA=${sellerId}`,(err,res)=>{
        if(err){
            console.log("error", err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found seller:", res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not found"}, null)
    });
};
Sellers.getAll =result =>{
    sql.query("SELECT * FROM benban", (err,res)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("recipts :",res);
        result(null,res);
    
    });
};
Sellers.updateById =(MSTA, seller, result)=>{
    sql.query(
        "UPDATE benban SET TenA =?, DiaChiA =?,CKSA =?, CKDTA =? WHERE MSTA =?",
        [seller.TenA,seller.DiaChiA,seller.CKSA,seller.CKDTA, MSTA],
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
            console.log("update customer:",{MSTA, ...seller});
            result(null,{MSTA: MSTA, ...seller})
        }
    );
};
Sellers.remove = (MSTA, result) => {
    sql.query("DELETE FROM benban WHERE MSTA = ?", MSTA, (err, res) => {
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
  
      console.log("deleted customer with id: ", MSTA);
      result(null, res);
    });
  };
  
  Sellers.removeAll = result => {
    sql.query("DELETE FROM benban", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} hoadon`);
      result(null, res);
    });
  };
  
module.exports = Sellers;

