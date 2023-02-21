const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    author: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const New_notes_Model = mongoose.model("newNote", notesSchema);

module.exports = { New_notes_Model };
