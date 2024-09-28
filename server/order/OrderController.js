const cart = require("../carts/cartModel")
const order=require("./OrderModel")
addOrder=(req,res)=>{
    let validation=[]
    if(!req.body.userId){
        validation.push("User Id is required")
    }
    if(!req.body.address){
        validation.push("Address is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        cart.find({userId:req.body.userId})
        .then((cartData)=>{
            if(cartData.length>0){
                let orderObj=new order()
                orderObj.userId=req.body.userId 
                orderObj.address=req.body.address
                let totalPrice=0
                let orderDetail=[]
                cartData.forEach((el,index)=>{
                    // console.log(el.quantity, el.price)
                    totalPrice+=el.total
                    orderDetail.push({productId:el.productId, quantity:el.quantity, price:el.price, total:el.total})
                })
                // console.log(cartData)
                // console.log(totalPrice, orderDetail);
                orderObj.orderDetails=orderDetail
                orderObj.totalPrice=totalPrice
                orderObj.orderStatus=1
                orderObj.save()
                .then((orderData)=>{
                    cart.deleteMany({userId:req.body.userId})
                    .then((result)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Ordered added successfully",
                            data:orderData
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            success:false,
                            status:500,
                            message:"Internal server error"
                        })
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
                    message:"Cart is empty"
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
getAllOrder=(req,res)=>{
    order.find({userId:req.body.userId})
    .then((result)=>{
            res.json({
                status:200,
                success:true,
                message:"Order Loaded",
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
getSingleOrder=(req,res)=>{
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
        order.findOne({_id:req.body._id})
        .then((orderData)=>{
            if(!orderData){
                res.json({
                    status:200,
                    success:false,
                    message:"No Order found on this given Id"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded",
                    data:orderData
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
updateOrder=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("id is required")
    }
    if(!req.body.orderStatus){
        validation.push("Order Status is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        order.findOne({_id:req.body._id})
        .then((orderData)=>{
            if(!orderData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Order found on this given Id"
                })
            }else{
                orderData.orderStatus=req.body.orderStatus
                orderData.save()
                .then((updateData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Order Updated",
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
module.exports={addOrder, getAllOrder, getSingleOrder, updateOrder}