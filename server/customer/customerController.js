const customer=require("./customerModel")
const user=require("../users/userModel")
const bcrypt=require("bcrypt")
register=(req,res)=>{
    let validation=[]
    if(!req.body.name){
        validation.push("Name is required")
    }
    if(!req.body.email){
        validation.push("Email is required")
    }
    if(!req.body.password){
        validation.push("Password is required")
    }
    if(!req.body.address){
        validation.push("Address is required")
    }
    if(!req.body.pincode){
        validation.push("Pincode is required")
    }
    if(!req.body.contact){
        validation.push("Contact is required")
    }
    if(!req.body.userType){
        validation.push("User Type is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        user.findOne({email:req.body.email})
        .then((userData)=>{
            if(!userData){
                let userObj=new user()
                userObj.name=req.body.name
                userObj.email=req.body.email
                userObj.password=bcrypt.hashSync(req.body.password, 10)
                userObj.userType=req.body.userType
                userObj.save()
                .then((userData)=>{
                    let userId=userData._id
                    let customerObj=new customer()
                    customerObj.contact=req.body.contact
                    customerObj.address=req.body.address
                    customerObj.pincode=req.body.pincode
                    customerObj.userId=userId
                    // customerObj.adhaarImage="customers/"+req.files.adhaarImage[0].filename
                    // customerObj.adhaarImage2 = "customers/"+req.files.adhaarImage[1].filename
                    // customerObj.residentialProofImage="customers/"+req.files.residentialProofImage[0].filename
                    customerObj.save()
                    .then((customerData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"User register Successfully",
                            data:customerData
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Server error",
                            errors:err
                        })
                    })

                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Server error",
                        errors:err
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Data already exist with same user email",
                    data:userData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Server error",
                errors:err
            })
        })
    }
}

getSingleCustomer=(req,res)=>{
    let validation=[]
    if(!req.body.userId){
        validation.push("userId is require")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        customer.findOne({userId:req.body.userId})
        .populate("userId")
        .then((userData)=>{
            if(!userData){
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
                    data:userData
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

getAllCustomers=async (req,res)=>{
    let limit=req.body.limit
    let currentPage= req.body.currentPage-1
    let total = await customer.countDocuments().exec()
    delete req.body.limit
    delete req.body.currentPage
    customer.find(req.body)
    .populate({path:"userId", select:"name email"})
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
updateCustomer=(req,res)=>{
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
        customer.findOne({_id:req.body._id})
        .then((customerData)=>{
            if(!customerData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Order found on this given Id"
                })
            }else{
                if(req.body.name){
                    customerData.name=req.body.name
                }
                if(req.body.email){
                    customerData.email=req.body.email
                }
                if(req.body.password){
                    customerData.password=req.body.password
                }
                if(req.body.address){
                    productData.address=req.body.address
                }
                if(req.body.pincode){
                    customerData.pincode=req.body.pincode
                }
                if(req.body.contact){
                    customerData.contact=req.body.contact
                }
                if(req.body.userType){
                    customerData.userType=req.body.userType
                }
                customerData.save()
                .then((updateData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Customer Detail Updated",
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
module.exports={register, getSingleCustomer, getAllCustomers, updateCustomer}