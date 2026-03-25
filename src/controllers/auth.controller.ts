import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import User from '../infrastructure/mongodb/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { error } from 'console';


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const session =  await mongoose.startSession();
    session.startTransaction();
    try {
        //Create new user
        const { username, email, password } = req.body;

        //Check if user already exis

        const existingUser = await User.findOne({ email })
        if(existingUser) {
            const err = new Error('User already exists with this email');
            (err as any).status = 409;
            throw err;
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ username, email, password: hashedPassword }], { session });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            const err = new Error('JWT_SECRET is not configured');
            (err as any).status = 500;
            throw err;
        }

        const token = jwt.sign(
            { id: newUser[0]._id },
            jwtSecret as string,
            { expiresIn: '1h' }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ 
            success: true, 
            message : 'User created successfully',
            data: {
                token,
                User: newUser[0]
            }});
    
}catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);}
}
export const signIn = async (req: Request, res: Response, next: NextFunction) => {}


