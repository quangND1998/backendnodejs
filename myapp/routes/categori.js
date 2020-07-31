var express = require('express');
var router = express.Router();
var Categori = require('../models/CategoriModel');
var Food = require('../models/FoodModel'); // để xóa cả 2 thằng
var mongoose = require('mongoose')
 router.post('/insert_new_categori',(req,res)=>{
     let criteria ={
         name : new RegExp('^' +req.body.name.trim()+'$', 'i')
     };
     Categori.find(criteria).limit(1).exec((err,categories)=>{
         if(err){

         }else{
             //nếu đã tồn tại ,thì ko cho update
            if( categories.length >0){

            }else{
                let newCategori =new Categori({
                    name : req.body.name,
                    description : req.body.description
                });
                newCategori.save((err,addedCategory)=>{
                    if(err){
                        res.json({
                            result: "failed",
                            data : {},
                            messege : `Error is ${err}`
                        });
                    } else{
                        res.json({
                            result:"ok",
                            data: addedCategory,
                            messege:"Insert new category successfully"
                        });

                    }
                });
            }

         }
     });
 });
 router.delete('/delete_a_category', (req , res, next)=>{
     Categori.findOneAndRemove({_id:mongoose.Types.ObjectId(req.body.category_id)}, (err)=>{
         if(err){
             res.json({
                 result: "failed",
                 messege: `Cannot delete a category, Error is :${err}`
             })
             return;
         }
         Food.findOneAndRemove({categoryid: mongoose.Types.ObjectId(req.body.category_id)},(err)=>{
            if(err){
                res.json({
                    result: "failed",
                    messege: `Cannot delete a category,${req.body.category_id} , Error is :${err}`
                });
                return;
            }
            res.json({
                result:"Ok",
                messege: "Delete categori anhd Food with categori_id is successfullu"
            })
         })
     })
 })
  module.exports = router;
  