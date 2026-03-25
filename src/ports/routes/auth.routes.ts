import { Router } from "express";
import { sign } from "node:crypto";
import { signUp } from "../../controllers/auth.controller"; 
import { signIn } from "../../controllers/auth.controller";

const authRouter = Router();
//Path: /api/v1/auth/sign-up(POST)
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);


export default authRouter;

                                                                 