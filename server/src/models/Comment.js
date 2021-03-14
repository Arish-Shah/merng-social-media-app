import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    creatorID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
