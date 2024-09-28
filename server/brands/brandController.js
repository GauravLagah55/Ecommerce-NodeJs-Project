const brand = require("./brandModel")
addBrand=(req,res)=>{
    let validation=[]
    if(!req.body.brandName){
        validation.push('Brand Name is Required')
    }
    if(!req.body.description){
        validation.push('description is Required')
    }
    if(req.file){
        validation.push("Brand Logo is require")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        //duplicacy check
        brand.findOne({brandName:req.body.brandName})
        .then((brandData)=>{ 
            // console.log(brandData)
            if(!brandData){
                let brandObj = new brand()
                // console.log(brandObj);
                brandObj.brandName=req.body.brandName
                brandObj.description=req.body.description
                brandObj.brandLogo="brands/"+req.file.filename
            
                brandObj.save()
                .then((brandData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Brand added",
                        data:brandData
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
                data:brandData
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

getAllBrand=async (req,res)=>{
    let total = await brand.countDocuments().exec()
    console.log(total)
    brand.find(req.body)
    // .sort({createdAt: -1})
    // .skip(4)
    // .limit(5)
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
            message:"Internal server error",
            errors:err
        })
    })
}
//getSingle 
//unique- id(single, update, delete)
getSingleBrand=(req,res)=>{
    brand.findOne(req.body)
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
        brand.findOne({_id:req.body._id})
        .then((brandData)=>{
            // console.log(brandData)
            if(!brandData){
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
                    data:brandData
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
// delele
// permanent delete
// soft delete
// deleteBrand=(req, res)=>{
//     let validation=[]
//     if (!req.body.id){
//         validation.push("_id is required")
//     }
//     if(validation.length>0){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         brand.deleteOne({_id:req.body.id})
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
// deleteBrandByParam=(req,res)=>{
//         console.log( req.params._id);
//         let validation=[]
//         if(!req.params._id){
//             validation.push("_id is required")
//         }
//         if(validation.length>0){
//             res.json({
//                 status:422,
//                 success:false,
//                 message:validation
//             })
//         }else{
//             brand.deleteOne({_id:req.params._id})
//             .then((result)=>{
//                 res.json({
//                     status:200,
//                     success:true,
//                     message:"Data deleted successfully"
//                 })
//             })
//             .catch((err)=>{
//                 res.json({
//                     status:500,
//                     success:false,
//                     message:"Internal server error",
//                     errors:err
//                 })
//             })
//         }    
// }
updateBrand=(req,res)=>{
        let validation=[]
        if(!req.body._id){
            validation.push("_id is required")
        }
   
        if(validation.length>0){
            res.json({
                status:422,
                success:false,
                error:validation
            })
        }else{
            brand.findOne({_id:req.body._id})
            .then((brandData)=>{
                // console.log(brandData)
               if(!brandData){
                res.json({
                    status:200,
                    success:false,
                    message:"Data not found"
                })
               }else{
                    if(req.body.brandName){
                        brandData.brandName=req.body.brandName
                    }
                    if(req.body.description){
                        brandData.description=req.body.description
                    }
                    if(req.file){
                        brandData.bandLogo="brands"+req.file.filename
                    }
                   
                    brandData.save()
                    .then((updateData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Data updated",
                            data:updateData
                        })
                    }).catch((err)=>{
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
softDeleteBrand=(req,res)=>{
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
    } 
    else{
        brand.findOne({_id:req.body._id})
        .then((brandData)=>{
           if(!brandData){
            res.json({
                success:false,
                status:404,
                message:"No data found at the given id"
            })
           }else{
            brandData.status=false
            brandData.save()
            .then((result)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Brand soft deleted",
                    data:result
                })
            }).catch((err)=>{
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

module.exports={addBrand, getAllBrand, getSingleBrand, updateBrand, softDeleteBrand}