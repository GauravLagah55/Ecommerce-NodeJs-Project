const mongoose=require("mongoose")
//schema- structure 
//brandName- String, description-String, status- true/false, createdAt- Date + _id(unique)

const productSchema=mongoose.Schema({
    productName:{type:String, default:""},
    price:{type:Number, default:""},
    description:{type:String, default:""},
    size:{type:String, default:""},
    // productImages:[{type:String, default:"no-pic.jpg"}],
    productImage:{type:String, default:"no-pic.jpg"},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:"categoryModel", default:null},
    brandId:{type:mongoose.Schema.Types.ObjectId, ref:"brandModel", default:null},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}

})

module.exports=mongoose.model('productModel' ,  productSchema)