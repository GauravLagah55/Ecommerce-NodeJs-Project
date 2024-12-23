
const product = require("./productModel")
const fs=require("fs")
addProduct=(req,res)=>{
    // console.log(req.body);
    let validation=[]
    if(!req.body.productName){
        validation.push("Product Name is Required")
    }
    if(!req.body.description){
        validation.push("description is Required")
    }
    if(!req.body.size){
        validation.push("size is Required")
    }
    if(!req.body.price){
        validation.push("price is Required")
    }
    if(!req.body.productImage){
        validation.push("Product Image is required")
    }
    
    if(!req.body.categoryId){
        validation.push("Category Id is required")
    }
    if(!req.body.brandId){
        validation.push("Brand Id is required")
    }

    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        }) 
    }else{
            let productObj=new product()
            productObj.productName=req.body.productName
            productObj.price=req.body.price
            productObj.description=req.body.description
            productObj.size=req.body.size
            productObj.categoryId=req.body.categoryId;
            productObj.brandId=req.body.brandId
            productObj.productImage=req.body.productImage
            productObj.save()
            .then((productData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Product Added",
                    data:productData
                })
            })
            .catch((err)=>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error",
                    error:err
                })
            })
    }
    
}


getAllProduct=async (req,res)=>{
    let limit=req.body.limit
    let currentPage= req.body.currentPage-1
    let total = await product.countDocuments().exec()
    delete req.body.limit
    delete req.body.currentPage
    product.find(req.body).populate("categoryId").populate("brandId")
    .limit(limit)
    .skip(currentPage*limit)
    .then((productData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data Loaded",
            total:total,
            data:productData
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Interval server error",
            error:err
        })
    })
}
getSingleProduct=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        product.findOne({_id:req.body._id})
        .populate("brandId").populate("categoryId")
        .then((productData)=>{
            if(!productData){
                res.json({
                    status:200,
                    success:false,
                    message:"No data found on the given Id"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded",
                    data:productData
                })
            }
        })
        .catch((err)=>{
            res.json({
                ststud:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }
}

updateProduct=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("id is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        product.findOne({_id:req.body._id})
        .then((productData)=>{
            if(!productData){
                res.json({
                    status:200,
                    success:false,
                    message:"Data not found"
                })
            }else{
                if(req.body.productName){
                    productData.productName=req.body.productName
                }
                if(req.body.description){
                    productData.description=req.body.description
                }
                if(req.body.size){
                    productData.size=req.body.size
                }
                if(req.body.price){
                    productData.price=req.body.price
                }
                if(req.body.categoryId){
                    productData.categoryId=req.body.categoryId
                }
                if(req.body.brandId){
                    productData.brandId=req.body.brandId
                }
                if(req.body.productImage){
                    productData.productImage=req.body.productImage
                }
                
                productData.save()
                .then((updateData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated",
                        data:updateData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                errors:err
            })
        })
    }

}
changeStatus=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        product.findOne({_id:req.body._id})
        .then((productData)=>{
            if(!productData){
                res,json({
                    status:404,
                    success:false,
                    message:"No data found on this given id"
                })
            }else{
                productData.status=req.body.status
                productData.save()
                .then((result)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data soft deleted",
                        data:result
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Interval server error",
                        errors:err
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Interval server error",
                errors:err
            })
        })
    }
}
module.exports={addProduct, getAllProduct, getSingleProduct, updateProduct, changeStatus}
