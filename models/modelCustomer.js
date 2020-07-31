const sql = require('./dbconnect');
//constructor

const Customer =  function (customer){
    this.MaKH = customer.MaKH;
    this.TenKH = customer.TenKH;
    this.DiaChiB = customer.DiaChiB
    this.MaSTB =customer.MaSTB;
    this.ChuKySo = customer.ChuKySo;
    this.ChuKyDT = customer.ChuKyDT;

}
 Customer.create =  async (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, async(err, res) => {
    if (err) {
      console.log("error: ", err);
      await result(err, null);
      return;
    }

    console.log("created customer: ", { MaKH: res.insertId, ...newCustomer });
    result(null, { MaKH: res.insertId, ...newCustomer });
  });
};

Customer.findById = async (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE MaKH = ${customerId}`,async (err, res) => {
    if (err) {
      console.log("error: ", err);
      await result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
Customer.getAll = async(result) =>{
    sql.query("SELECT *FROM customers ", async(err,res)=>{
        if(err){
            console.log("error: ",err);
            await result(null,err);
            return;
        }
        console.log("customers : ",res );
        result(null,res);
    });
};

Customer.updateById =async (MaKH, customer, result) => {
    sql.query(
      "UPDATE customers SET TenKH = ?, DiaChiB = ?, MaSTB = ?, ChuKySo =?,ChuKyDT= ? WHERE MaKH = ?",
      [customer.TenKH, customer.DiaChiB, customer.MaSTB,customer.ChuKySo,customer.ChuKyDT, MaKH], 
      async (err, res) => {
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
  
        console.log("updated customer: ", { MaKH: MaKH, ...customer });
        await result(null, { MaKH: MaKH, ...customer });
      }
    );
  };
  Customer.remove =async(MaKH, result) => {
    sql.query("DELETE FROM customers WHERE MaKH = ?", MaKH, async(err, res) => {
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
  
      console.log("deleted customer with id: ", MaKH);
      await result(null, res);
    });
  };
  
  Customer.removeAll =async( result) => {
    sql.query("DELETE FROM customers",async (err, res) => {
      if (err) {
        console.log("error: ", err);
         await result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      await result(null, res);
    });
  };
  
  module.exports = Customer;