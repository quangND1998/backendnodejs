var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CategoriSchema = new Schema({
    name :{
        type : String,
        required: true
    },
    description :{
        type : String,
        required: ""
    },
    created_date :{
        type : Date,
        default: Date.now
    }


})
CategoriSchema.path('name').set((inputString)=>{
    return inputString[0].toUpperCase()+inputString.slice(1);
})
module.exports = mongoose.model("Categori",CategoriSchema)