const sql = require('./dbconnect');
 
const TaxAuthoritie = function(taxAuthoritie){
    this.MaCQT = taxAuthoritie.MaCQT;
    this.TenCQT  = taxAuthoritie.TenCQT;
}


TaxAuthoritie.create = async (newTaxAuthoritie, result) => {
  
    sql.query("INSERT INTO coquanthue SET ?", newTaxAuthoritie,async (err, res) => {
      if (err) {
        console.log("error: ", err);
        await result(err, null);
        return;
      }
     console.log(newTaxAuthoritie);
  
      console.log("created newTaxAuthoritie: ", {...newTaxAuthoritie  });
      await result(null, {...newTaxAuthoritie });
    });
  };
TaxAuthoritie.findById = async(taxAuthoritieId ,result)=>{
      
      sql.query(`SELECT * FROM coquanthue WHERE MaCQT ='${taxAuthoritieId}'`, async(err,res)=>{
        if(err){
            console.log("error", err);
            await result(err,null);
            return;
        }
        if(res.length){
            console.log("found recipt:", res[0]);
            await  result(null,res[0]);
            return;
        }
        await result({kind:"not found"}, null)
    });
};
TaxAuthoritie.getAll =async result =>{
    sql.query("SELECT * FROM coquanthue",async (err,res)=>{
        if(err){
            console.log("error :", err);
            await result(null,err);
            return;
        }
        console.log("recipts :",res);
        await result(null,res);
    
    });
};
TaxAuthoritie.updateById = async(MaCQT, taxAuthoritie, result)=>{
    sql.query(
        "UPDATE coquanthue SET TenCQT =? WHERE MaCQT =?",
        [taxAuthoritie.TenCQT, MaCQT],
        async (err, res)=>{
            if(err){
                console.log("err", err);
                await result(null, err);
                return;
            }
            if(res.affectedRows ==0){
              await result({kind: "not_found"}, null);
                return;
            }
            console.log("update customer:",{MaCQT, ...taxAuthoritie});
            await result(null,{MaCQT: MaCQT, ...taxAuthoritie})
        }
    );
};
TaxAuthoritie.remove =async (MaCQT, result) => {
    sql.query("DELETE FROM coquanthue WHERE MaCQT = ?", MaCQT,async (err, res) => {
      if (err) {
        console.log("error: ", err);
        await result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        await result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", MaCQT);
      await result(null, res);
    });
  };
  
  TaxAuthoritie.removeAll = async result => {
    sql.query("DELETE FROM coquanthue", async (err, res) => {
      if (err) {
        console.log("error: ", err);
        await result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} coquanthue`);
      await result(null, res);
    });
  };
  
module.exports = TaxAuthoritie;

