import Post from "../infrastructure/mongodb/models/post.model";
import type { Request, Response, NextFunction } from "express";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const user = (req as any).user;

    if (!user || !user._id) {
      const err = new Error("Unauthorized, user not found");
      (err as any).status = 401;
      throw err;
    }

    const newPost = await Post.create({ title, content, author: user._id });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};


export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const isOwner = post.author.toString() === user._id.toString();
    if (!isOwner) {
      return res.status(403).json({ success: false, message: "Only author can update here" });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;

    const updatedPost = await post.save();
    return res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};


export const forceEditPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const isSuper = user.role === "superuser" || user.role === "admin";
    if (!isSuper) {
      return res.status(403).json({ success: false, message: "Only superuser/admin can force edit" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.editBySuperUser = true;

    const updatedPost = await post.save();
    return res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;
        const user = (req as any).user; 

        if (!user?._id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const isOwner = post.author.toString() === user._id.toString();
        if (!isOwner) {
            return res.status(403).json({ success: false, message: "Only author can delete this post" });
        }

        await Post.deleteOne({ _id: postId });
        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};



export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.likes.includes(user._id)) {
      return res.status(400).json({ success: false, message: "You have already liked this post" });
    }

    post.likes.push(user._id);
    await post.save();

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}
   