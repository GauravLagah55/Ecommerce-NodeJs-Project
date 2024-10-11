const cart=require("./cartModel")
addToCart=(req,res)=>{
    let validation=[]
    if(!req.body.productId){
        validation.push("Product Id is Required")
    }
    if(!req.body.userId){
        validation.push("User Id is required")
    }
    if(!req.body.price){
        validation.push("Product price is Required")
    }
    if(!req.body.quantity){
        validation.push("quantity is Required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        }) 
    }else{
        cart.findOne({productId:req.body.productId, userId:req.body.userId})
        .then((cartData)=>{
            if(!cartData){
            let cartObj=new cart()
            // console.log(cartObj);
            cartObj.productId=req.body.productId
            cartObj.userId=req.body.userId
            cartObj.quantity=req.body.quantity
            cartObj.price=req.body.price
            cartObj.total=req.body.price*req.body.quantity
            cartObj.save()
            .then((cartResult)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Added to Cart Successfully",
                    data:cartResult
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
                cartData.quantity+=1
                cartData.total=cartData.quantity*cartData.price
                cartData.save()
                .then((cartResult)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Cart Updated Successfully",
                        data:cartResult
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
getAllCart=(req,res)=>{
    // cart.find({userId:req.body.userId})
    cart.find(req.body)
    .then((result)=>{
        if(result.length>0){
            res.json({
                status:200,
                success:true,
                message:"Cart Loaded",
                data:result
            })
        }else{
            res.json({
                status:200,
                success:false,
                message:"Cart is Empty"
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
getSingleCart=(req,res)=>{
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
        cart.findOne({_id:req.body._id})
        .then((cartData)=>{
            if(!cartData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Cart found on this given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded",
                    data:cartData
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
updateCart=(req,res)=>{
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
        cart.findOne({_id:req.body._id})
        .then((cartData)=>{
            if(!cartData){
                res.json({
                    status:404,
                    success:false,
                    message:"No cart found on this given Id"
                })
            }else{
                if(req.body.quantity){
                    cartData.quantity=req.body.quantity
                }
                if(req.body.price){
                    cartData.price=req.body.price
                }
                    cartData.total=req.body.quantity*req.body.price
                
                cartData.save()
                .then((updateData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Cart Updated",
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
deleteCart=(req,res)=>{
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
        cart.deleteOne({_id:req.body._id})
        .then((result)=>{
            res.json({
                status:200,
                success:true,
                message:"Cart deleted",
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
 
module.exports={addToCart, getAllCart, getSingleCart, updateCart, deleteCart} 
    
