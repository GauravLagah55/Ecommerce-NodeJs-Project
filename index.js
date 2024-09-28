//express(server of node js)
//extra feature- routing , middleware
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors=require("cors")
app.use(cors())
//calls db files for connections
const db = require("./config/db")
const seed=require("./config/seed")
app.use(express.json({limit:"30mb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public/"))
const api = require("./routes/apiRoutes")
app.use("/api", api)
const PORT = 5000
app.listen(PORT, ()=>{
    console.log("Server is running, Welcome user!!")
})
//method- get, post, put, patch, delete
//get- not secure
app.get("/myname", (req, res)=>{

    res.json({
        message:"gaurav lagah",
        status:200,
        success:true
    })
})
app.post("/firstapi", (req, res)=>{
    res.json({
        message:"this is my first project",
        status:200,
        success:true
    })
})
app.post("/hobbies", (req,res)=>{
    res.json({
        message: "watching sports entertainment channel, playing cricket",
        status:200,
        success:true
    })
})
//postman- api testing interface
//api= application programming interface, mediator for frontend and backend
//node js- backend- hindi
//api-backend data get, data add, update, delete
//react/angular- frontend- english
//request- frontend- URL, method, body, header 
//response- backend- status, message,success, data