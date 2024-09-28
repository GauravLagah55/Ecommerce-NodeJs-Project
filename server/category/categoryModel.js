const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    categoryName:{type:String, default:""},
    description:{type:String, default:""},
    category:{type:String, default:"no-pic.jpg"},
    brandId:{type:mongoose.Schema.Types.ObjectId, ref:"brandModel", default:null},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()},
   
})

module.exports=mongoose.model('categoryModel' ,  categorySchema)