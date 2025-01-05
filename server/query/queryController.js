
const query=require("./QueryModel")
const fs=require('fs')
addQuery=(req,res)=>{
    let validation=[]
    if(!req.body.name){
        validation.push("Name is required")
    }
    if(!req.body.email){
        validation.push("Email is required")
    }
    if(!req.body.subject){
        validation.push("Subject is required")
    }
    if(!req.body.message){
        validation.push("Message is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        
                let queryObj=new query()
                queryObj.name=req.body.name
                queryObj.email=req.body.email
                queryObj.subject=req.body.subject
                queryObj.message=req.body.message
                queryObj.save()
                .then((queryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Query Added",
                        data:queryData
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
getAll= async(req,res)=>{
    let limit=req.body.limit
    let currentPage= req.body.currentPage-1
    let total = await query.countDocuments().exec()
    delete req.body.limit
    delete req.body.currentPage
    query.find(req.body)
    .limit(limit)
    .skip(currentPage*limit)
    // query.find()
    .then((result)=>{
            res.json({
                status:200,
                success:true,
                message:"Quiries Loaded",
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
deleteQuery= async(req,res)=>{
    
    let validation=[]
    if(!req.body._id){
        validation.push("id is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            total:total,
            message:validation
        })
    }else{
        query.deleteOne({_id:req.body._id})
        .then((result)=>{
            res.json({
                status:200,
                success:true,
                message:"Query deleted",
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
}  
module.exports={addQuery,getAll,deleteQuery}
