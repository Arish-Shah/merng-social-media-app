import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
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

export default mongoose.model("Like", likeSchema);
