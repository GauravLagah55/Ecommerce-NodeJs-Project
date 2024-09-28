const mongoose=require("mongoose")
//schema- structure 
//brandName- String, description-String, status- true/false, createdAt- Date + _id(unique)

const brandSchema=mongoose.Schema({
    brandName:{type:String, default:""},
    description:{type:String, default:""},
    brandLogo:{type:String, default:"no-pic.jpg"},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})

module.exports=mongoose.model('brandModel' ,  brandSchema)