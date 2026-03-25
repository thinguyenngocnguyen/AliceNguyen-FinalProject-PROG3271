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