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
module.exports={register}