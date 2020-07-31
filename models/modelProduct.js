const sql = require("./dbconnect");
const Products = function( product){
    this.MaSP = product.MaSP;
    this.TenSP =product.TenSP;
    this.DVT= product.DVT;
    this.MSTA =product.MSTA;
}

Products.create = ( newProdcut,result)=>{
    sql.query("INSERT INTO sanpham SET ?", newProdcut,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created product :", {...newProdcut});
        result(null,{...newProdcut});
    });
};

Products.findById = (productId, result)=>{
    sql.query(`SELECT * FROM sanpham WHERE MaSP='${productId}'`, (err,res)=>{
        if(err){
            console.log("error :", err);
            result(err, null);
            return;

        }
        if(res.length){
            console.log("found_prodcut", res[0]);
            result(null,res[0]);
            return;
        }
        return({kind: "not_found"},null);
    });
}
Products.getAll = result =>{
    sql.query("SELECT * FROM sanpham" ,(err, res)=>{
        if(err){
            console.log("error: ",err)
            result(null,err);
            return;
        }
        console.log("product :", res);
        result(null,res);
    });
}

Products.getAllProducts =(limit,offset,result) =>{
    const prodsQuery = "select * from sanpham limit "+limit+" OFFSET "+offset;
    sql.query(prodsQuery,(err, res)=>{
        if(err){
            console.log("error: ",err)
            result(null,err);
            return;
        }
        console.log("product :", res);
        result(null,res);
    });
}
Products.updateById =(MaSP, product,result)=>{
    sql.query("UPDATE sanpham SET TenSP=?,DVT=? WHERE MaSP =?",
    [product.TenSP,product.DVT, MaSP],
    (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind :"not_found"},null);
            return;
        }
        console.log("updated product: ",{MaSP: MaSP, ...product})
        result(null, {MaSP:  MaSP,...product})

    })
}
Products.remove = (MaSP, result) => {
    sql.query("DELETE FROM sanpham WHERE MaSP = ?", MaSP, (err, res) => {
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
  
      console.log("deleted tongtien with id: ", MaSP);
      result(null, res);
    });
  };
  
  Products.removeAll = result => {
    sql.query("DELETE FROM sanpham", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };
  
  
  module.exports = Products;


  