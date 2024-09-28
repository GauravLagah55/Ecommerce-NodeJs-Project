
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject")
.then(()=>{
    console.log("Database Connected");
})
.catch((error)=>{
    console.log("Error while connecting database", error);
})
//database connected 
//error