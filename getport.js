const express = require('express')
const app = express()
const PORT = 6000
app.listen(PORT, ()=>{
    console.log("Server is running, Welcome user!!")
})
app.get("/myname", (req,res)=>{
    res.json({
        message: "Gaurav Lagah",
        status:200,
        sucess: true
    })
})
app.post("/hobbies", (req,res)=>{
    res.json({
        message: "watching sports entertainment channel, playing cricket",
        status:200,
        success:true
    })
})