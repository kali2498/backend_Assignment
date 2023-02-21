const express = require("express")
const { New_notes_Model } = require("../model/Notes.Model")

   const noteR = express.Router()

   noteR.get("/" ,async(req,res) =>{
      const notes = await New_notes_Model.find()
       res.send(notes)
   })

     noteR.post("/create" , async(req,res) =>{
      const payload = req.body
            try
            {
               const note = new New_notes_Model(payload)
               await note.save()
               res.send("Created")     
            }
            catch(err)
            {
               console.log(err)
            }
     })

     noteR.patch("/update/:id", async(req,res) =>{
              const ID = req.params.id

              const payload = req.body

              const note = await New_notes_Model.findOne({'_id' : ID})

              const userID_in_note = note.userID
              
              const userID_making_req = req.body.userID
              try
              {
               if(userID_making_req !== userID_in_note)
               {
                  res.send("You are not authorized")
               }
               else
               {
                  await New_notes_Model.findByIdAndUpdate({_id : ID},payload)
                  res.send("Updated notes")
               }
              }
              catch(err)
              {
               console.log(err)
              }
     })

     noteR.delete("/delete/:id",async(req,res) =>{
      const ID = req.params.id
      const note = await New_notes_Model.findOne({_id : ID})
      const userID_in_note = note.userID
      const userID_making_req = req.body.userID
      try
      {
         if(userID_making_req !== userID_in_note)
         {
            res.send("You are not authorized")
         }
         else
         {
            await New_notes_Model.findByIdAndDelete({_id : ID})
            res.send("deleted notes")
         }
      }
      catch(err)
      {
       console.log(err)
      }
      
     })

     module.exports ={noteR}



   