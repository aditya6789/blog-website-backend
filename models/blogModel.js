// import { string } from "joi";
import mongoose, { Schema } from "mongoose";
import CommentSchema from './commentModel.js'


const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,

    required: true,
  },
  img: {
    data:Buffer,

   contentType:String
  },

  markdown: {
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] 
});

export default mongoose.model("Blog", BlogSchema);
