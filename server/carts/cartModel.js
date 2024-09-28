const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"productModel", default:null},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"userModel", default:null},
    quantity:{type:Number, default:1},
    price:{type:Number, default:0},
    total:{type:Number, default:0},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("cartModel", cartSchema)