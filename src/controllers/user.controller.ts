import User from '../infrastructure/mongodb/models/user.model';
import type { Request, Response, NextFunction } from "express";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const err = new Error('User not found');
            (err as any).status = 404;
            throw err;
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, role } = req.body;
        const newUser = await User.create({ username, email, password, role });
        const safeUser = await User.findById(newUser._id).select("-password");
        res.status(201).json({ success: true, data: safeUser });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
         const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // allows role and other fields
      { new: true, runValidators: true }
    ).select("-password");
        if (!updatedUser) {
            const err = new Error('User not found');
            (err as any).status = 404;
            throw err;
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
}