const bcrypt = require("bcrypt")
const admin=require("../server/users/userModel")
admin.findOne({email:"admin55@gmail.com"})
.then((adminData)=>{
    if(!adminData){
        const adminObj= new admin()
        adminObj.name="admin"
        adminObj.email="admin55@gmail.com"
        adminObj.password=bcrypt.hashSync("55555", 10)
        // hashSync("password", saltRound)
        adminObj.userType="1"
        adminObj.save()
        .then((adminData)=>{
            console.log("Admin Seeded Successfully")
        })
        .catch((err)=>{
            console.log("Error while seeding admin", err)
        })
    }else{
        console.log("Admin already exist")
    }
})
.catch((err)=>{
    console.log("Something went wrong", err)
})