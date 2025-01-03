const mongoose=require("mongoose")
const querySchema=mongoose.Schema({
    name:{type:String, default:""},
    email:{type:String, default:""},
    subject:{type:String, default:""},
    messsage:{type:String, default:""},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("queryModel", querySchema)