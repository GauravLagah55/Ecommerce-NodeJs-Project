const mongoose=require("mongoose")
const customerSchema=mongoose.Schema({
    contact:{type:String, default:""},
    address:{type:String, default:""},
    pincode:{type:String, default:""},
    // adhaarImage:{type:String, default:"no-pic.jpg"},
    // adhaarImage2:{type:String, default:"no-pic.jpg"},
    // adhaarImages:[{type:String,default:null}]
    residentialProofImage:{type:String,default:"no-pic.jpg"},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"userModel", default:null},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("customerModel", customerSchema)