
const product = require("./productModel")
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
    if(req.files.length<=0){
        validation.push("Image is required")
    }
    // if(!req.body.categoryId){
    //     validation.push("Category Id is required")
    // }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        }) 
    }else{
        product.findOne({productName:req.body.productName})
        .then((productData)=>{
            if(!productData){
            let productObj=new product()
            productObj.productName=req.body.productName
            productObj.price=req.body.price
            productObj.description=req.body.description
            productObj.size=req.body.size
            productObj.categoryId=req.body.categoryId;
            // console.log(req.files);
            req.files.forEach((el, index)=>{
                console.log(el.filename)
                let filename="products/"+el.filename
                productObj.productImages.push(filename)
            })
            // productObj.product="products/"+req.files.filename
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
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Data exist with same name",
                    data:productData
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

getAllProduct= async(req,res)=>{
    let total = await product.countDocuments().exec()
    console.log(total)
    product.find(req.body)
    .sort({createdAt : -1})
    .skip(2)
    .limit(1)
    .then((result)=>{
        res.json({
            status:200,
            success:true,
            message:"Data Loaded",
            data:result
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
getAllProduct=(req,res)=>{
    product.find().populate("categoryId")
    .then((productData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data Loaded",
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
// deleteProduct=(req,res)=>{
//     let validation=[]
//     if(!req.body._id){
//         validation.push("_id is required")
//     }
//     if(validation.length>0){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         product.deleteOne({_id:req.body._id})
//         .then((result)=>{
//             res.json({
//                 status:200,
//                 success:true,
//                 message:"Data Deleted successfully",
//             })
//         })
//         .catch((err)=>{
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal server error",
//                 errors:err
//             })
//         })
//     }    
// }
// deleteProductByParam=(req,res)=>{
//     let validation=[]
//     if(!req.params._id){
//         validation.push("id is required")
//     }
//     if(validation.length>0){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         product.deleteOne({_id:req.params._id})
//         .then((result)=>{
//             res.json({
//                 status:200,
//                 success:true,
//                 message:"Data Deleted successfully"
//             })
//         })
//         .catch((err)=>{
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal server error",
//                 errors:err
//             })
//         })
//     }    
// }
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
softDeleteProduct=(req,res)=>{
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
                productData.status=false
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
module.exports={addProduct, getAllProduct, getSingleProduct, updateProduct, softDeleteProduct}
