const mongoose = require("mongoose")
const orderDetailSchema=mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"productModel", default:null},
    orderId:{type:mongoose.Schema.Types.ObjectId, ref:"OrderModel", default:null},
    quantity:{type:Number, default:0},
    price:{type:Number, default:0},
    total:{type:Number, default:0},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("OrderDetailModel", orderDetailSchema)