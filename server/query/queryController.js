const query=require("./queryModel")
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
        // query.findOne({userId:req.body.userId})
        // .then((queryData)=>{
        //     if(!queryData){
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
        //     }else{
        //         res.json({
        //             status:200,
        //             success:false,
        //             message:"No any query is pending"
        //         })
        //     }
        // })
        // .catch((err)=>{
        //     res.json({
        //         status:500,
        //         success:false,
        //         message:"Internal server error",
        //         errors:err
        //     })
        // })
    }
}
getAll=(req,res)=>{
    query.find(req.body).populate("userId")
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
deleteQuery=(req,res)=>{
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
