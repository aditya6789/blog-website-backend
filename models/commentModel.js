import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: false,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

export default mongoose.model("Comment", CommentSchema);
