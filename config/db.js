
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://lagahgaurav55:j5I9P9bzzriQMtYy@cluster0.zygxr.mongodb.net/Ecommerce-Nodejs-Project")
.then(()=>{
    console.log("Database Connected");
})
.catch((error)=>{
    console.log("Error while connecting database", error);
})
//database connected 
