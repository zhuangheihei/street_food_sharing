var mongoose = require("mongoose");
var CommentSchema = require("./comment.js").schema; //require mongodb schema


var streetfoodSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   date: String,
   //Original comments array saves the array of comment's id
   // comments: [   // comments is a array of comment's id
   //    {
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "Comment"
   //    }
   // ]
   // use this to save multiple comments!
   comments:[CommentSchema] 
});

module.exports = mongoose.model("Streetfood", streetfoodSchema);