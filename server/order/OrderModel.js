const mongoose = require("mongoose")
const orderSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"userModel", default:null},
    totalPrice:{type:Number, default:0},
    address:{type:String,default:""},
    orderDetails:[
       { 
            productId:{type:mongoose.Schema.Types.ObjectId, ref:"productModel",default:null},
            price:{type:Number, default:0},
            quantity:{type:Number, default:1},
            total:{type:Number, default:0},
        }
    ],
    orderStatus:{type:Number, default:"1"},
     // 1-> placed, 2-> approve, 3-> packed, 4-> shipped, 5-> delivered, 6-> order cancel
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("OrderModel", orderSchema)