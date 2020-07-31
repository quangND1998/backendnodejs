
const sql = require('./dbconnect');
const bcrypt = require('bcrypt')
const saltRounds = 10;
exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
    
  var users={
     MSTA:req.body.MSTA,
     TenDN: req.body.TenDN,
     password:encryptedPassword,
     repassword : req.body.repassword
   }

    if(password == users.repassword){
        sql.query('INSERT INTO users SET ?',users, function (error, results, fields) {
            if (error) {
              res.send({
                "code":400,
                "failed":"error ocurred"
                
              }
              )
              console.log(users)
            } else {
                    res.send({
                        "code":200,
                        "success":"user registered sucessfully"
                          });
                  
                    }
          });
    }else {
        res.send({
            "code":204,
            "success": "Nhập lại mật khẩu sai"
        })
    }

}

exports.login = async function(req,res){
    var MSTA= req.body.MSTA;
    var TenDN =req.body.TenDN
    var password = req.body.password;
    sql.query('SELECT * FROM users WHERE MSTA = ?',[MSTA], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
          
          if(comparision && TenDN== results[0].TenDN){
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
              
          }
          else{
            res.send({
                 "code":204,
                 "success":"Mã Số Thuế or password or Tên Đăng Nhập does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Tên Đăng Nhập  does not exits"
              });
        }
      }
      });
  }