
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
    if(!req.body.brandId){
        validation.push("Brand Id is required")
    }
    if(!req.body.categoryImage){
        validation.push("Category Image is required")
    }
    
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })   
    }else{
       
            let categoryObj=new category()
            categoryObj.categoryName=req.body.categoryName
            categoryObj.description=req.body.description
            categoryObj.brandId=req.body.brandId
            categoryObj.categoryImage=req.body.categoryImage
        
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
   
    }     
}

getAllCategory =async (req,res)=>{
    let limit=req.body.limit
    let currentPage= req.body.currentPage-1
    let total = await category.countDocuments().exec()
    delete req.body.limit
    delete req.body.currentPage
    category.find(req.body).populate("brandId")
    .limit(limit)
    .skip(currentPage*limit)
    .then((result)=>{
        // console.log(result)
        res.json({
            status:200,
            success:true,
            message:"Data Loaded",
            total:total,
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
        .populate("brandId")
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
                if(req.body.categoryImage){
                categoryData.categoryImage=req.body.categoryImage
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
changeStatus=(req,res)=>{
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
                categoryData.status=req.body.status
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
module.exports={addCategory, getAllCategory, getSingleCategory, updateCategory, changeStatus}
