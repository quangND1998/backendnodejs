var express = require('express');
var router = express.Router();
var Food = require('../models/FoodModel');
var mongoose = require('mongoose');
  
router.get('/list_all_foods', function(req, res, next) {
    //hàm find để list ra tất cả danh sahcs limit(n) với n là số bản ghi đc list ra
    Food.find({}).limit(100).sort({name:1}).select({
        name : 1,
        foodDescription :1,
        created_date :1,
        status :1
    }).exec((err, foods)=>{
        if(err){
            res.json({
                result:'failed',
                data :[],
                messege: `Error is : ${err}`
            })
        }else{
            res.json({
                result: 'ok',
                data: foods,
                count : foods.length,
                messege: "Query list of foods successfully"
            });
        }
    });
  });
  
/// get food by id
//Example : http://localhost:3000/foods/get_food_by_id?food_id=5ee44d859088902100a683b9
router.get('/get_food_by_id', (req,res)=>{
    Food.findById(require('mongoose').Types.ObjectId(req.query.food_id),
    (err,food)=>{
        if(err){
            res.json({
                result :'failed',
                data:{},
                messege :`Erro is : ${err}`

            })
        }else{
            res.json({
                result: "ok",
                data: food,
                messege : "Query food by id successfully"
            });
        }

    });
});

//query có điều kiện
//Example:http://localhost:3000/foods/list_foods_with_criteria?name=Food&limit=10
router.get('/list_foods_with_criteria', function(req, res, next) {
    //hàm find để list ra tất cả danh sahcs limit(n) với n là số bản ghi đc list ra

    let criteria ={
        name :  new RegExp(req.query.name, "i")
    };
    const limit = parseInt(req.query.limit)>0 ? parseInt(req.query.limit): 100;
    Food.find(criteria).limit(limit).sort({name:1}).select({
        name : 1,
        foodDescription :1,
        created_date :1,
        status :1
    }).exec((err, foods)=>{
        if(err){
            res.json({
                result:'failed',
                data :[],
                messege: `Error is : ${err}`
            })
        }else{
            res.json({
                result: 'ok',
                data: foods,
                count : foods.length,
                messege: "Query list of foods successfully"
            });
        }
    });
  });
  


  router.post('/insert_new_food', function(req, res, next) {
      const newFood = new Food({
        name : req.body.name,
        foodDescription : req.body.foodDescription
      });
      newFood.save((err)=>{
        if(err){
          res.json({
            result : "failed",
            data :{},
            messege : `Error is: ${err}`
  
          });
        } else{
          res.json({
            result : "ok",
            data :{
              name : req.body.name,
              foodDescription : req.body.foodDescription,
              messege : "Insert new food successfully"
            }
          });
        }
      });
  });
  router.put('/update_a_food', function(req, res, next) {
    let conditions ={};//tìm kiếm bản ghi với điều kiện
    if(mongoose.Types.ObjectId.isValid(req.body.food_id)==true){//food_id đúng là kiểu object id chưa
      conditions._id = mongoose.Types.ObjectId(req.body.food_id);
    }else{
      res.json({
        result: "failed",
        data : {},
        messege : " You must enter food_id to update"
      });
    }
    let newValues ={}; //giá trị mới cần cập nhật
    if(req.body.name && req.body.name.length >2){
      newValues.name =req.body.name;
    }
    const options ={
      new : true,
      mutil : true,
    }
    if(mongoose.Types.ObjectId.isValid(req.body.category_id)== true){
      newValues.categoryid = mongoose.Types.ObjectId(req.body.category_id)
    }
    Food.findOneAndUpdate(conditions, {$set:newValues},options,(err,updateFood)=>{
      if(err){
        res.json({
          result:"failed",
          data:{},
          messege : `Cant not update food ${err}`
        })
        
      }else{
        res.json({
          result:"ok",
          data:updateFood,
          messege : "Update food succsecfully"
        })
      }
    })
  });
  router.delete('/delete_a_food', function(req, res, next) {
    res.send('Delete request ');
  });

  module.exports = router;
  