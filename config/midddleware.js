const jwt=require('jsonwebtoken')
const PRIVATE_KEY="MyProject55"
const bcrypt=require("bcrypt")
module.exports=(req,res, next)=>{
    let token=req.headers.authorization
    if(!!token){
        jwt.verify(token, PRIVATE_KEY, function(err, result){
            // console.log(err)
            if(!err){
                // req.body["userData"]=result
                next()
            }else{
                res.json({
                    status:403,
                    success:false,
                    message:"Unauthorized access"
                })
            }
        })
    }else{
        res.json({
            status:404,
            success:false,
            message:"Token not found"
        })
    }
}