const brand=require("../brands/brandModel")
const category=require("../category/categoryModel")
const product=require("../products/productModel")
const user=require("../users/userModel")
const order=require("../order/OrderModel")
dashboard=async(req,res)=>{
    let brandTotal=0
    let userTotal=0
    brandTotal=await brand.countDocuments({status:true}).exec()
    categoryTotal=await category.countDocuments().exec()
    productTotal=await product.countDocuments().exec()
    userTotal=await user.countDocuments().exec()
    orderTotal=await order.countDocuments().exec()
    res.json({
        status:200,
        success:true,
        message:"Data loaded",
        totalBrand:brandTotal,
        totalCategory:categoryTotal,
        totalProduct:productTotal,
        totalUser:userTotal,
        totalOrder:orderTotal,
    })
}
module.exports={dashboard}