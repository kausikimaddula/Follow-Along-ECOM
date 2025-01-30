const {connect,connection}=require("mongoose")
const{app} = require("./app")
require("dotenv").config()

const Connect=require("./db/connection")
const port = process.env.PORT
app.get("/test",async(req,res)=>{
    res.send("hello.....")
})



app.listen(port,async()=>{
    try{
        console.log(`app is running on http://localhost:${port}`)
    }
    catch(err){
       console.log(err)
    }
    
   
})