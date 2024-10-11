const category=require("./categoryModel")
const fs=require("fs")
addCategory=(req,res)=>{
    let validation=[]
    if(!req.body.categoryName){
        validation.push("category name is required")
    }
    if(!req.body.description){
        validation.push("description is required")
    }
    // if(!req.body.brandId){
    //     validation.push("Brand Id is required")
    // }
    if(!req.file){
        validation.push("Category is required")
    }
    
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })   
    }else{
        category.findOne({categoryName:req.body.categoryName})
        .then((categoryData)=>{
            if(!categoryData){
            let categoryObj=new category()
            categoryObj.categoryName=req.body.categoryName
            categoryObj.description=req.body.description
            categoryObj.brandId=req.body.brandId
            categoryObj.category="categories/"+req.file.filename
        
            categoryObj.save()
                .then((categoryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"category added",
                        data:categoryData
                    })
                })    
                .catch((err)=>{
                    res.json({
                        status:404,
                        success:false,
                        message:"server error",
                        error:err
                    })
                })
            }else{
                res.json({
                    status:500,
                    success:false,
                    message:"Data exist with same names"
                })
            }
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
// getAllCategory= async (req,res)=>{
//     let total = await category.countDocuments().exec()
//     console.log(total)
//     category.find(req.body)
//     .sort({createdAt : -1})
//     .skip(3)
//     .limit(1)
//     .then((result)=>{
//         res.json({
//             status:200,
//             success:true,
//             message:"Data Loaded",
//             data:result
//         })
//     })
//     .catch((err)=>{
//         res.json({
//             status:500,
//             success:false,
//             message:"Internal Server Error",
//             errors:err
//         })
//     })
// }
getAllCategory = (req,res)=>{
    category.find().populate("brandId")
    // let total = await category.countDocuments().exec()
    // console.log(total)
    category.find(req.body)
    // .sort({createdAt : -1})
    // .skip(2)
    // .limit(1)
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
                message:"Server Error",
                errors:err
                })
            })
}
getSingleCategory=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is require")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        category.findOne({_id:req.body._id})
        .then((categoryData)=>{
            if(!categoryData){
                res.json({
                    status:200,
                    success:false,
                    message:"No data found on this given id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data found",
                    data:categoryData
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
// deleteCategory=(req,res)=>{
//     let validation=[]
//     if(!req.body._id){
//         validation.push("id is require")
//     }
//     if(validation.length>0){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         category.deleteOne({_id:req.body._id})
//         .then((result)=>{
//             res.json({
//                 status:200,
//                 success:true,
//                 message:"Data Deleted successfully"
//             })
//         })
//         .catch((err)=>{
//             res.json({
//                 ststus:500,
//                 success:false,
//                 message:"Internal server error",
//                 errors:err
//             })
//         })
//     }
// }
// deleteCategoryByParam=(req,res)=>{
//     let validation=[]
//     if(!req.params._id){
//         validation.push("id is require")
//     }
//     if(validation.length>0){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         category.deleteOne({_id:req.params._id})
//         .then((result)=>{
//             res.json({
//                 status:200,
//                 success:true,
//                 message:"Data Deleted successfully"
//             })
//         })
//         .catch((err)=>{
//             res.json({
//                 ststus:500,
//                 success:false,
//                 message:"Internal server error",
//                 errors:err
//             })
//         })
//     }
// }
updateCategory=(req,res)=>{
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
        category.findOne({_id:req.body._id})
        .then((categoryData)=>{
            if(!categoryData){
                res.json({
                    status:500,
                    success:false,
                    message:"Data not found"
                })
            }else{
                if(req.body.categoryName){
                    categoryData.categoryName=req.body.categoryName
                }
                if(req.body.description){
                    categoryData.description=req.body.description
                }
                if(req.file){ 
                    let filepath="public/"+categoryData.category
                    fs.unlinkSync(filepath)
                    categoryData.category="categories/"+req.file.filename
                }
                categoryData.save()
                .then((updateData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Updated",
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
softDeleteCategory=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        category.findOne({_id:req.body._id})
        .then((categoryData)=>{
            if(!categoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"No data found on this given id"
                })
            }else{
                categoryData.status=false
                categoryData.save()
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
module.exports={addCategory, getAllCategory, getSingleCategory, updateCategory, softDeleteCategory}
