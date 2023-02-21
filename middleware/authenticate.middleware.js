  

  const jwt = require("jsonwebtoken")
  require('dotenv').config()


    const authenticate=(req,res,next)=>{
          const token = req.headers.authorization
          if(token){
            jwt.verify(token, process.env.key, (err,decoded) =>{
                if(decoded){
                  const userID = decoded.userID
                     
                    req.body.userID = userID
                    next()
                }else{
                    res.send("Please login")
                }
            })
          }else{
            res.send("Please login")
          }
    }

    module.exports = {authenticate}