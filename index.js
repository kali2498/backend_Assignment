const express = require("express")
const { connection } = require("./db")
require('dotenv').config()
const { authenticate } = require("../backend/middleware/authenticate.middleware")
const { noteR } = require("./route/Note.route")
const { userR } = require("./route/User.route")
const cors = require("cors")

   const app = express()

    app.use(cors())

   app.use(express.json())

   app.get("/", (req,res) =>{
     res.send("HOME PAGE")
   })
   app.use("/users", userR)
   app.use(authenticate)
   app.use("/notes", noteR)



   app.listen(process.env.port,async()=>{
    try
    {
        await connection
        console.log(`Server is running on at port number ${process.env.port}`)
    }
    catch(error)
    {
        console.log(error)
    }
   })