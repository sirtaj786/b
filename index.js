const { json } = require("express")
const express=require("express")
const connect=require("./config/db")
const userModel=require("./model/user.schema")
const cors=require("cors")
const app=express()
app.use(cors())

app.use(json())

app.get("/test",(req,res)=>{
    res.send("Home...")
})
app.get("/",(req,res)=>{
    res.send("working")
})

app.post("/adduser",async (req,res)=>{
    const {name,email,city}=req.body
    
    const addedUser=new userModel({name,email,city})
    console.log(name,email,city)
    await addedUser.save()

    res.send({message:"User added Successfully"});

})

app.get("/getAlluser", async (req,res)=>{
    const allUSerData=await userModel.find()

    res.send(allUSerData)
})

app.delete("/deleteuser/:id",async (req,res)=>{
    const id=req.params.id
    const deletedUser= await userModel.findOneAndDelete({_id:id},{new:true})

    res.send({message:"user deleted Successfully",data:deletedUser})
})

app.patch("/updateuser/:id",async (req,res)=>{
    const {id}=req.params

    console.log(id)
    const updatedUser= await userModel.findOneAndUpdate({_id:id},req.body,{new:true})

    res.send({message:"User updated Successfully",data:updatedUser})
})

app.listen(8080,async ()=>{
    try{
        await connect
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("error in connecting database",err)
    }
    console.log("server is running on port 8080")
})