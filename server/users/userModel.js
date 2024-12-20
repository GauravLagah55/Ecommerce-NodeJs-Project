const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{type:String, default:""},
    email:{type:String, default:""},
    password:{type:String, default:""},
    userType:{type:String, default:"2"},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("userModel", userSchema)