const brand = require("./brandModel")
const fs=require('fs')
addBrand=(req,res)=>{
    let validation=[]
    if(!req.body.brandName){
        validation.push('Brand Name is Required')
    }
    if(!req.body.description){
        validation.push('description is Required')
    }
    if(!req.body.brandLogo){
        validation.push("Brand Logo is require")
    }
    if(!req.body.brandType){
        validation.push("Brand Type is require")
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
                brandObj.brandType=req.body.brandType
                brandObj.brandLogo=req.body.brandLogo
                // brandObj.brandLogo="brands/"+req.file.filename
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
    // console.log(req.body)
    let limit=req.body.limit
    let currentPage= req.body.currentPage-1
    let total = await brand.countDocuments().exec()
    delete req.body.limit 
    delete req.body.currentPage
    // console.log(req.body)
   brand.find(req.body)
   .limit(limit)
   .skip(currentPage*limit)
    .then((result)=>{
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
            message:"Internal server error",
            errors:err
        })
    })
}

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

deleteBrandByParam=(req,res)=>{
        console.log( req.params._id);
        let validation=[]
        if(!req.params._id){
            validation.push("_id is required")
        }
        if(validation.length>0){
            res.json({
                status:422,
                success:false,
                message:validation
            })
        }else{
            brand.deleteOne({_id:req.params._id})
            .then((result)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Data deleted successfully"
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
}
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
                    if(req.body.brandType){
                        brandData.brandType=req.body.brandType
                    }
                    if(req.body.brandLogo){
                        brandData.brandLogo=req.body.brandLogo
                    }
                    // if(req.file){
                    //     // let filepath="public/"+brandData.brandLogo
                    //     // fs.unlinkSync(filepath)
                    //     // brandData.bandLogo="brands/"+req.file.filename
                    // }
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
            brandData.status=req.body.status
            brandData.save()
            .then((result)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Change Brand Status",
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

module.exports={addBrand, getAllBrand, getSingleBrand, updateBrand, changeStatus, deleteBrandByParam}