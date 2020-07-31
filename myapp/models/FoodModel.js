var mogoose = require('mongoose');
var Schema = mogoose.Schema;

var FoodSchema = new Schema({
    name: {
        type: String,
        require : true
    },
    foodDescription : {
        type : String,
        default:""
    },
    created_date :{
        type : Date,
        default : Date.now
    },
    status :{
        type :[{
            type : String,
            enum : ['available', 'unavailable']
        }],
        default: ['available']


    },
    categoryid :Schema.ObjectId

});
//a setter : khi một trường name đc gắn giá trị thì làm gì đó mới gắn vào cơ sỏ dữ  liệu
FoodSchema.path('name').set((inputString)=>{
    return inputString[0].toUpperCase()+inputString.slice(1);
});
module.exports = mogoose.model('Food',FoodSchema);