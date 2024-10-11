const user=require("./userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const PRIVATE_KEY="MyProject55"
login=(req,res)=>{
    //validation
    let validation=[]
    if(!req.body.email){
        validation.push("Email is required")
    }
    if(!req.body.password){
        validation.push("Password is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    console.log(req.body.email);
    
    user.findOne({email:req.body.email})
    .then((userData)=>{
        console.log(userData);
        
        if(!userData){
            res.json({
                status:404,
                success:false,
                message:"No user found on this given email"
            })
        }else{
            //check password
            //(plain pass, encrypted pass)
            // const result=bcrypt.compareSync(req.body.password,userData.password)
            // console.log(result)
            // console.log(bcrypt.hashSync(req.body.password,10))
            // console.log(userData.password)
            if(bcrypt.compareSync(req.body.password,userData.password)){
                let payload={
                    name:userData.name,
                    email:userData.email,
                    userId:userData._id,
                    userType:userData.userType
                }
                let token=jwt.sign(payload, PRIVATE_KEY)
                // let decryptToken = jwt.verify(token,PRIVATE_KEY);
                res.json({
                    success:true,
                    status:200,
                    message:"User Login successfully",
                    data:userData,
                    token:token
                })
            }else{
                res.json({
                    success:false,
                    status:200,
                    message:"invalid credentials",
                })
            }    
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
changePassword=(req,res)=>{
    let validation=[]
    // if(!req.body.userId){
    //     validation.push("User Id is required")
    // }
    if(!req.body.oldPassword){
        validation.push("Old password is required")
    }
    if(!req.body.newPassword){
        validation.push("New password is required")
    }
    if(!req.body.confirmPassword){
        validation.push("Confirm password is required")
    }
    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation
        })
    }else{
        if(req.body.confirmPassword!=req.body.newPassword){
            res.json({
                status:200,
                success:false,
                message:"Confirm Password and new password don't match"
            })
        }else{
            user.findOne({_id:req.body.userData.userId})
            .then((userData)=>{
                if(!userData){
                    res.json({
                        status:500,
                        success:false,
                        message:"No user found"
                    }) 
                }else{
                    if(bcrypt.compareSync(req.body.oldPassword,userData.password)){
                        userData.password=bcrypt.hashSync(req.body.newPassword, 10)
                        userData.save()
                        .then((result)=>{
                            res.json({
                                status:200,
                                success:true,
                                message:"Password changed Successfully"
                            })
                        })
                       .catch((err)=>{
                            res.json({
                                success:false,
                                status:500,
                                message:"Internal server error",
                                errors:err
                            })
                       })
                    }else{
                        res.json({
                            status:200,
                            success:false,
                            message:"Old password dosen't match"
                        })
                    }        
                }
            })
            .catch((err)=>{
                res.json({
                    success:false,
                    status:500,
                    message:"Internal server error",
                    errors:err
                })
            })
        }
    }
}
getAllUser=(req,res)=>{
    user.find()
    .then((userData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded",
            data:userData
        })
    })
    .catch((err)=>{
        res.json({
            success:false,
            status:500,
            message:"Internal server error",
            errors:err
        })
    })
}
getSingleUser=(req,res)=>{
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
        user.findOne({_id:req.body._id})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:200,
                    success:false,
                    message:"No User found on this given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded",
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
updateUser=(req,res)=>{
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
        user.findOne({_id:req.body._id})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"No User found on this given Id"
                })
            }else{
                if(req.body.name){
                    userData.name=req.body.name
                }
                if(req.body.email){
                    userData.email=req.body.email
                }
                if(req.body.password){
                    userData.password=bcrypt.hashSync(req.body.password,10)
                }
                userData.save()
                .then((updateData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"User Updated",
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
module.exports={login, changePassword, getAllUser, getSingleUser, updateUser}