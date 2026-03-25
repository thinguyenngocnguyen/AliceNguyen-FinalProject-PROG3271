import type { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../../config/config';
import jwt from 'jsonwebtoken';
import User from '../../infrastructure/mongodb/models/user.model';
const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized, no token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET as string) as { id: string };

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized, user not found' });
        }

        (req as any).user = user; // Attach user to request object for use in controllers
        next();

    }catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized', error: (error as Error).message });
    }
}
       