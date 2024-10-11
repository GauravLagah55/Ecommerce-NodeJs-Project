const enquiry=require("./EnquiryModel")
addEnquiry=(req,res)=>{
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
        enquiry.findOne({email:req.body.email})
        .then((enquiryData)=>{
            if(!enquiryData){
                let enquiryObj=new enquiry()
                enquiryObj.name=req.body.name
                enquiryObj.email=req.body.email
                enquiryObj.subject=req.body.subject
                enquiryObj.message=req.body.message
                enquiryObj.save()
                .then((enquiryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Enquiry Added",
                        data:enquiryData
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
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"No any enquiry is pending"
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
getAll=(req,res)=>{
    enquiry.find({userId:req.body.userId})
    .then((result)=>{
            res.json({
                status:200,
                success:true,
                message:"Enquiries Loaded",
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
deleteEnquiry=(req,res)=>{
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
        enquiry.deleteOne({_id:req.body._id})
        .then((result)=>{
            res.json({
                status:200,
                success:true,
                message:"Enquiry deleted",
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
module.exports={addEnquiry,getAll,deleteEnquiry}
