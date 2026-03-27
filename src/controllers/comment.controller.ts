import Comment from "../infrastructure/mongodb/models/comment.model";
import type { Request, Response, NextFunction } from "express";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, postId } = req.body;
    const user = (req as any).user;

    if (!user || !user._id) {
      const err = new Error("Unauthorized, user not found");
      (err as any).status = 401;
      throw err;
    }

    const newComment = await Comment.create({ content, author: user._id, post: postId });
    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
}