import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  content: { type: String, required: [true, 'Content is required'] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  editBySuperUser: { type: Boolean, default: false },
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;
